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
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Links Section */}
          <div className="space-y-3">
            <h4 className="font-semibold text-base sm:text-lg mb-3 text-gray-800">Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                <FaUserFriends className="text-purple-600 flex-shrink-0" />
                <Link 
                  to="/about" 
                  className="hover:text-purple-800 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                <FaBookOpen className="text-purple-600 flex-shrink-0" />
                <Link 
                  to="/student/resources" 
                  className="hover:text-purple-800 transition-colors duration-200"
                >
                  Resources
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                <FaUsers className="text-purple-600 flex-shrink-0" />
                <Link 
                  to="/community" 
                  className="hover:text-purple-800 transition-colors duration-200"
                >
                  Community
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                <FaQuestionCircle className="text-purple-600 flex-shrink-0" />
                <Link 
                  to="/support" 
                  className="hover:text-purple-800 transition-colors duration-200"
                >
                  Support
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                <FaConciergeBell className="text-purple-600 flex-shrink-0" />
                <Link 
                  to="/services" 
                  className="hover:text-purple-800 transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h4 className="font-semibold text-base sm:text-lg mb-3 text-gray-800">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                <FaEnvelope className="text-purple-600 flex-shrink-0" />
                <a 
                  href="mailto:support@mindfulu.edu" 
                  className="hover:text-purple-800 transition-colors duration-200 break-all"
                >
                  support@mindfulu.edu
                </a>
              </li>
              <li className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                <FaPhoneAlt className="text-purple-600 flex-shrink-0" />
                <a 
                  href="tel:+15551234567" 
                  className="hover:text-purple-800 transition-colors duration-200"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform">
                <FaMapMarkerAlt className="text-purple-600 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  123 Wellness Street, Mindful City, MC 12345, United States
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-base sm:text-lg mb-3 text-gray-800">Follow Us</h4>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a 
                href="#" 
                aria-label="Facebook" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-800 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
              <a 
                href="#" 
                aria-label="Instagram" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-800 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
              <a 
                href="#" 
                aria-label="Twitter" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-800 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-800 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            </div>

            {/* Newsletter Signup - Mobile Optimized */}
            <div className="mt-4 pt-4 border-t border-gray-300 lg:border-t-0 lg:pt-0 lg:mt-6">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Stay updated with our latest news</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-6 pt-4">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              © {new Date().getFullYear()} MindfulU. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <Link 
                to="/privacy" 
                className="text-xs sm:text-sm text-gray-600 hover:text-purple-800 hover:underline transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-xs sm:text-sm text-gray-600 hover:text-purple-800 hover:underline transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-xs sm:text-sm text-gray-600 hover:text-purple-800 hover:underline transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Mobile-Only Brand Section */}
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Made with 💜 for student wellness
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
