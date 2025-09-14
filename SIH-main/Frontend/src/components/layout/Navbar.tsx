import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'text-purple-600 font-medium' : 'text-gray-600 hover:text-purple-600 transition';

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="font-bold text-xl text-gray-800">MindfulU</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
            <Link to="/student/dashboard" className={isActive('/student/dashboard')}>
              Dashboard
            </Link>
            <Link to="/student/resources" className={isActive('/student/resources')}>
              Resource
            </Link>
            <Link to="/student/community" className={isActive('/student/community')}>
              Community
            </Link>
            <Link to="/services" className={isActive('/services')}>
              Services
            </Link>
            <Link to="/contact" className={isActive('/contact')}>
              Contact
            </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Link 
              to="/logout" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full transition shadow-md hover:shadow-lg"
            >
              Logout
            </Link>
          ) : location.pathname === '/' ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-purple-600 transition">
                Login
              </Link>
              <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full transition shadow-md hover:shadow-lg">
                Register
              </Link>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
