import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckSquare } from "lucide-react";

const mcqs = [
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  }, {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan"],
    correct: "C) Japan",
  },
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris"],
    correct: "C) Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Jane Austen"],
    correct: "B) William Shakespeare",
  },
];

const QuizSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start p-4 md:p-10 gap-10 mt-15">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Merriweather, serif" }}>
          Start Quiz
        </h1>
        <p className="text-lg mt-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 500 }}>
          Good Luck
        </p>

        <button
          className="px-5 py-2 mt-3 text-white rounded-md hover:cursor-pointer"
          style={{
            background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
            fontWeight: "400",
          }}
          onClick={() => navigate("/start-gk")}
        >
          Start The Quiz
        </button>

        {/* MCQ Section */}
        <div className="mt-5 border p-3 rounded-md shadow-md text-sm">
          <p className="flex items-center font-semibold">
            <CheckSquare className="text-green-600 mr-2" /> {mcqs[currentIndex].question}
          </p>
          <div className="mt-1 space-y-1">
            {mcqs[currentIndex].options.map((option, index) => (
              <p key={index} className={option === mcqs[currentIndex].correct ? "text-yellow-500" : ""}>
                {option}
              </p>
            ))}
          </div>
        </div>

        {/* Next Button (Hidden on last question) */}
        {currentIndex < mcqs.length - 1 && (
          <button
            className="flex items-center mt-4 px-4 py-2 text-white rounded-md hover:cursor-pointer"
            style={{
              background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
              fontWeight: "400",
            }}
            onClick={handleNext}
          >
            Next ➜
          </button>
        )}
      </div>


      <div className="max-w-lg w-full" style={{ marginTop: "4rem" }}>
        <h2 className="text-2xl md:text-2xl font-bold" style={{ fontFamily: "Merriweather, serif" }}>
          Result
        </h2>
        <p className="text-sm mt-2" style={{ fontFamily: "Open Sans, sans-serif" }}>
          The result section of a quiz on an exams website provides detailed feedback on a user’s performance.
        </p>
      </div>
    </div>
  );
};

export default QuizSection;
