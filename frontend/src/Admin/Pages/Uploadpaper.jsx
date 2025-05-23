import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUploadPaperMutation } from "../../store/pastPaperSlice";

const UploadPaper = () => {
  const navigate = useNavigate();
  const [uploadPaper, { isLoading, error }] = useUploadPaperMutation();
  const categories = ['PDF Notes', 'Ppsc Past Papers', 'Fpsc Past Papers'];

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    category: "",
    subject: "",
    file: null
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category before uploading.");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("year", formData.year);
      data.append("category", formData.category);
      data.append("subject", formData.subject);
      data.append("file", formData.file);
      await uploadPaper(data).unwrap();;
      toast.success("Paper uploaded successfully! 🎉");
      navigate("/admin/paperlist");
      // Reset Form
      setFormData({
        title: "",
        year: "",
        category: "",
        subject: "",
        file: null,
      });
      e.target.reset();
    } catch (err) {
      toast.error("Error uploading paper.");
    }
  };

  return (
    <div className="flex items-center justify-center p-4 md:ml-[250px]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          📄 Upload Past Paper
        </h2>
        {error && <p className="text-red-500 text-center">Error: {error.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none shadow-sm"

            />
          </div>

          {/* Class Category Selection */}
          <div>
            <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Subject</label>
            <input
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none shadow-sm"

            />
          </div>

          {/* Board Selection */}
          <div>
            <label htmlFor="year" className="block text-gray-700 font-medium mb-1">Year</label>
            <input
              name="year"
              type="number"
              id="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
            />
          </div>
          {/* Board Selection */}
          <div>
            <label htmlFor="year" className="block text-gray-700 font-medium mb-1">Select Category</label>
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

          {/* Upload Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload Pdf</label>
            <input
              type="file"
              accept="application/pdf"
              required
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition duration-300 shadow-md hover:cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPaper;
