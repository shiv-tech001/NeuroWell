import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await authService.forgotPassword(email);
      setEmailSent(true);
      toast.success('Password reset instructions sent to your email!');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to send reset email. Please try again.');
      toast.error(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Navigation */}
      <nav className="w-full px-6 py-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900">Mindful</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
              Services
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Forgot Password Form */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Forgot Password?
            </h1>
            <p className="text-gray-600">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          {/* Success Message */}
          {emailSent && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    ✅ Reset instructions sent! Please check your email and follow the instructions to reset your password.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    ❌ {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email || emailSent}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="ml-2">Sending...</span>
                </div>
              ) : emailSent ? (
                'Email Sent ✓'
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600">Remembered your password? </span>
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ForgotPassword;
