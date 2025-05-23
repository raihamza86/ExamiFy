import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useGetQuizzesQuery, useSubmitQuizMutation } from "../store/quizSlice";
import { useNavigate, useLocation } from "react-router-dom";

const StartQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryFromState = location.state?.category;

  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get("category");

  const selectedCategory = categoryFromState || categoryFromQuery || null;
  const { data: quizzes, isLoading } = useGetQuizzesQuery();
  const [submitQuiz] = useSubmitQuizMutation();

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({}); // Track submission state for each quiz
  const [results, setResults] = useState({});
  const [score, setScore] = useState({});

  const handleOptionChange = async (questionId, selectedOption, quizId) => {
    if (submitted[quizId]) return; // Prevent changing after submission

    // Update the state for the selected answer
    setAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [questionId]: selectedOption,
      };
      return updatedAnswers;
    });
  };

  const handleSubmit = async (quizId) => {
    if (submitted[quizId]) return; // Prevent resubmission

    const currentQuiz = quizzes.find((quiz) => quiz._id === quizId);

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, selectedOption]) => ({
        questionId,
        selectedAnswer: selectedOption, // Send the actual text like your working code
      })
    );

    try {
      const response = await submitQuiz({
        quizId,
        answers: formattedAnswers,
      }).unwrap();

      const { results } = response;

      const correctCount = results.filter((r) => r.isCorrect).length;
      setScore((prev) => ({ ...prev, [quizId]: correctCount }));
      setResults((prev) => ({ ...prev, [quizId]: results }));
      setSubmitted((prev) => ({ ...prev, [quizId]: true }));
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Submission failed. Try again!");
    }
  };

  // Only trigger submission for a quiz when all its questions have been answered
  const checkAllAnswered = (quizId) => {
    const currentQuiz = quizzes.find((quiz) => quiz._id === quizId);
    const currentAnswers = answers;
    const allAnswered = currentQuiz.questions.every(
      (question) => currentAnswers[question._id]
    );

    if (allAnswered) {
      handleSubmit(quizId); // Automatically submit the quiz
    }
  };

  // Track when the answers change and check for completion of each quiz
  useEffect(() => {
    if (!quizzes) return; // Prevent error if quizzes are not available yet
    quizzes.forEach((quiz) => {
      if (!submitted[quiz._id]) {
        checkAllAnswered(quiz._id); // Check if this quiz is fully answered
      }
    });
  }, [answers, quizzes, submitted]); // Trigger on answer or quiz changes

  const getFeedback = (quizId, questionId, option) => {
    const result = results[quizId]?.find((r) => r.questionId === questionId);
    if (!result) return "";

    const { correctAnswer, userAnswer } = result;

    if (option === correctAnswer) return "bg-green-200 text-green-800 font-bold";
    if (option === userAnswer && userAnswer !== correctAnswer)
      return "bg-red-200 text-red-800 font-bold";

    return "";
  };

  const filteredQuizzes = selectedCategory
    ? quizzes?.filter((quiz) => quiz.category === selectedCategory)
    : quizzes;

  // Calculate total score from all quizzes
  const totalScore = Array.isArray(filteredQuizzes)
    ? filteredQuizzes.reduce(
      (total, quiz) => total + (score[quiz._id] || 0),
      0
    )
    : 0;

  const totalQuestions = Array.isArray(filteredQuizzes)
    ? filteredQuizzes.reduce((total, quiz) => total + (quiz?.questions?.length || 0), 0)
    : 0;


  if (isLoading)
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[70vh] bg-white">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-green-700 font-semibold text-lg animate-pulse">
              Loading Quizzes...
            </p>
          </div>
        </div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="bg-green-700 text-white py-12 px-6 text-center md:py-16 mt-15">
        <h1 className="text-2xl md:text-5xl font-bold leading-snug" style={{ fontFamily: "Merriweather, serif" }}>
          Start Quiz<span className="text-yellow-400"> & Practice </span>
          <br /> Your Concepts
        </h1>
      </div>

      <div className="flex flex-col items-center px-6">
        <div className="max-w-5xl w-full">
          <div className="grid grid-cols-1 gap-6 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Showing {selectedCategory} Quizzes
            </h2>
            {(() => {
              const filteredQuizzes = selectedCategory
                ? quizzes?.filter((quiz) => quiz.category === selectedCategory)
                : quizzes;

              if (!filteredQuizzes || filteredQuizzes.length === 0) {
                return (<p className="text-red-600 font-semibold">No quizzes found for "{selectedCategory}"</p>
                );
              }

              return filteredQuizzes.map((quiz) => (
                <div key={quiz._id} className="border p-5 shadow-md bg-white">
                  {quiz.questions && quiz.questions.length > 0 ? (
                    <>
                      <h4 className="text-lg md:text-center font-bold">{quiz.title}</h4>
                      <h4 className="text-md md:text-center">{quiz.description}</h4>
                      {quiz.questions.map((question) => (
                        <div key={question._id}>
                          <h4 className="text-sm md:text-base font-semibold">{question.text}</h4>
                          <ul className="space-y-2 flex md:flex-row flex-col md:gap-6 md:items-center">
                            {question.options.map((option, i) => {
                              const isChecked = answers[question._id] === option;
                              const feedbackClass = submitted[quiz._id] ? getFeedback(quiz._id, question._id, option) : "";

                              return (
                                <li key={i} className={`flex items-center space-x-2 p-1 rounded ${feedbackClass}`}>
                                  <input
                                    type="radio"
                                    name={`question-${question._id}`}
                                    id={`question-${question._id}-option-${i}`}
                                    className="cursor-pointer accent-green-600 w-5 h-5"
                                    disabled={submitted[quiz._id]}
                                    checked={isChecked}
                                    onChange={() => handleOptionChange(question._id, option, quiz._id)}
                                  />
                                  <label htmlFor={`question-${question._id}-option-${i}`} className="cursor-pointer text-gray-800">
                                    <span className="font-semibold text-green-600">
                                      {String.fromCharCode(65 + i)}){" "}
                                    </span>
                                    {option}
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>No questions available for this quiz.</p>
                  )}
                  {submitted[quiz._id] && (
                    <div className="text-center my-6">
                      <h2 className="text-xl font-bold text-green-800">
                        🎉 You scored {score[quiz._id]} out of {quiz.questions.length}
                      </h2>
                    </div>
                  )}
                </div>
              ))
            })()}
          </div>
        </div>

        {totalQuestions > 0 && (
          <div className="text-center mt-8">
            <h2 className="text-xl font-bold text-green-800">
              🎉 Your total score is {totalScore} out of {totalQuestions}
            </h2>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default StartQuiz;
