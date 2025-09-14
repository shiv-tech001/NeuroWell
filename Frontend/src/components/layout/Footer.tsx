import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserFriends,    // About Us
  FaBookOpen,       // Resources
  FaUsers,          // Community
  FaQuestionCircle, // Support
  FaConciergeBell,  // Services
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-white via-gray-100 to-gray-200 text-gray-900">
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links with icons */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Links</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FaUserFriends className ="text-purple-600" />
                <Link to="/about" className="hover:text-purple-800 transition">About Us</Link>
              </li>
              <li className="flex items-center gap-2">
                <FaBookOpen className="text-purple-600" />
                <Link to="/student/resources" className="hover:text-purple-800 transition">Resources</Link>
              </li>
              <li className="flex items-center gap-2">
                <FaUsers className="text-purple-600" />
                <Link to="/community" className="hover:text-purple-800 transition">Community</Link>
              </li>
              <li className="flex items-center gap-2">
                <FaQuestionCircle className="text-purple-600" />
                <Link to="/support" className="hover:text-purple-800 transition">Support</Link>
              </li>
              <li className="flex items-center gap-2">
                <FaConciergeBell className="text-purple-600" />
                <Link to="/services" className="hover:text-purple-800 transition">Services</Link>
              </li>
            </ul>
          </div>
          {/* Contact with icons */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-purple-600" />
                support@mindfulu.edu
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-purple-600" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-purple-600 mt-1" />
                123 Wellness Street, Mindful City, MC 12345, United States
              </li>
            </ul>
          </div>
          {/* Social Media with icons */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-800 transition">
                <FaFacebookF className="w-4 h-4 text-white" />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-800 transition">
                <FaInstagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-800 transition">
                <FaTwitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-800 transition">
                <FaLinkedinIn className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} MindfulU. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-sm hover:underline">Terms of Service</Link>
            <Link to="/cookies" className="text-sm hover:underline">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
