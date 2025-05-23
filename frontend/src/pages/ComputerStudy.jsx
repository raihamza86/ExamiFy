import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";

const mcqs = [
  {
    question: "What is the first pillar of Islam?",
    options: ["Zakat", "Salah", "Shahada"],
    correct: 2,
  },
  {
    question: "What is the meaning of the word 'Zakat'?",
    options: ["Purification", "Charity", "Faith"],
    correct: 0,
  },
  {
    question: "How many Makki Surahs are there in the Holy Quran?",
    options: ["114", "86", "26"],
    correct: 1,
  },
  {
    question: "In which year did the Battle of Badr take place?",
    options: ["1 AH", "3 AH", "2 AH"],
    correct: 2,
  },
];

const IslamicStudy = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-green-700 text-white py-12 px-6 text-center md:py-16 mt-15">
        <h1
          className="text-2xl md:text-5xl font-bold leading-snug"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Your Ultimate <span className="text-yellow-400">Guide To Islamic</span>
          <br /> Studies for Competitive Exams
        </h1>
      </div>

      {/* Main Content */}
      <div className="py-8 px-4 md:px-10 lg:px-16">
        {/* Introduction Section */}
        <div className="py-6 px-4 w-full md:w-4/5 lg:w-3/4 mx-auto">
          <p className="text-gray-700 text-justify text-base leading-relaxed">
            Islamic Studies holds a significant place in the preparation of PPSC, FPSC, NTS, CSS,
            and other government job exams in Pakistan. It is an essential component of the General
            Knowledge (GK) section, contributing valuable marks that can influence a candidate’s
            overall ranking. Understanding Islamic teachings, history, and principles is not only
            beneficial for academic success but also plays a crucial role in developing a strong
            moral foundation for individuals pursuing public service roles.
          </p>
          <h2 className="text-lg md:text-2xl font-bold text-black mt-4 font-merriweather text-center md:text-left">
            Repeated <span className="text-black">MCQs</span> from Islamic Studies Past Papers
          </h2>
        </div>

        <div className="max-w-4xl mt-6 space-y-6 mx-auto">
          {mcqs.map((mcq, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4">
              {/* Question Header */}
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-lg" />
                  <h3 className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {mcq.question}
                  </h3>
                </div>
                <IoIosArrowUp className="text-gray-500" />
              </div>

              <hr className="my-2 border-gray-300" />

              {/* Options List */}
              <div className="flex flex-wrap gap-4 mt-2">
                {mcq.options.map((option, i) => {
                  const optionLetter = String.fromCharCode(65 + i);
                  const isCorrect = mcq.correct === i;
                  return (
                    <span
                      key={i}
                      className={`text-sm md:text-base ${isCorrect ? "text-orange-500 font-semibold" : "text-gray-700"
                        }`}
                    >
                      {optionLetter}) {option}
                    </span>
                  );
                })}
              </div>

              {/* Read More Link */}
              <p className="text-green-600 text-sm mt-3 cursor-pointer hover:underline transition-all duration-200">
                Understand More About This MCQ...
              </p>
            </div>
          ))}
        </div>


        {/* Quiz Button */}
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-3 text-white font-medium rounded-lg shadow-md text-sm md:text-base hover:cursor-pointer"
            style={{
              background:
                "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
            }}
            onClick={() => navigate("/startquiz?category=Computer Study")}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default IslamicStudy;
