import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon, EyeSlashIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [resetSuccess, setResetSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setErrors({ general: 'Invalid reset link. Please request a new password reset.' });
    } else {
      setTokenValid(true);
    }
  }, [token]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
        break;
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name as keyof ValidationErrors] = error;
      } else {
        delete newErrors[name as keyof ValidationErrors];
      }
      delete newErrors.general;
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate all fields
    const newErrors: ValidationErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key as keyof ValidationErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        setResetSuccess(true);
        toast.success('Password reset successfully! You can now log in with your new password.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setErrors({ general: data.message || 'Failed to reset password. Please try again.' });
        toast.error(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      setErrors({ general: 'Network error. Please try again.' });
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldStatus = (fieldName: string) => {
    const hasError = errors[fieldName as keyof ValidationErrors];
    const hasValue = formData[fieldName as keyof FormData];
    
    if (hasError) return 'error';
    if (hasValue && !hasError) return 'success';
    return 'default';
  };

  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg sm:px-10">
            <div className="text-center">
              <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h2>
              <p className="text-gray-600 mb-6">
                This password reset link is invalid or has expired. Please request a new password reset.
              </p>
              <Link
                to="/forgot-password"
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Request New Reset
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg sm:px-10">
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your password has been reset successfully. You will be redirected to the login page shortly.
              </p>
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
          <p className="text-gray-600 text-sm">
            Enter your new password below to complete the reset process.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-sm py-8 px-6 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Global Error */}
            {errors.general && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-4 pr-20 py-3 border rounded-xl focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                    getFieldStatus('password') === 'error' ? 'border-red-300 focus:ring-2 focus:ring-red-500' : 
                    getFieldStatus('password') === 'success' ? 'border-green-300 focus:ring-2 focus:ring-green-500' : 
                    'border-gray-200 focus:ring-2 focus:ring-purple-500'
                  }`}
                  placeholder="Enter your new password"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                  <div className="pr-3">
                    {getFieldStatus('password') === 'success' && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
                    {getFieldStatus('password') === 'error' && <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
                  </div>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <ExclamationCircleIcon className="h-4 w-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-4 pr-20 py-3 border rounded-xl focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                    getFieldStatus('confirmPassword') === 'error' ? 'border-red-300 focus:ring-2 focus:ring-red-500' : 
                    getFieldStatus('confirmPassword') === 'success' ? 'border-green-300 focus:ring-2 focus:ring-green-500' : 
                    'border-gray-200 focus:ring-2 focus:ring-purple-500'
                  }`}
                  placeholder="Confirm your new password"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                  <div className="pr-3">
                    {getFieldStatus('confirmPassword') === 'success' && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
                    {getFieldStatus('confirmPassword') === 'error' && <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
                  </div>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <ExclamationCircleIcon className="h-4 w-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || Object.keys(errors).length > 0 || !formData.password || !formData.confirmPassword}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </form>

          {/* Back to Login Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600">Remember your password? </span>
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Back to Login
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

export default ResetPassword;