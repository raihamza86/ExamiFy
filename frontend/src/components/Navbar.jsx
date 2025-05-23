import React, { useState, useEffect } from "react";
import { useGetUserProfileQuery } from "../store/userSlice";
import { Link, useLocation } from "react-router-dom";
import { FaUserShield, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {

  const { data, isLoading, error, refetch } = useGetUserProfileQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(!!data?.user?._id);

  const user = data?.user || null;

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();


  useEffect(() => {
    refetch(); // Refetch user data when component mounts
  }, [location.pathname]);

  useEffect(() => {
    setIsLoggedIn(!!data?.user?._id); // ✅ update on data change
  }, [data]);

  useEffect(() => {
    const handleLogoutEvent = () => {
      setIsLoggedIn(false); // ✅ forcefully remove login
    };

    window.addEventListener("logout", handleLogoutEvent);

    return () => {
      window.removeEventListener("logout", handleLogoutEvent);
    };
  }, []);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const dropdowns = [
    {
      title: "Study Resources",
      links: [
        { name: "PDF Notes", path: "/get-notes" },
        { name: "Ppsc Past Papers", path: "/past-paper-access" },
        { name: "Fpsc Past Papers", path: "/categorized-past-papers" },
      ],
    },
    {
      title: "Test & Preparation",
      links: [
        { name: "Start GK", path: "/start-gk" },
        { name: "Current Affairs Prep", path: "/current-affair-preps" },
        { name: "English", path: "/english-potential" },
        { name: "Math", path: "/math-potential" },
        { name: "Geography", path: "/geography" },
        { name: "Computer Study", path: "/computer-study" },
        { name: "Islamic Study", path: "/islamic-study" },
      ],
    },
    // {
    //   title: "Other Features",
    //   links: [
    //     { name: "SetTest", path: "/set-test" },
    //     { name: "SubmitMCQs", path: "/submit-mcq" },
    //     { name: "ComingSoon", path: "/coming-soon" },
    //   ],
    // },
  ];

  return (
    <nav className="bg-green-700 text-white w-full px-6 py-3 fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center lg:justify-start">

        <div className="text-2xl font-bold ml-6 font-merriweather cursor-pointer flex-1">
          LOGO
        </div>


        <button
          className="block lg:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>


        <div className="hidden lg:flex lg:items-center lg:space-x-6 text-[16px] font-opensans lg:ml-auto">
          {["Home", "About Us", "Contact Us"].map((name, index) => {
            const path = name.toLowerCase().replace(" ", "-");
            return (
              <Link
                key={index}
                to={`/${path === "home" ? "" : path}`}
                className={`hover:text-yellow-300 ${location.pathname === `/${path === "home" ? "" : path}`
                  ? "text-yellow-300"
                  : "text-white"
                  }`}
              >
                {name}
              </Link>
            );
          })}
          {dropdowns.map((dropdown, index) => {
            const isActive = dropdown.links.some(
              (link) => location.pathname === link.path
            );

            return (
              <div key={index} className="relative dropdown">
                <button
                  className={`flex items-center ${isActive || dropdownOpen === index
                    ? "text-yellow-300"
                    : "hover:text-yellow-300"
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(index);
                  }}
                >
                  {dropdown.title}
                  <span className="ml-1 transition-transform">
                    {dropdownOpen === index ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                </button>

                {dropdownOpen === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bg-white text-black mt-2 py-2 w-48 shadow-lg rounded"
                  >
                    {dropdown.links.map((link, i) => (
                      <Link
                        key={i}
                        to={link.path}
                        className={`block px-4 py-2 hover:bg-gray-200 text-sm ${location.pathname === link.path ? "text-yellow-500 font-bold" : ""
                          }`}
                        onClick={() => setDropdownOpen(null)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}

              </div>
            );
          })}
          {isLoggedIn && user?.role === "admin" && (<button>
            <Link to="/admin" className="text-2xl text-white" aria-label="Admin Dashboard">
              <FaUserShield />
            </Link>
          </button>)}
        </div>
      </div>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-3/4 h-full bg-green-700 text-white p-6 shadow-lg z-50"
          >
            <button
              className="text-white text-2xl absolute top-4 right-6"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
            <div className="flex flex-col space-y-4 text-lg">
              {["Home", "About Us", "Contact Us"].map((name, index) => {
                const path = name.toLowerCase().replace(" ", "-");
                return (
                  <Link
                    key={index}
                    to={`/${path === "home" ? "" : path}`}
                    className={`hover:text-yellow-300 ${location.pathname === `/${path === "home" ? "" : path}`
                      ? "text-yellow-300"
                      : "text-white"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {name}
                  </Link>
                );
              })}
              {dropdowns.map((dropdown, index) => (
                <div key={index} className="dropdown">
                  <button
                    className="flex items-center w-full justify-between text-left"
                    onClick={() => toggleDropdown(index)}
                  >
                    {dropdown.title}
                    {dropdownOpen === index ? <FaChevronDown /> : <FaChevronRight />}
                  </button>

                  {dropdownOpen === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="ml-4 mt-2 space-y-2"
                    >
                      {dropdown.links.map((link, i) => (
                        <Link
                          key={i}
                          to={link.path}
                          className="block text-sm hover:text-yellow-300"
                          onClick={() => {
                            setIsOpen(false);
                            setDropdownOpen(null);
                          }}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}

                </div>
              ))}
              {user && user.role === "admin" && (<button>
                <Link to="/admin" className="text-2xl text-white" aria-label="Admin Dashboard">
                  <FaUserShield />
                </Link>
              </button>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
