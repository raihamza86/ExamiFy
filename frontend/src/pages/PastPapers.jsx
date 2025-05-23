import React from "react";
import { toast } from "react-toastify";
import { useGetPapersQuery } from "../store/pastPaperSlice";
import MainLayout from "../layout/MainLayout";
import { useLocation } from "react-router-dom";

const PastPapers = () => {
    const location = useLocation();
    const categoryFromState = location.state?.category;
    const queryParams = new URLSearchParams(location.search);
    const categoryFromQuery = queryParams.get("category");

    const selectedCategory = categoryFromState || categoryFromQuery || null;

    const { data: papers, error, isLoading } = useGetPapersQuery();

    const filteredPapers = selectedCategory
        ? papers?.filter((paper) => paper.category === selectedCategory)
        : papers;

    if (isLoading)
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-[70vh] bg-white">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                        <p className="text-green-700 font-semibold text-lg animate-pulse">
                            Loading Past Papers...
                        </p>
                    </div>
                </div>
            </MainLayout>
        );

    if (error) {
        return (
            <MainLayout>
                <p className="text-red-500 text-center mt-6">{error.message}</p>
            </MainLayout>
        );
    }

    if (!filteredPapers || filteredPapers.length === 0) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center h-[70vh] text-center p-4">
                    <img
                        src="/no-data.png"
                        alt="No Papers"
                        className="w-40 h-40 mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        No Papers Found
                    </h2>
                    <p className="text-gray-500">
                        We couldn't find any papers related to the category{" "}
                        <span className="font-bold text-green-600">
                            {selectedCategory}
                        </span>
                        .
                    </p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="p-6 transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4">
                    Showing {selectedCategory} Past Papers
                </h2>
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredPapers.map((paper) => (
                        <div
                            key={paper._id}
                            className="flex flex-col md:items-start items-center gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
                        >
                            <img
                                src="/pdf-icon.png"
                                alt={paper.subject}
                                className="w-20 h-20 object-cover"
                            />
                            <div className="text-center md:text-left space-y-1">
                                <p className="text-gray-500 text-sm">Category: {paper.category}</p>
                                <h2 className="text-lg font-bold text-gray-800">{paper.subject}</h2>
                                <p className="text-gray-600">{paper.title}</p>
                                <p className="text-sm text-gray-400">Year: {paper.year}</p>
                            </div>
                            <a
                                href={paper.fileUrl || "#"}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-4 py-2 ${paper.fileUrl
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-400 cursor-not-allowed"
                                    } text-white rounded-lg transition`}
                                onClick={(e) => {
                                    if (!paper.fileUrl) {
                                        e.preventDefault();
                                        toast.error("File not available.");
                                    }
                                }}
                            >
                                Download
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};


export default PastPapers;
