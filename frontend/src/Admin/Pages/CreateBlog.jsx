import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateBlogMutation } from "../../store/blogSlice";

const CreateBlog = () => {
    const navigate = useNavigate();
    const [createBlog, { isLoading, error }] = useCreateBlogMutation();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        image: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error("Please select an image.");
            return;
        }

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("content", formData.content);
            data.append("category", formData.category);
            data.append("image", formData.image);

            await createBlog(data).unwrap();
            toast.success("Blog created successfully! 📝");

            setFormData({
                title: "",
                content: "",
                category: "",
                image: null
            });

            e.target.reset();
            navigate("/admin/all-blogs");
        } catch (err) {
            toast.error("Failed to create blog.");
            console.error("Error:", err);
        }
    };

    return (
        <div className="flex items-center justify-center p-4 md:ml-[250px]">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    📝 Create New Blog
                </h2>
                {error && <p className="text-red-500 text-center">{error?.data?.message}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
                        <input
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Category</label>
                        <input
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-gray-700 font-medium mb-1">Content</label>
                        <textarea
                            name="content"
                            id="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={handleFileChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating..." : "Create Blog"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
