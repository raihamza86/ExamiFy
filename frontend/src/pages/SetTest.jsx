import React from "react";
import { FaRegClock } from "react-icons/fa";
import MainLayout from "../layout/MainLayout";

const SetTest = () => {
  return (
    <MainLayout>
      {/* Header Section */}
      <div className="bg-green-700 text-white py-12 px-6 text-center md:py-16 mt-15">
        <h1
          className="text-2xl md:text-5xl font-bold leading-snug"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Geography  <span className="text-yellow-400">Essential for</span>
          <br /> PPSC, EPSC & More
        </h1>
      </div>
      <div className="bg-white py-10 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-black font-merriweather">
            Set a Timer & Challenge Yourself!
          </h2>
          <p className="text-gray-700 mt-2 text-base md:text-lg">
            The Timed Test Mode simulates real exam conditions by setting a countdown timer, helping users practice under pressure.
            It enhances time management skills, improves decision-making speed, and builds exam-day confidence.
          </p>
        </div>

        {/* Timer Feature Boxes */}
        <div className="bg-green-700 mt-6 px-6 py-12 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Timer Box 1 */}
            <div className="flex flex-col items-center justify-center border border-white p-6 rounded-lg text-white text-center min-h-[250px] w-full">
              <FaRegClock className="text-6xl mb-4" />
              <h3 className="font-bold text-lg font-merriweather">
                Set a Timer & Challenge Yourself!
              </h3>
            </div>

            {/* Empty Box (Placeholder) */}
            <div className="flex items-center justify-center border border-white p-6 rounded-lg min-h-[250px] w-full"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SetTest;
