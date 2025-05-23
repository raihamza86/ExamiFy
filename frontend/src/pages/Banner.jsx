import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useGetUserProfileQuery } from "../store/userSlice";
import { useLogoutUserMutation } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetUserProfileQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(!!data?.user?._id);

  useEffect(() => {
    setIsLoggedIn(!!data?.user?._id);
  }, [data]);

  const user = data?.user || null; // Ensure `user` is null when not logged in

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      toast.success("Log Out successful! 🎉");
      setIsLoggedIn(false);

      window.dispatchEvent(new Event("logout"));

      await refetch(); // ✅ Refetch user profile after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] flex items-center bg-cover bg-center px-4 md:px-16"
      style={{ backgroundImage: "url('/img1.png')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      <div className="relative text-white max-w-2xl text-left">
        <h1
          className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Best Place to Prepare for Competitive Exams
        </h1>
        <p
          className="mt-4 text-sm sm:text-base font-light px-2"
          style={{ fontFamily: "Open Sans, sans-serif" }}
        >
          SkillSphere is a digital platform to crack competitive exams for government jobs with interactive quizzes,
          in-depth answers, and previous paper analysis for PPSC and FPSC. Platforms for Test Prep and MCQs.
        </p>

        {/* Button Section */}
        <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className="px-6 py-3 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden w-full sm:w-auto hover:cursor-pointer"
            style={{
              background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
              backgroundSize: "200% 100%",
              transition: "background-position 0.5s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundPosition = "100% 0")}
            onMouseLeave={(e) => (e.target.style.backgroundPosition = "0 0")}
            onClick={() => navigate("/start-gk")}
          >
            Prepare for Exams
          </button>

          {/* Show buttons only when data is loaded */}
          {!isLoading && (
            !isLoggedIn ? (
              <Link to="/signup">
                <button
                  className="px-6 py-3 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden w-full sm:w-auto hover:cursor-pointer"
                  style={{
                    background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
                    backgroundSize: "200% 100%",
                    transition: "background-position 0.5s ease-in-out",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundPosition = "100% 0")}
                  onMouseLeave={(e) => (e.target.style.backgroundPosition = "0 0")}
                >
                  Register Now
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-6 py-3 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden w-full sm:w-auto hover:cursor-pointer"
                style={{
                  background: "linear-gradient(275.76deg, #347928 44.33%, #FCCD2A 98.56%)",
                  backgroundSize: "200% 100%",
                  transition: "background-position 0.5s ease-in-out",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundPosition = "100% 0")}
                onMouseLeave={(e) => (e.target.style.backgroundPosition = "0 0")}
              >
                Log Out
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
