import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";

const mcqs = [
  {
    question: "Which country has the largest coastline in the world?",
    options: ["USA", "Russia", "Canada", "Australia"],
    correct: 2,
  },
  {
    question: "The equator passes through how many continents?",
    options: ["3", "4", "5", "2"],
    correct: 0,
  },
  {
    question: "What is the name of the highest peak in Pakistan?",
    options: ["Rakaposhi", "4", "5", "2"],
    correct: 0,
  },
];

const Geography = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>

      <div className="bg-green-700 text-white py-12 px-6 text-center md:py-16 mt-15">
        <h1
          className="text-2xl md:text-5xl font-bold leading-snug"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Geography  <span className="text-yellow-400">Essential for</span>
          <br /> PPSC, EPSC & More
        </h1>
      </div>
      <div className="py-10 px-6 md:ml-[40px] max-w-5xl">

        <p className="text-gray-700 text-justify text-base leading-relaxed font-opensans">
          Geography is a crucial subject in PPSC, FPSC, and other competitive exams because it helps candidates
          understand the physical and political aspects of the world, which are essential for administrative roles. Many
          exams include geography-related questions covering physical geography (landforms, climate, natural disasters),
          human geography (population, urbanization, industries), and Pakistan’s geography (rivers, mountains, provinces, and
          resources). This knowledge is vital for civil servants and government officials as they often deal with issues
          like environmental management, urban planning, and resource distribution.
        </p>
        <p className="mt-4 text-gray-700 text-justify text-base leading-relaxed font-opensans">
          Furthermore, geography is directly linked to current affairs, as many national and international issues—such as
          climate change, geopolitics, and economic geography—impact government policies. Candidates who have a strong grasp
          of geography can perform better in General Knowledge, Pakistan Studies, and even interview rounds, making it an
          essential subject for success in competitive exams.
        </p>

        <h2 className="text-xl md:text-3xl font-bold text-black mt-6 font-merriweather">
          Geography MCQs for Competitive Exams
        </h2>

        <div className="mt-6 space-y-6">
          {mcqs.map((mcq, index) => (
            <div key={index} className="rounded-lg shadow-md p-4 w-full md:w-3/4">
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
        <button
          className="mt-6 px-6 py-3 text-white font-medium rounded-lg shadow-md hover:cursor-pointer"
          style={{
            background:
              "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
          }}
          onClick={() => navigate("/startquiz?category=Geography")}
        >
          Attempt Quiz
        </button>    </div>
    </MainLayout>
  );
};

export default Geography;
