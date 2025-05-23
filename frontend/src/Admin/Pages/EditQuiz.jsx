import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetQuizByIdQuery, useUpdateQuizMutation } from "../../store/quizSlice";
import { QrCodeIcon } from "lucide-react";
import MainLayout from "../../layout/MainLayout";

const EditQuiz = () => {
    const { id } = useParams(); // Get quiz ID from URL
    const navigate = useNavigate();

    // Fetch the quiz data
    const { data: quiz, isLoading, error } = useGetQuizByIdQuery(id);
    const [updateQuiz, { isLoading: isUpdating }] = useUpdateQuizMutation(); // Update mutation

    // Local state for form data
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        questions: [],
    });

    const categories = ['General Knowledge', 'Current Affairs', 'English', 'Math', 'Geography', 'Computer Study', 'Islamic Study'];

    // Load quiz data when fetched
    useEffect(() => {
        if (quiz && quiz.title) {
            setFormData({
                title: quiz.title,
                description: quiz.description,
                category: quiz.category,
                questions: quiz.questions || [],
            });
        }
    }, [quiz]);

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-[70vh] bg-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                    <p className="text-green-700 font-semibold text-lg animate-pulse">
                        Loading Quizz...
                    </p>
                </div>
            </div>
        );
    if (error) return <p className="text-center text-red-500">Failed to load quiz. Please try again.</p>;

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle question text change
    const handleQuestionChange = (index, value) => {
        setFormData((prevFormData) => {
            const updatedQuestions = [...prevFormData.questions]; // Copy questions array
            updatedQuestions[index] = { ...updatedQuestions[index], text: value }; // Create new question object with updated text

            return { ...prevFormData, questions: updatedQuestions }; // Update state
        });
    };

    // Handle option change
    const handleOptionChange = (qIndex, oIndex, value) => {
        setFormData((prevFormData) => {
            const updatedQuestions = [...prevFormData.questions]; // Copy questions array
            const updatedOptions = [...updatedQuestions[qIndex].options]; // Copy options array
            updatedOptions[oIndex] = value; // Update specific option

            updatedQuestions[qIndex] = {
                ...updatedQuestions[qIndex],
                options: updatedOptions
            }; // Update question with new options

            return { ...prevFormData, questions: updatedQuestions }; // Update state
        });
    };

    // Handle correct answer selection
    const handleCorrectAnswerChange = (qIndex, selectedOptionIndex) => {
        setFormData((prevFormData) => {
            const updatedQuestions = [...prevFormData.questions]; // Copy questions array
            updatedQuestions[qIndex] = {
                ...updatedQuestions[qIndex],
                correctAnswer: selectedOptionIndex // Store the index correctly
            };

            return { ...prevFormData, questions: updatedQuestions }; // Update state
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateQuiz({ quizId: id, quizData: formData }); // Call API to update quiz
            toast.success("Quiz updated successfully! 🎉");
            navigate("/admin/pastpapers"); // Redirect to quizzes page
        } catch (error) {
            toast.error("Failed to update quiz. Please try again.");
        }
    };

    return (
        <div className="py-10 px-4 md:ml-[250px] transition-all duration-300">
            <h1 className="text-3xl font-bold text-center mb-6">Edit Quiz</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
                {/* Title */}
                <div className="mb-4">
                    <label className="block text-lg font-semibold">Quiz Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md p-2 mt-1"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-lg font-semibold">Quiz Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md p-2 mt-1"
                    ></textarea>
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-lg font-semibold">Quiz Category:</label>
                    <select
                        value={formData.category}
                        onChange={handleChange}
                        name="category"
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Questions */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Edit Questions:</h2>
                    {formData.questions.map((q, qIndex) => (
                        <div key={qIndex} className="mb-6 border p-4 rounded-md bg-gray-100">
                            {/* Question Text */}
                            <label className="block font-semibold">Question {qIndex + 1}:</label>
                            <input
                                type="text"
                                value={q.text}
                                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                required
                                className="w-full border rounded-md p-2 mt-1"
                            />

                            {/* Options */}
                            <label className="block font-semibold mt-2">Options:</label>
                            <ul className="mt-2">
                                {q.options.map((option, oIndex) => (
                                    <li key={oIndex} className="flex items-center gap-2 mt-2">
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                            required
                                            className="border rounded-md p-2 w-full"
                                        />
                                        {/* Radio button for selecting the correct answer */}
                                        <input
                                            type="radio"
                                            name={`correctAnswer-${qIndex}`}
                                            checked={Number(q.correctAnswer) === Number(oIndex)}
                                            onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                                            className="w-5 h-5"
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Save Changes Button */}
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
                    disabled={isUpdating}
                >
                    {isUpdating ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default EditQuiz;
