import React from "react";
import { toast } from "react-toastify";
import { useGetQuizzesQuery, useDeleteQuizMutation } from "../../store/quizSlice";
import { useNavigate } from "react-router-dom";

const PastPapers = () => {
  const navigate = useNavigate();
  const { data: quizzes, isLoading } = useGetQuizzesQuery();
  const [deleteQuiz] = useDeleteQuizMutation();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh] bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold text-lg animate-pulse">
            Loading Quizzes...
          </p>
        </div>
      </div>
    );

  if (!quizzes || quizzes.length === 0) {
    return <p className="text-gray-600 text-center mt-4">🚫 No quizzes available.</p>;
  }

  // Handle Delete Quiz
  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await deleteQuiz(quizId);
        toast.success("Quiz deleted successfully! 🎉");
      } catch (error) {
        toast.error("Error deleting quiz." + error.message);
      }
    }
  };

  return (
    <div className="py-10 px-4 md:ml-[250px] transition-all duration-300">
      <h1 className="text-3xl font-bold text-center mb-6">All Quizzes</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
        {quizzes?.map((quiz) => (
          <div
            key={quiz._id}
            className="rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 bg-white border border-gray-200"
          >
            <div className="p-6">
              {/* Quiz Title & Description */}
              <h3 className="text-xl font-semibold text-center text-gray-800">{quiz.title}</h3>
              <p className="text-sm mt-2 text-gray-600 text-center">{quiz.description}</p>
              <p className="text-sm mt-2 text-gray-600 font-bold text-start">Category: {quiz.category}</p>

              {/* MCQs Section */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Questions:</h4>
                <div className="space-y-4">
                  {quiz.questions.map((q, index) => (

                    <div key={index} className="border p-3 rounded-lg bg-gray-100">
                      <p className="font-medium text-gray-800">Q{index + 1}: {q.text}</p>
                      <ul className="mt-2 space-y-1">
                        {q.options.map((option, i) => (
                          <li
                            key={i}
                            className={`p-2 rounded-lg ${q.correctAnswer === i ? "bg-green-200 text-green-700 font-semibold" : "bg-white text-gray-700"
                              }`}
                          >
                            {option}
                          </li>
                        ))}
                        {/* ✅ Display Correct Answer Text Instead of Index */}
                        <p className="mt-2 font-medium text-blue-600">
                          Correct Answer: <span className="font-semibold">{q.options[q.correctAnswer]}</span>
                        </p>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons for Edit & Delete */}
              <div className="mt-4 flex justify-between">
                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/admin/edit-quiz/${quiz._id}`)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition hover:cursor-pointer"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition hover:cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastPapers;
