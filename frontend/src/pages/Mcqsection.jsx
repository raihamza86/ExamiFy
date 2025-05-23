import { useNavigate } from "react-router-dom";

export default function McqSection({ category }) {
  const navigate = useNavigate();

  const mcqs = [
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "South Korea", "Japan"],
      correct: 2,
    },
    {
      question: "Who won the Nobel Peace Prize in 2020?",
      options: ["Greta Thunberg", "World Health", "Malala Yousafzai"],
      correct: 1,
    },
    {
      question: "Who won the FIFA World Cup in 2018?",
      options: ["Brazil", "Germany", "France"],
      correct: 2,
    },
    {
      question: "Who was the first president of the United States?",
      options: ["Abrahain", "ferson", "Georgn"],
      correct: 2,
    },
    {
      question: "Who is the co-founder of Microsoft?",
      options: ["BilGates", "SteveJobs", "JeffBezos"],
      correct: 0,
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2"],
      correct: 1,
    },
  ];

  const handleStartQuiz = () => {
    navigate(`/startquiz?category=${category}`);
  };

  return (
    <div className="flex flex-col items-center px-6 mt-15">
      <div className="max-w-5xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {mcqs.map((mcq, index) => (
            <div key={index} className="border p-5 shadow-md bg-white">
              <h3 className="text-sm md:text-base font-semibold">{mcq.question}</h3>
              <hr className="my-2 border-gray-300" />
              <ul className="flex space-x-6 text-sm">
                {mcq.options.map((option, i) => (
                  <li key={i} className={`py-1 ${i === mcq.correct ? "text-yellow-500 font-bold" : "text-gray-700"}`}>
                    {String.fromCharCode(65 + i)}) {option}
                  </li>
                ))}
              </ul>
              <p className="text-green-600 mt-2 cursor-pointer text-sm">Understand More About This Mcqs..</p>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Button at the End */}
      <button
        className="mt-6 px-6 py-3 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden hover:cursor-pointer"
        style={{
          background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
          backgroundSize: "200% 100%",
          transition: "background-position 0.5s ease-in-out",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundPosition = "100% 0")}
        onMouseLeave={(e) => (e.target.style.backgroundPosition = "0 0")}
        onClick={handleStartQuiz}
      >
        Prepare For Exams
      </button>

    </div>
  );
}
