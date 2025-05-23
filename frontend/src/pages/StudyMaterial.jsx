import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudyMaterial = () => {
  const navigate = useNavigate();
  const notes = [
    ["English Notes PDF", "Mathematics PDF", "General Knowledge PDF", "Current Affairs PDF"],
    ["Urdu Notes PDF", "Pakistan Affairs Notes PDF", "Every Day Science PDF", "Geography PDF"],
    ["Islamiyat PDF", "Pak Study PDF", "General Science PDF", "Basic Computer PDF"],
    ["Political Science PDF", "Operating System PDF", "Psychology PDF", "Chemistry PDF"]
  ];

  return (
    <section className="text-center py-10 px-4 mt-15">
      <h2 className="text-3xl font-bold mb-6 font-merriweather leading-tight">
        Access, Download, and Succeed <br /> with Our Notes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center max-w-5xl mx-auto">
        {notes.map((column, index) => (
          <ul key={index} className="text-left space-y-3">
            {column.map((note, i) => (
              <li key={i} className="flex items-center space-x-2 text-lg">
                <FaCheckCircle className="text-green-600" />
                <span className="font-opensans text-[15px]">{note}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <button
        className="mt-8 px-6 py-3 text-white font-medium rounded-lg shadow-md transition-transform transform hover:scale-105 hover:cursor-pointer"
        style={{
          background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
        }}
        onClick={() => navigate("/get-notes")}
      >
        Download Study Material
      </button>
    </section>
  );
};

export default StudyMaterial;
