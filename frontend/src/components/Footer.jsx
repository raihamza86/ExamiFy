import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { FaMapMarkerAlt, FaClock, FaPhone, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-[15px] font-opensans">

        <div>
          <h3 className="text-2xl font-merriweather mb-3">Localization</h3>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> 123 Exam Lane, Study City, ST 45
          </p>
          <p className="flex items-center gap-2">
            <FaClock /> Mon-Fri: 9 AM - 5 PM
          </p>
          <p className="flex items-center gap-2">
            <FaPhone /> +1 234 567 890
          </p>
        </div>

        {/* Quick Links with Links from Navbar */}
        <div>
          <h3 className="text-2xl font-merriweather mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about-us" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/get-notes" className="hover:underline">Get Notes</Link></li>
            <li><Link to="/past-paper-access" className="hover:underline">Past Paper Access</Link></li>
            <li><Link to="/categorized-past-papers" className="hover:underline">Categorized Past Papers</Link></li>
            <li><Link to="/start-gk" className="hover:underline">Start GK</Link></li>
            <li><Link to="/current-affair-preps" className="hover:underline">Current Affairs Prep</Link></li>
          </ul>
        </div>

        {/* All Subjects */}
        <div>
          <h3 className="text-2xl font-merriweather mb-3">All Subjects</h3>
          <ul className="space-y-2">
            <li><Link to="/current-affair-preps" className="hover:underline">Pakistan Affairs</Link></li>
            <li><Link to="/start-gk" className="hover:underline">General Knowledge</Link></li>
            <li><Link to="/everyday-science" className="hover:underline">Everyday Science</Link></li>
            <li><Link to="/computer-study" className="hover:underline">Computer Studies</Link></li>
            <li><Link to="/islamic-study" className="hover:underline">Islamic Study</Link></li>
            <li><Link to="/english-potential" className="hover:underline">English</Link></li>

            <li><Link to="/math-potential" className="hover:underline">Math</Link></li>
          </ul>
        </div>


        <div>
          <h3 className="text-2xl font-merriweather mb-3">Newsletter</h3>
          <p className="mb-2">Subscribe To Our Newsletter</p>
          <div className="flex flex-col sm:flex-row w-full gap-2">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="p-2 w-full text-black rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none bg-white sm:w-4/5 md:w-3/4 lg:w-2/3"
            />
            <button
              className="bg-yellow-400 text-black px-4 py-2 w-full sm:w-auto rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-yellow-500"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>


      <div className="mt-6 border-t-2 border-white w-full pt-4 flex flex-col items-center">
        <div className="flex space-x-4 text-xl mb-3">
          <FaFacebook className="hover:text-gray-300 cursor-pointer" />
          <FaTwitter className="hover:text-gray-300 cursor-pointer" />
          <FaInstagram className="hover:text-gray-300 cursor-pointer" />
          <FaLinkedin className="hover:text-gray-300 cursor-pointer" />
        </div>
        <p className="text-[15px] font-opensans text-center">
          © 2025 SkillSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
