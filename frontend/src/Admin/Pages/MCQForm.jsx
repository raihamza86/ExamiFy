import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreateQuizMutation, useUploadQuizPdfMutation } from "../../store/quizSlice";
import { useNavigate } from "react-router-dom";

const MCQForm = () => {
  const [mode, setMode] = useState("manual"); // manual | pdf
  const [pdfFile, setPdfFile] = useState(null);
  const [category, setCategory] = useState("");
  const [pdfCategory, setPdfCategory] = useState("");
  const categories = ['General Knowledge', 'Current Affairs', 'English', 'Math', 'Geography', 'Computer Study', 'Islamic Study'];
  const navigate = useNavigate();


  const [createQuiz, { isLoading, error }] = useCreateQuizMutation();
  const [uploadQuizPdf, { isLoading: isPdfUploading }] = useUploadQuizPdfMutation();


  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const addQuestion = () => {
    if (
      !currentQuestion.text.trim() ||
      currentQuestion.options.some((opt) => !opt.trim()) ||
      currentQuestion.correctAnswer === ""
    ) {
      toast.error("Please fill out all fields before adding the question.");
      return;
    }

    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, { ...currentQuestion }],
    }));

    setCurrentQuestion({
      text: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  const removeQuestion = (index) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.filter((_, i) => i !== index),
    });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      toast.error("Please select a category");
      return;
    }

    if (quizData.questions.length === 0) {
      toast.error("Please add at least one question before submitting.");
      return;
    }
    try {

      const quizPayload = {
        ...quizData,
        category: category,
      };

      await createQuiz(quizPayload).unwrap();
      toast.success("Quiz created successfully! 🎉");
      navigate("/admin/pastpapers");
      setQuizData({ title: "", description: "", questions: [] });
      setCategory("");
    } catch (err) {
      toast.error("Error creating Quiz: " + err.message);
    }
  };

  const handlePDFSubmit = async () => {
    if (!pdfFile) return toast.error("Please select a PDF file");
    if (!pdfCategory.trim()) return toast.error("Please enter a category");

    const formData = new FormData();
    formData.append("pdf", pdfFile); // Make sure this matches your backend's field name
    formData.append("category", pdfCategory); // category field

    try {
      const response = await uploadQuizPdf(formData).unwrap(); // Trigger the mutation
      toast.success("Quiz created from PDF! 🎉");
      setPdfFile(null); // Optionally clear the PDF file input
      setPdfCategory(""); // clear field
    } catch (err) {
      console.error("Error creating quiz from PDF:", err);
      toast.error("Error creating quiz from PDF");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center mt-10 p-4 md:ml-[250px]">
      <div className="mb-4 space-x-4">
        <button
          onClick={() => setMode("manual")}
          className={`px-4 py-2 rounded-lg hover:cursor-pointer ${mode === "manual" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Manual
        </button>
        <button
          onClick={() => setMode("pdf")}
          className={`px-4 py-2 rounded-lg hover:cursor-pointer ${mode === "pdf" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Upload PDF
        </button>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {mode === "manual" ? "📝 Create a Quiz (Manual)" : "📄 Upload Quiz PDF"}
        </h2>

        {mode === "manual" ? (
          <form onSubmit={handleManualSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Quiz Title"
              value={quizData.title}
              onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
              required
            />

            <textarea
              placeholder="Quiz Description"
              value={quizData.description}
              onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
              required
            ></textarea>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>


            <h3 className="text-lg font-semibold text-gray-700">Add Questions</h3>

            <input
              type="text"
              placeholder="Enter Question"
              value={currentQuestion.text}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-xl"
            />

            {currentQuestion.options.map((opt, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOptions = [...currentQuestion.options];
                  newOptions[index] = e.target.value;
                  setCurrentQuestion({ ...currentQuestion, options: newOptions });
                }}
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
            ))}

            <select
              value={currentQuestion.correctAnswer}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="">Select Correct Answer</option>
              {currentQuestion.options.map((opt, index) => (
                <option key={index} value={index}>
                  {opt}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={addQuestion}
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition duration-300 shadow-md hover:cursor-pointer"
            >
              Add Question
            </button>

            {quizData.questions.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Added Questions:</h3>
                <ul className="mt-2 space-y-2">
                  {quizData.questions.map((q, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 p-3 rounded-lg shadow-sm flex justify-between items-start"
                    >
                      <div>
                        <strong>Q{index + 1}:</strong> {q.text}
                        <br />
                        <span className="text-sm text-gray-600">
                          Correct: {q.options[q.correctAnswer]}
                        </span>
                      </div>
                      <button
                        onClick={() => removeQuestion(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-700 text-white p-3 rounded-xl hover:bg-green-800 transition duration-300 shadow-md hover:cursor-pointer"
              disabled={isLoading || quizData.questions.length === 0}
            >
              {isLoading ? "Creating..." : "Create Quiz"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <select
              value={pdfCategory}
              onChange={(e) => setPdfCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full"
            />
            <button
              onClick={handlePDFSubmit}
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition duration-300 shadow-md hover:cursor-pointer"
              disabled={isPdfUploading}
            >
              {isPdfUploading ? "Uploading..." : "Upload PDF"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQForm;
