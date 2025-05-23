import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditBlogForm = ({ initialData, onSubmit, onCancel }) => {
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: initialData.title || "",
        content: initialData.content || "",
        category: initialData.category || "",
        image: initialData.image || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const updatedFormData = new FormData();
            updatedFormData.append("title", formData.title);
            updatedFormData.append("content", formData.content);
            updatedFormData.append("category", formData.category);
            if (imageFile) {
                updatedFormData.append("image", imageFile);
            } else {
                updatedFormData.append("image", formData.image);
            }

            await onSubmit(updatedFormData); // you should return a promise here from parent

            navigate("/admin/all-blogs");
        } catch (error) {
            console.error("Update Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg border border-gray-200">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Edit Blog
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg"
                            rows={5}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Current Image</label>
                        <img
                            src={formData.image}
                            alt="Current Blog"
                            className="w-full px-4 py-3 border rounded-lg"
                            placeholder="Image URL (if not uploading new)"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Upload New Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full text-white py-3 rounded-lg font-semibold transition ${isSubmitting ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
                                }`}
                        >
                            {isSubmitting ? "Updating..." : "Update Blog"}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlogForm;
