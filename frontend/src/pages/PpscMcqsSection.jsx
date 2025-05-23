import React from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PPSCSection = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4 mt-15">

      <div className="lg:w-2/3 text-black-600">
        <h2 className="text-3xl font-bold font-[Merriweather]">PPSC Mcqs</h2>
        <div className="mt-2 space-y-2">
          {/* Question 1 */}
          <div>
            <p className="font-[Open Sans] text-xs">Which is the largest continent by area?</p>
            <div className="flex gap-2 mt-1">
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span className="text-[#FFF700]">A)</span> Asia</button>
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span>B)</span> Europe</button>
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span >C)</span> Africa</button>
            </div>
          </div>
          {/* Question 2 */}
          <div>
            <p className="font-[Open Sans] text-xs">Which planet is known as the Red Planet?</p>
            <div className="flex gap-2 mt-1">
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span>A)</span> Saturn</button>
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span >B)</span> Jupiter</button>
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span className="text-[#FFF700]">C)</span> Mars</button>
            </div>
          </div>
          {/* Question 3 */}
          <div>
            <p className="font-[Open Sans] text-xs">Which gas is most abundant in Earth's atmosphere?</p>
            <div className="flex gap-2 mt-1">
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span >A)</span> Oxygen</button>
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span className="text-[#FFF700]">B)</span> Nitrogen</button>
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span >C)</span> Carbon Dioxide</button>
            </div>
          </div>
          {/* Question 4 */}
          <div>
            <p className="font-[Open Sans] text-xs">Which is the national flower of Pakistan?</p>
            <div className="flex gap-2 mt-1">
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span >A)</span> Sunflower</button>
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span>B)</span> Tulip</button>
              <button className="border border-gray-400 w-[170px] h-[40px] text-xs"><span className="text-[#FFF700]">C)</span> Jasmine</button>
            </div>
          </div>
        </div>
      </div>

      {/* Past Papers Section */}
      <div className="lg:w-1/3 mt-6">
        <h3 className="text-xl font-bold font-[Merriweather]">PPSC Past Papers</h3>
        <p className="font-[Open Sans] text-xs text-gray-600 mt-1">
          Attempt quizzes featuring past paper for PPSC exams and deepen your
          understanding with topic-wise explanations.
        </p>
        <button className="mt-2 w-[216px] h-[50px] text-white rounded-[10px] hover:cursor-pointer" style={{ background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)" }} onClick={() => navigate("/past-paper-access")}>
          Explore PPSC Papers
        </button>

        {/* Search Section */}
        <h3 className="mt-4 text-xl font-bold font-[Merriweather]">SEARCH</h3>
        <div className="flex mt-2 gap-3">
          <input
            type="text"
            placeholder="Search Here..."
            className="w-[433px] h-[50px] p-2 border border-gray-400 rounded-[10px]"
            style={{ background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)", color: "white" }}
          />
          <button className="w-[119px] h-[50px] flex items-center justify-center  rounded-[10px]"
            style={{ background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)", color: "white" }}>
            <Search className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PPSCSection;