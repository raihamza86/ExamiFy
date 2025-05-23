import React from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";

const MathPotential = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>

      <div className="bg-green-700 text-white py-12 px-6 text-center md:py-16 mt-15">
        <h1
          className="text-2xl md:text-5xl font-bold leading-snug"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          your    <span className="text-yellow-400">Ultimate Guide to<br></br> Mathmatics  </span>
          Exam Prepration
        </h1>
      </div>

      <div className="mx-auto p-6  max-w-5xl text-left">

        <p className="text-gray-700 mb-6 font-size text-lg">
          Mathematics is an essential component of preparation for competitive exams like PPSC, FPSC, and other government tests,
          as it enhances analytical abilities, problem-solving skills, and logical reasoning. A strong grasp of mathematical concepts,
          such as algebra and quantitative reasoning, is vital for performing well in these exams. Mastering math not only boosts confidence
          but also helps candidates manage time efficiently.
        </p>
        <h1 className="text-4xl font-bold mb-4 font-merriweather">
          PPSC, FPSC, NTS, SPSC Mathematics: Vital Questions for 2025 Exam Preparation
        </h1>




        <div className="mb-6 font-merriweather">
          <h2 className="text-xl font-bold text-black">Question 1:</h2>
          <p className="text-green-700 font-semibold">Solve for x: 5x - 7 = 18</p>
          <h3 className="text-black font-bold mt-2 text-xl">Answer:</h3>
          <div className="text-green-600 font-medium mt-1">
            <p>5x - 7 = 18</p>
            <p>5x = 18 + 7</p>
            <p>5x = 25</p>
            <p>x = 5</p>
          </div>
        </div>


        <div className="mb-6 font-merriweather">
          <h2 className="text-xl font-bold text-black">Question 2:</h2>
          <p className="text-green-700 font-semibold">
            What is the area of a circle with a radius of 7 cm? (Use π = 3.14)
          </p>
          <h3 className="text-black text-xl font-bold mt-2">Answer:</h3>
          <div className="text-green-600 font-medium mt-1">
            <p>Area = πr²</p>
            <p>Area = 3.14 × 7 × 7</p>
            <p>Area = 3.14 × 49</p>
            <p>Area ≈ 153.86 cm²</p>
          </div>
        </div>


        <div className="mb-6 font-merriweather">
          <h2 className="text-xl font-bold text-black">Question 3:</h2>
          <p className="text-green-700 font-semibold">If 3y + 2 = 11, find the value of y.</p>
          <h3 className="text-black text-xl font-bold mt-2">Answer:</h3>
          <div className="text-green-600 font-medium mt-1">
            <p>3y + 2 = 11</p>
            <p>3y = 11 - 2</p>
            <p>3y = 9</p>
            <p>y = 3</p>
          </div>
        </div>


        <div className="mb-6 font-merriweather">
          <h2 className="text-xl font-bold text-black">Question 4:</h2>
          <p className="text-green-700 font-semibold">Find the perimeter of a rectangle with length 8 cm and width 5 cm.</p>
          <h3 className="text-green text-xl font-bold mt-2">Answer:</h3>
          <div className="text-green-600 font-medium mt-1">
            <p>Perimeter = 2 × (Length + Width)</p>
            <p>Perimeter = 2 × (8 + 5)</p>
            <p>Perimeter = 2 × 13</p>
            <p>Perimeter = 26 cm</p>
          </div>
        </div>


        <div className="mb-6 font-merriweather">
          <h2 className="text-xl font-bold text-black">Question 5:</h2>
          <p className="text-green-700 font-semibold">Solve: 2(4x - 3) = 14</p>
          <h3 className="text-black text-xl font-bold mt-2">Answer:</h3>
          <div className="text-green-600 font-medium mt-1">
            <p>2(4x - 3) = 14</p>
            <p>8x - 6 = 14</p>
            <p>8x = 14 + 6</p>
            <p>8x = 20</p>
            <p>x = 20 ÷ 8</p>
            <p>x = 2.5</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold mt-6 font-merriweather">
          Key MCQs for Competitive Exams (PPSC, SPSC, FPSC, BPSC, NTS, IB, FIA) – Most Repeated Questions Available for Free!
        </h1>
        <button
          className="mt-6 px-6 py-3 text-white font-medium rounded-lg shadow-md hover:cursor-pointer"
          style={{
            background:
              "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
          }}
          onClick={() => navigate("/startquiz?category=Math")}
        >
          Prepare For Exams
        </button>
      </div>
    </MainLayout>
  );
};
export default MathPotential;
