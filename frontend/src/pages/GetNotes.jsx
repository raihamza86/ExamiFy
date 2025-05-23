import MainLayout from '../layout/MainLayout';
import { CheckCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GetNotes() {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <>
        <div
          className="text-white py-8 px-4 text-center mb-3 md:mb-5 bg-green-700 mt-15"

        >
          <h1
            className="text-lg md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Your Path <span className="text-yellow-400">to Success Start</span> <br />
            with Our PDF Notes
          </h1>
          <button className="mt-3 md:mt-5 px-5 py-2.5 border border-white text-white rounded-lg transition hover:bg-yellow-400 hover:text-black text-xs md:text-base hover:cursor-pointer" onClick={() => navigate("/past-papers?category=PDF Notes")}>
            Get Your Notes
          </button>
        </div>

        {/* Reduced vertical spacing here */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 md:p-6 text-center">
          <h1
            className="text-lg md:text-4xl font-bold max-w-xl mt-1 leading-tight"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Comprehensive PDF Notes <br /> for Every Exam
          </h1>
          <p
            className="mt-1.5 md:mt-2 max-w-3xl text-gray-600 text-xs md:text-sm"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            Comprehensive PDF Notes for Every Exam
            PDF notes are digital study materials in Portable Document Format (PDF) that provide organized, comprehensive content designed to aid in exam preparation. These notes typically include summaries, explanations, diagrams, and practice questions covering various subjects or topics relevant to specific exams. PDF notes are easily downloadable and accessible, allowing students to study anytime, anywhere, making them a valuable resource for efficient learning and review. Whether for competitive exams like PPSC, FPSC, or other academic tests, these notes help streamline study efforts and improve understanding of key concepts.

          </p>
          <button
            className="mt-3 px-5 py-2 text-white font-semibold rounded-lg text-xs md:text-base hover:cursor-pointer"
            style={{ background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)" }}
            onClick={() => navigate("/start-gk")}
          >
            Start Preparing
          </button>
        </div>

        {/* Reduced spacing between sections */}
        <section className="p-4 md:p-10 w-full max-w-6xl mx-auto mt-[-10px] md:mt-0">
          <div className="flex flex-col items-start">
            <h2
              className="text-lg md:text-4xl font-bold leading-tight"
              style={{ fontFamily: "Merriweather" }}
            >
              Access Comprehensive PDF <span>Study Materials</span>
            </h2>
            <div className="mt-2 md:mt-3 flex items-center bg-green-700 p-2 rounded-md w-full max-w-md">
              <input
                type="text"
                placeholder="Search For Notes, PDFs and More"
                className="w-full p-2 text-white bg-transparent outline-none placeholder-white text-sm md:text-base"
              />
              <Search className="text-white w-5 h-5" />
            </div>
          </div>

          <div className="mt-3 md:mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-2 md:p-4 rounded-md">
            {[
              "English Notes PDF", "Mathematics PDF", "General Knowledge", "Current Affairs PDF",
              "Biology PDF", "Public Administration PDF", "Business Management PDF", "Soil Science PDF",
              "Urdu Notes PDF", "Pakistan Affairs Notes PDF", "Every Day Science PDF", "Geography PDF",
              "Sociology PDF", "Pakistan Affairs Notes PDF", "Pharmacology PDF", "Education Pedagogy PDF",
              "Islamiat PDF", "Pak Study PDF", "General Science PDF", "Basic Computer PDF",
              "Ms Office PDF", "World Affairs PDF", "Accounting PDF", "Basic Statistics PDF",
              "Political Science PDF", "Operating System PDF", "Psychology PDF", "Chemistry PDF",
              "Physics PDF", "English Literature", "Economics PDF", "Auditing PDF"
            ].map((note, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded-full" style={{ background: "#347928" }}>
                  <CheckCircle className="text-white w-3 h-3" />
                </span>
                <span className="text-gray-800 text-xs md:text-sm" style={{ fontFamily: "Open Sans" }}>
                  {note}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 md:mt-5 flex justify-center">
            <button
              className="px-5 py-2 text-white font-semibold rounded-md text-xs md:text-base hover:cursor-pointer"
              style={{ background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)" }}
              onClick={() => navigate("/past-papers?category=PDF Notes")}
            >
              Download Study Materials
            </button>
          </div>
        </section>
      </>
    </MainLayout>
  );
}