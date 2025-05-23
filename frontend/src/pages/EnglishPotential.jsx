import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";

const englishMCQs = [
  {
    question: "Choose the correct synonym of 'Abundant':",
    options: ["Scarce", "Plentiful", "Tiny", "Limited"],
    correct: 1,
  },
  {
    question: "What is the plural of 'Analysis'?",
    options: ["Analysises", "Analyses", "Analysis'", "Analysers"],
    correct: 1,
  },
  {
    question: "Choose the correct spelling:",
    options: ["Recieve", "Recievee", "Receive", "Recive"],
    correct: 2,
  },
  {
    question: "Which word is a noun?",
    options: ["Beautiful", "Happiness", "Running", "Quickly"],
    correct: 1,
  },
  {
    question: "Identify the correct passive voice sentence:",
    options: [
      "She completed the project.",
      "The project was completed by her.",
      "She will complete the project.",
      "She was completing the project.",
    ],
    correct: 1,
  },
];

const EnglishPotential = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>

      <div className="bg-green-700 text-white py-12 px-6 text-center md:py-16 mt-15">
        <h1
          className="text-2xl md:text-5xl font-bold leading-snug"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Unlock your   <span className="text-yellow-400">English </span>
          <br /> Potential
        </h1>
      </div>


      <div className="py-10 px-6 md:ml-[40px] max-w-5xl">
        <p className="text-gray-700 text-justify text-base leading-relaxed font-opensans">
          For PPSC, FPSC, and similar exams, English plays a pivotal role in both written and verbal evaluations. It is often one of the highest-weighted subjects, making it a scoring area that can significantly boost overall results. These exams assess candidates on their ability to grasp grammatical rules, enhance their vocabulary, and analyze passages efficiently. Websites that offer targeted resources, such as practice tests, grammar guides, and essay-writing tips, enable aspirants to refine their skills and gain the confidence needed to excel in competitive exams.
        </p>

        <h2 className="text-xl md:text-4xl font-bold text-black mt-6 font-merriweather">
          Test Your English Skills with MCQs and<br>
          </br> Quizzes for Preparation
        </h2>

        <div className="mt-6 space-y-6">
          {englishMCQs.map((mcq, index) => (
            <div key={index} className="rounded-lg shadow-md p-4 w-full md:w-3/4 bg-transparent">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500 text-lg" />
                <h3 className="text-lg text-gray-700">{mcq.question}</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {mcq.options.map((option, i) => {
                  const isCorrect = mcq.correct === i;
                  return (
                    <p key={i} className={`text-base font-medium border border-gray-300 rounded-md p-2 text-center ${isCorrect ? "text-orange-500" : "text-gray-700"
                      }`}>
                      {String.fromCharCode(65 + i)}) {option}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Attempt Quiz Button */}
        <button
          className="mt-6 px-6 py-3 text-white font-medium rounded-lg shadow-md hover:cursor-pointer"
          style={{
            background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
          }}
          onClick={() => navigate("/startquiz?category=English")}
        >
          Attempt Quiz
        </button>
      </div>
    </MainLayout >
  );
};

export default EnglishPotential;
