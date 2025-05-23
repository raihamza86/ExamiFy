import React from "react";

const AboutBanner = () => {
  return (
    <div className="bg-green-700 text-white py-16 px-6 text-center mt-15">
      
      <h1
        className="text-2xl md:text-5xl font-bold"
        style={{ fontFamily: "Merriweather, serif", fontSize: "45px" }}
      >
        Your Roadmap <span className="text-yellow-400">to</span> <br />
        <span className="text-yellow-400">Competitive</span> Exam Success
      </h1>

      
      <button className="mt-6 px-6 py-3 border border-white text-white rounded-lg transition hover:bg-yellow-400 hover:text-black">
  Learn More About Us
</button>

    </div>
  );
};

export default AboutBanner;
