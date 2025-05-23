import React from "react";
import MainLayout from "../layout/MainLayout";
import { ChevronDown } from "lucide-react";
import McqSection from "./Mcqsection";
import { useNavigate } from "react-router-dom";

const CurrentAffairPreps = () => {
  const navigate = useNavigate();

  const gradientStyle = {
    background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
  };

  return (
    <MainLayout>
      <div className="bg-green-700 text-white py-12 px-6 text-center md:py-16 mt-15">
        <h1
          className="text-2xl md:text-5xl font-bold leading-snug"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Daily <span className="text-yellow-400">Current Affairs for  </span>
          <br /> Competitive exams preps
        </h1>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 font-[Merriweather] mt-20">
          Why current affairs are essential for competitive exams?
        </h1>
        <p className="text-gray-700 mb-6 ">
          Current affairs are essential for competitive exams because they assess a candidate’s awareness of national and international events, which is crucial for roles requiring decision-making and analytical skills. They help aspirants stay informed about topics like politics, economy, science, and technology, which are frequently included in exams. Additionally, knowledge of current affairs enhances a candidate’s ability to write essays, participate in group discussions, and perform well in interviews. Staying updated not only improves general knowledge but also boosts confidence, making it a key component of competitive exam preparation.
        </p>

        <h2 className="text-xl md:text-3xl font-bold mb-4 font-[Merriweather]">
          Current Affairs Of Pakistan
        </h2>
        <p className="text-gray-700 mb-6">
          Current affairs of Pakistan encompass the latest developments in politics, economy, society, and international relations, reflecting the country’s dynamic environment. Key events include government policies, political shifts, economic challenges, and major social issues. Regular updates highlight national and international news, political decisions, economic reforms, and advancements in technology and culture. Understanding these affairs is crucial for exam aspirants, as they often form the basis of questions in competitive exams like PPSC, FPSC, and others.
        </p>


        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold font-[Merriweather] mb-4">
            Multiple Choice Questions on Pakistan Current Affairs
          </h2>

          <ul className="space-y-3">
            {[
              "Foreign Relations and International Affairs Mcqs",
              "Social Issues and Development Mcqs",
              "National Security and Defence Mcqs",
              "Economy and Finance Mcqs",
              "Law and Judiciary Mcqs",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-lg">
                <span className="w-8 h-8 flex items-center justify-center bg-green-600 text-white font-bold rounded-full">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>


        <div className="mt-10">
          <h3 className="text-xl md:text-2xl font-bold font-[Merriweather]">
            Current Affairs of Pakistan Organized by Month
          </h3>
          <p className="text-gray-700 mb-4">
            Now it's time to share your latest Current Affairs MCQs with us.
          </p>

          <button
            className="px-6 py-3 text-white font-medium rounded-lg shadow-md w-full md:w-64 mb-6 hover:cursor-pointer"
            style={gradientStyle}
            onClick={() => navigate("/submit-mcq")}
          >
            Submit Here
          </button>

          <h3 className="text-xl md:text-2xl font-bold font-[Merriweather]">
            Choose a month
          </h3>
          <button
            className="px-6 py-3 text-white font-medium rounded-lg shadow-md w-full md:w-64 mb-6 hover:cursor-pointer"
            style={gradientStyle}
          >
            Choose a month
          </button>
        </div>
      </div>
      <McqSection category={"Current Affairs"} />
    </MainLayout>
  );
};

export default CurrentAffairPreps;
