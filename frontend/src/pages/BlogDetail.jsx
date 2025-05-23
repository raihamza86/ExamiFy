import React from "react";
import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../store/blogSlice";
import MainLayout from '../layout/MainLayout'

const BlogDetail = () => {
    const { id } = useParams();
    const { data: blog, error, isLoading } = useGetBlogByIdQuery(id);

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-[70vh] bg-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                    <p className="text-green-700 font-semibold text-lg animate-pulse">
                        📰 Loading blog...
                    </p>
                </div>
            </div>
        );

    if (error) {
        return (

            <div className="flex items-center justify-center h-[60vh]">
                <p className="text-red-600 text-lg font-semibold">
                    ❌ Error fetching blog details!
                </p>
            </div>
        );
    }

    const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto p-6 mt-16 bg-white shadow-lg rounded-lg border border-gray-200">
                {blog.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                )}

                <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>

                <div className="text-sm text-gray-500 mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2">
                        {blog.category}
                    </span>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        {formattedDate}
                    </span>
                </div>

                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {blog.content}
                </p>
            </div>

        </MainLayout>
    );
};

export default BlogDetail;
