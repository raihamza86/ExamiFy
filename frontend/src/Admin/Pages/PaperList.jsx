import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetPapersQuery,
  useUpdatePaperMutation,
  useDeletePaperMutation,
} from "../../store/pastPaperSlice";

const PaperList = () => {
  const { data: papers, error, isLoading } = useGetPapersQuery();
  const [updatePaper] = useUpdatePaperMutation();
  const [deletePaper] = useDeletePaperMutation();

  const [editingPaper, setEditingPaper] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh] bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold text-lg animate-pulse">
            📄 Loading papers...
          </p>
        </div>
      </div>
    );

  if (!papers || papers.length === 0) {
    return <p className="text-gray-600 text-center mt-4">🚫 No past papers available.</p>;
  }

  // ✅ Handle Edit Paper
  const handleEdit = (paper) => {
    setEditingPaper(paper);
    setShowForm(true);
  };

  // ✅ Handle Delete Paper
  const handleDelete = async (id) => {
    try {
      await deletePaper(id).unwrap();
      toast.success("Paper deleted successfully! 🎉");
    } catch (error) {
      toast.error("Failed to delete paper! ❌");
    }
  };

  // ✅ Handle Form Submit (for updating paper)
  const handleFormSubmit = async (formData) => {
    if (editingPaper) {
      try {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("subject", formData.subject);
        data.append("year", formData.year);
        data.append("category", formData.category);

        // Append file only if it's changed
        if (formData.file && formData.file instanceof File) {
          data.append("file", formData.file);
        }

        await updatePaper({ id: editingPaper._id, formData: data }).unwrap();
        toast.success("Paper updated successfully! ✅");
      } catch (error) {
        toast.error("Error updating paper: " + error.message);
      }
    }
    setEditingPaper(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 md:ml-[250px] transition-all duration-300">
      {showForm ? (
        <UploadPaper
          initialData={editingPaper}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div>
          {error && <p className="text-red-500 text-center">{error.message}</p>}
          <h1 className="text-2xl font-semibold mb-4">Past Papers</h1>
          <div className="bg-white shadow-md rounded-lg p-4">
            {papers.map((paper) => (
              <div
                key={paper._id}
                className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-md mb-4 hover:bg-gray-100 transition"
              >
                <img
                  src="/pdf-icon.png"
                  alt={paper.subject}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-lg font-bold">{paper.subject}</h2>
                  <h2 className="text-lg ">Category: {paper.category}</h2>
                  <p className="text-gray-500 font-semibold">{paper.title}</p>
                  <p className="text-gray-600">{paper.year}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(paper)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition hover:cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(paper._id)}
                    className="px-4 hover:cursor-pointer py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Upload & Edit Form Component
const UploadPaper = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || { title: "", subject: "", year: "", category: "" }
  );

  const categories = ['PDF Notes', 'Ppsc Past Papers', 'Fpsc Past Papers'];

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {initialData ? "Edit Paper" : "Upload Past Paper"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
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
            <label className="block text-gray-700 font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={handleChange}
              name="category"
              required
              className="w-full p-3 border border-gray-300 rounded-xl"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1"> Upload File </label>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-500 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaperList;
