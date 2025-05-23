import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  BarChart3,
  Users,
  LayoutDashboard,
  Menu,
  X,
  CircleFadingPlus,
  ReceiptText
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current path

  const menuItems = [
    { name: "Mcq's List", icon: <BookOpen size={24} className="text-green-500" />, link: "/admin/pastpapers" },
    { name: "Upload Paper", icon: <BookOpen size={24} className="text-green-500" />, link: "/admin/uploadpaper" },
    { name: "Upload Mcq's", icon: <BookOpen size={24} className="text-green-500" />, link: "/admin/mcqform" },
    { name: "Past Papers List", icon: <BarChart3 size={24} className="text-green-500" />, link: "/admin/paperlist" },
    { name: "Student Data", icon: <Users size={24} className="text-green-500" />, link: "/admin/studentdata" },
    { name: "Create Blogs", icon: <CircleFadingPlus size={24} className="text-green-500" />, link: "/admin/create-blog" },
    { name: "All Blogs", icon: <ReceiptText size={24} className="text-green-500" />, link: "/admin/all-blogs" },
    // { name: "Admin Dashboard", icon: <LayoutDashboard size={24} className="text-green-500" />, link: "/admin/admindashboard" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 text-green-500 p-2 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Fixed Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-2 flex flex-col justify-between z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Admin Panel</h2>

        {/* Sidebar Menu */}
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className={`flex items-center space-x-4 p-3 rounded-md text-gray-700 text-lg hover:bg-gray-100 transition ${location.pathname === item.link ? "bg-gray-200 font-semibold" : ""
                  }`}
                onClick={() => setIsOpen(false)} // Close menu on mobile
              >
                {item.icon}
                <span className="text-base">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Home Button */}
        <div className="mt-4">
          <Link
            to="/"
            className="flex items-center space-x-4 p-3 rounded-md text-white bg-green-600 text-lg hover:bg-green-700 transition justify-center"
          >
            <Home size={24} className="text-white" />
            <span className="text-base">Home</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
