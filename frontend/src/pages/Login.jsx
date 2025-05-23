import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      const res = await loginUser(formData);

      if (res.error) {
        setErrorMessage(res.error.data?.message || "Login failed. Please try again.");
      } else {
        toast.success("Login successful! 🎉");
        navigate("/"); // Redirect on success
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-6">Login Now</h2>

          {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "SIGN IN"}
            </button>
          </form>
        </div>

        {/* Right Section - Signup Prompt */}
        <div
          className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center relative flex"
          style={{ backgroundImage: "url('/img1.png')" }}
        >
          <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-6">
            <h3 className="text-xl font-bold font-merriweather">New here?</h3>
            <p className="mb-4 font-merriweather">Sign up and explore new opportunities!</p>
            <Link to="/signup">
              <button className="border-2 border-green-400 text-white px-6 py-2 rounded-full bg-green-700 font-bold hover:bg-green-600 transition font-merriweather">
                Signup
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
