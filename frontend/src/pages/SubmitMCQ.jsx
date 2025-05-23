import React from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";

const SubmitMCQ = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>




      <div>
        <div className="bg-green-700 text-white py-16 px-6 text-center mt-15">

          <h1
            className="text-2xl md:text-5xl font-bold"
            style={{ fontFamily: "Merriweather, serif", fontSize: "55px" }}
          >
            Submit Your<span className="text-yellow-400">MCQS</span> <br />
            <span className="text-yellow-400">For </span> Best Practice
          </h1>




        </div>

      </div> <div className="flex flex-col items-center min-h-screen  p-6 pt-[100px] mt-15">


        <h2 className="text-3xl font-merriweather text-center mb-6 text-black font-bold">
          Submit Your MCQs
        </h2>


        <div className="bg-green-700 p-10 rounded-lg w-full max-w-4xl min-h-[600px] flex flex-col justify-center">


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            <div className="space-y-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full h-14 p-4 border border-dashed border-white rounded text-white font-opensans placeholder-white focus:outline-none"
              />
              <input
                type="email"
                placeholder="User Email"
                className="w-full h-14 p-4 border border-dashed border-white rounded bg-transparent text-white font-opensans placeholder-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full h-14 p-4 border border-dashed border-white rounded bg-transparent text-white font-opensans placeholder-white focus:outline-none"
              />
              <textarea
                placeholder="Short Profile"
                className="w-full h-32 p-4 border border-dashed border-white rounded bg-transparent text-white font-opensans placeholder-white focus:outline-none"
              ></textarea>
            </div>


            <div className="space-y-6">
              <input
                type="text"
                placeholder="User Name"
                className="w-full h-14 p-4 border border-dashed border-white rounded bg-transparent text-white font-opensans placeholder-white focus:outline-none"
              />
              <div className="relative">
                <input
                  type="password"
                  placeholder="User Password"
                  className="w-full h-14 p-4 border border-dashed border-white rounded bg-transparent text-white font-opensans placeholder-white focus:outline-none pr-10"
                />
              </div>
              <input
                type="text"
                placeholder="Mobile"
                className="w-full h-14 p-4 border border-dashed border-white rounded bg-transparent text-white font-opensans placeholder-white focus:outline-none"
              />

              {/* Note Section */}
              <div className="text-white">
                <p className="font-bold">Note...</p>
                <p className="text-sm">
                  Your present city, academic qualifications, and desired job role?
                </p>
              </div>


              <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition hover:cursor-pointer" onClick={() => navigate("/signup")}>
                Register Now
              </button>
            </div>
          </div>


          <p className="text-white font-bold mt-8 text-center">
            Thank You for Your Contribution!
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubmitMCQ;
