import React from "react";
import { User, Calendar } from "lucide-react"; // Importing icons
import { useGetAllBlogsQuery } from "../store/blogSlice";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const { data: blogs, isLoading, error } = useGetAllBlogsQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh] bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold text-lg animate-pulse">
            📰 Loading blogs...
          </p>
        </div>
      </div>
    );
  if (error) return <p className="text-red-500 text-center">❌ Error fetching blogs</p>;

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <img src="/no-blog.png" alt="No blogs" className="w-40 h-40 mb-6" /> {/* Optional image */}
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No blogs available yet!</h3>
        <p className="text-gray-500 text-lg">
          We’re working on some amazing content. Stay tuned ✨
        </p>
      </div>
    );
  }


  return (
    <div className="pb-12 px-4 sm:px-6 lg:px-12 mb-10">
      <h2 className="text-center text-3xl font-bold mb-8 font-merriweather">
        Our Blog
      </h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="max-w-sm w-full mx-auto border border-green-400 rounded-lg shadow-lg overflow-hidden"
          >
            {/* Blog Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />


            <div className="p-4">
              <p className="text-gray-800 font-semibold text-lg">  {blog.title?.length > 50 ? `${blog.title.substring(0, 50)}...` : blog.title}</p>
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <User className="w-4 h-4 text-gray-400 mr-1" />
                <span className="mr-3">By Admin</span>
                <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Link to={`/blogs/${blog._id}`}>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full hover:cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
