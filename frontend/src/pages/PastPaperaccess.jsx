import MainLayout from '../layout/MainLayout';
import './FaqSection';
import FAQSection from './FaqSection';
import { useNavigate } from "react-router-dom";

const PastPapersaccess = () => {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <>
                <div
                    className="text-white py-10 px-4 text-center mb-4 md:mb-6 bg-green-700 mt-15"

                >
                    <h1
                        className="text-xl md:text-5xl font-bold"
                        style={{ fontFamily: "Merriweather, serif" }}
                    >
                        Master <span className="text-yellow-400">the Exam with</span> <br />
                        PPSC Past Papers
                    </h1>
                    <button className="mt-4 md:mt-6 px-6 py-3 border border-white text-white rounded-lg transition hover:bg-yellow-400 hover:text-black hover:cursor-pointer" onClick={() => navigate("/past-papers?category=Ppsc Past Papers")}>
                        Access Past Papers
                    </button>
                </div>

                <div className="max-w-4xl p-6 text-left">
                    <h1
                        className="ml-4"
                        style={{
                            fontFamily: "Merriweather",
                            fontWeight: 700,
                            fontSize: "42px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                        }}
                    >
                        Discover Past Papers for All <br />PPSC Exams
                    </h1>
                    <p
                        className="mt-2 text-gray-700 text-sm ml-4 max-w-3xl"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                    >
                        These past papers are essential for preparation, as PPSC often designs 70% of its MCQ-based
                        exams using previous papers. Our database includes past papers for a diverse range of roles
                        previously offered by PPSC, providing an extensive variety of MCQ tests to enhance your readiness.
                        Each paper consists of 100 MCQs, divided into manageable sets of 20 questions, allowing for
                        efficient and focused learning. Additionally, detailed explanations accompany each question,
                        helping aspirants understand concepts thoroughly. Candidates can attempt these MCQs to assess
                        their knowledge, instantly view correct answers, and learn from the explanations provided. Below,
                        you'll find PPSC past papers organized by category to support your preparation.
                    </p>
                </div>
                <FAQSection category={"Ppsc Past Papers"} />
            </>
        </MainLayout>
    );
};

export default PastPapersaccess;