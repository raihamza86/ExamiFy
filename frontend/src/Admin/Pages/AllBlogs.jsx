import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGetAllBlogsQuery, useDeleteBlogMutation, useUpdateBlogMutation } from "../../store/blogSlice";
import EditBlogForm from "./EditBlogForm";

const AllBlogs = () => {
    const { data: blogs, isLoading, error } = useGetAllBlogsQuery();
    const [deleteBlog] = useDeleteBlogMutation();
    const [updateBlog] = useUpdateBlogMutation();

    const [editingBlog, setEditingBlog] = useState(null);

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id).unwrap();
            toast.success("🗑️ Blog deleted successfully!");
        } catch (err) {
            toast.error("❌ Failed to delete blog!");
        }
    };

    const handleUpdate = async (formData) => {
        try {
            await updateBlog({ id: editingBlog._id, updatedBlog: formData }).unwrap();
            toast.success("✍️ Blog updated successfully!");
            setEditingBlog(null);
        } catch (err) {
            toast.error("❌ Failed to update blog!");
        }
    };

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

    return (
        <div className="p-6 md:ml-[250px] transition-all duration-300">
            {editingBlog ? (
                <EditBlogForm
                    initialData={editingBlog}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingBlog(null)}
                />
            ) : (
                <div>
                    <h1 className="text-2xl font-semibold mb-4">All Blogs</h1>

                    {blogs.length === 0 ? (
                        <div className="bg-yellow-50 text-yellow-800 border border-yellow-300 rounded-lg p-6 text-center shadow-md">
                            <h2 className="text-2xl font-bold mb-2">📭 No Blogs Found</h2>
                            <p className="text-lg">Looks like there are no blogs yet. Start by creating one!</p>
                        </div>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg p-4">
                            {blogs.map((blog) => (
                                <div
                                    key={blog._id}
                                    className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-50 p-4 rounded-lg shadow mb-4 hover:bg-gray-100 transition"
                                >
                                    {blog.image && (
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                    )}
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-lg font-bold">  {blog.title?.length > 50 ? `${blog.title.substring(0, 50)}...` : blog.title}</h2>
                                        <p className="text-gray-600">
                                            {blog.content?.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Category: {blog.category}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingBlog(blog)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition hover:cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition hover:cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllBlogs;
