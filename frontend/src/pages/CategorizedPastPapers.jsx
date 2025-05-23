import MainLayout from '../layout/MainLayout';
import './FaqSection';
import FAQSection from './FaqSection';
import { useNavigate } from "react-router-dom";

export default function CategorizedPastPaper() {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <>
                <div
                    className="text-white py-10 px-4 text-center mb-4 md:mb bg-green-700 mt-15"

                >
                    <h1
                        className="text-xl md:text-5xl font-bold"
                        style={{ fontFamily: "Merriweather, serif" }}
                    >
                        Ace Your <span className="text-yellow-400">FPSC Exam</span> <br />
                        with Past Papers
                    </h1>
                    <button className="mt-4 md:mt-6 px-6 py-3 border border-white text-white rounded-lg transition hover:bg-yellow-400 hover:text-black hover:cursor-pointer" onClick={() => navigate("/past-papers?category=Fpsc Past Papers")}>
                        Access Past Papers
                    </button>
                </div>
                <div className="p-10 text-black">
                    <p className="text-base text-gray-800">
                        Unlock your potential with our extensive collection of FPSC past papers, tailored to help you excel in all major exams. From General Knowledge and English to Current Affairs and subject-specific tests, our repository is organized by year, subject, and exam type for effortless navigation. Practice with authentic past papers to familiarize yourself with exam patterns, sharpen your time management skills, and focus on high-yield topics. Whether you're preparing for CSS, general recruitment, or departmental exams, our platform provides detailed solutions, expert tips, and essential resources to boost your confidence. Start your journey to FPSC success today.
                    </p>

                    <h2 className="text-2xl font-bold mt-6" style={{ fontFamily: 'Merriweather' }}>
                        If Focused on Benefits of Past Papers:
                    </h2>

                    <h3 className="text-xl font-bold mt-4 text-green-700" style={{ fontFamily: 'Merriweather' }}>
                        Why Practice with FPSC Past Papers?
                    </h3>

                    <ul className="mt-2 space-y-3">
                        {["Past papers help candidates familiarize themselves with the format and structure of the exam.",
                            "Recognizing frequently asked topics allows for focused preparation on high-priority areas.",
                            "Simulating exam conditions with past papers builds the ability to manage time effectively during the real exam.",
                            "Practicing past papers reduces anxiety by making candidates feel more prepared and experienced.",
                            "Self-assessment through past papers helps aspirants pinpoint areas that need improvement."]
                            .map((point, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-green-700 text-base mr-2">●</span>
                                    <p className="text-gray-800" style={{ fontFamily: 'Open Sans' }}>{point}</p>
                                </li>
                            ))}
                    </ul>

                    <h2 className="text-2xl font-bold mt-6" style={{ fontFamily: 'Merriweather' }}>
                        Categorization of Past Papers
                    </h2>

                    <div className="mt-4 p-4 border-l-4 border-green-500">
                        <h3 className="text-lg font-bold text-green-700" style={{ fontFamily: 'Merriweather' }}>
                            By Subject/Topic:
                        </h3>
                        <p className="text-gray-800" style={{ fontFamily: 'Open Sans' }}>
                            Organize papers into categories like General Knowledge, Current Affairs, English, and specific job-related subjects.
                        </p>
                    </div>

                    <div className="mt-4 p-4 border-l-4 border-green-500">
                        <h3 className="text-lg font-bold text-green-700" style={{ fontFamily: 'Merriweather' }}>
                            By Year:
                        </h3>
                        <p className="text-gray-800" style={{ fontFamily: 'Open Sans' }}>
                            Allow users to access papers by the year they were conducted.
                        </p>
                    </div>

                    <div className="mt-4 p-4 border-l-4 border-green-500">
                        <h3 className="text-lg font-bold text-green-700" style={{ fontFamily: 'Merriweather' }}>
                            By Exam Type:
                        </h3>
                        <p className="text-gray-800" style={{ fontFamily: 'Open Sans' }}>
                            Differentiate between CSS, PMS, or FPSC-specific exams for clarity.
                        </p>
                    </div>
                </div>
                <FAQSection category={"Fpsc Past Papers"} />
            </>
        </MainLayout>
    );
}