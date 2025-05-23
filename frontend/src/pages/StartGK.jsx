import React from "react";
import { Search } from "lucide-react";
import MainLayout from "../layout/MainLayout";
import McqSection from "./Mcqsection";
import { useNavigate } from "react-router-dom";


const StartGK = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="bg-green-700 text-white py-16 px-6 text-center mt-15">

        <h1
          className="text-2xl md:text-5xl font-bold"
          style={{ fontFamily: "Merriweather, serif", fontSize: "45px" }}
        >
          Your Roadmap <span className="text-yellow-400">to</span> <br />
          <span className="text-yellow-400">Competitive</span> Exam Success
        </h1>


        <button className="mt-6 px-6 py-3 border border-white text-white rounded-lg transition hover:bg-yellow-400 hover:text-black hover:cursor-pointer" onClick={() => navigate("/about-us")}>
          Learn More About Us
        </button>

      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-gray-700 leading-relaxed">
          General Knowledge (GK) MCQs are multiple-choice questions designed to test a candidate’s
          knowledge across a broad range of topics, including history, geography, current affairs,
          science, and more. On exam websites, these MCQs serve as a vital tool for exam preparation,
          helping candidates familiarize themselves with the types of questions commonly asked in
          competitive exams like FPSC, PPSC, and others. By practicing GK MCQs, candidates can assess
          their knowledge, improve recall, and identify areas that need further study. The interactive
          format of MCQs makes them an effective and engaging way to revise key concepts, track progress,
          and build confidence for the actual exam.
        </p>

        <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
          <h2 className="text-xl font-bold font-merriweather">Browse GK MCQs by Subject</h2>

          <div className="relative flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Search Now"
              className="p-3 border border-gray-300 bg-green-700 text-white placeholder-white rounded-l-lg w-full md:w-[500px] focus:outline-none"
            />
            <button className="bg-green-700 text-white p-3 rounded-r-lg">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <McqSection category={"General Knowledge"} />


    </MainLayout>
  );
};

export default StartGK;
