import { useState } from "react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "How can I download PPSC past papers from this website?",
    answer:
      "To download PPSC past papers, visit the PPSC Past Papers section on the website, select the desired subject or year, and click the download button. Ensure you are logged in if required for access.",
  },
  {
    question: "Can I find past papers for specific years or exams?",
    answer: "Yes, you can search for past papers by specific years or exam categories in the PPSC archive section.",
  },
  {
    question: "Where can I search for a specific PPSC past paper?",
    answer: "Use the search bar in the PPSC Past Papers section to find a specific past paper based on subject or year.",
  },
  {
    question: "Do I need an account to view the past papers?",
    answer: "In most cases, you may need to log in to access past papers, depending on the website's policies.",
  },
];

export default function FAQSection({ category }) {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-leftnmt-15">
      <h2
        className="text-3xl sm:text-4xl font-bold mb-4"
        style={{ fontFamily: "Merriweather, serif" }}
      >
        Need Help? Check These FAQs
      </h2>
      <p className="mb-6 text-xs sm:text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
        FAQs play a vital role in websites by providing quick and clear answers to common user questions, improving navigation and user experience while reducing the need for direct support.
      </p>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 pb-2 border-b border-dotted border-gray-400">
            <h3 className="text-green-700 font-bold mb-1 text-sm sm:text-base" style={{ fontFamily: "Merriweather, serif" }}>
              Question {index + 1}
            </h3>
            <button
              className="w-full p-2 flex justify-start items-center text-left text-black text-xs sm:text-sm border rounded-md"
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1">{faq.question}</span>
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <div className="p-2 text-xs sm:text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
                <h4 className="text-green-700 font-bold mt-2" style={{ fontFamily: "Merriweather, serif" }}>
                  Answer
                </h4>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="w-1/3 mt-6 text-white py-2 rounded-md text-xs sm:text-sm hover:cursor-pointer"
        style={{
          background:
            "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
        }}
        onClick={() => navigate(`/past-papers?category=${category}`)}
      >
        Get Answers
      </button>
    </div>
  );
}