import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon } from '@components/icons';
import { useAuth } from '../../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
  UserIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

interface FormData {
  email: string;
  password: string;
  role: 'student' | 'counselor';
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    role: 'student',
    rememberMe: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isTyping, setIsTyping] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loginInProgress, setLoginInProgress] = useState(false);
  
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();

  // Animation states
  const [mounted, setMounted] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setFormVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated && user && !loginInProgress) {
      const redirectPath = `/${user.role}/dashboard`;
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, user, loginInProgress]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        break;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        break;
    }
    return undefined;
  };

  // Helper function to check if there are actual error messages
  const hasValidationErrors = () => {
    return Object.values(errors).some(error => error && error.trim() !== '');
  };

  // Helper function to check if required fields are filled
  const hasRequiredFields = () => {
    return formData.email.trim() !== '' && formData.password.trim() !== '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Real-time validation - only set error if there is one, otherwise remove the key
    if (name !== 'rememberMe' && name !== 'role') {
      const error = validateField(name, value);
      setErrors(prev => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[name as keyof ValidationErrors] = error;
        } else {
          delete newErrors[name as keyof ValidationErrors]; // Remove the key entirely if no error
        }
        delete newErrors.general; // Clear general errors when user types
        return newErrors;
      });
    }

    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate all fields
    const newErrors: ValidationErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'rememberMe' && key !== 'role') {
        const error = validateField(key, value as string);
        if (error) newErrors[key as keyof ValidationErrors] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      setLoginInProgress(true);
      
      // Use the real authentication service
      await login(formData.email, formData.password);

      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      // Show success toast notification
      const roleDisplay = formData.role === 'student' ? 'Student' : 'Counselor';
      toast.success(`Successfully logged in! Welcome back! 🎉`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Navigation will be handled by the AuthContext useEffect
      
    } catch (err: any) {
      setErrors({ general: err.message || 'Invalid credentials. Please check your email and password.' });
      setLoginInProgress(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'microsoft') => {
    // Social login is not implemented with real backend yet
    toast.info(`Social login with ${provider} will be available soon!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return <AcademicCapIcon className="w-5 h-5 text-blue-600" />;
      case 'counselor': return <UserIcon className="w-5 h-5 text-purple-600" />;
      default: return <AcademicCapIcon className="w-5 h-5 text-blue-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'from-blue-500 to-cyan-500';
      case 'counselor': return 'from-purple-500 to-pink-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const getFieldStatus = (fieldName: string) => {
    const hasError = errors[fieldName as keyof ValidationErrors];
    const hasValue = formData[fieldName as keyof FormData];
    const isFocused = focusedField === fieldName;
    
    if (hasError) return 'error';
    if (hasValue && !hasError && fieldName !== 'rememberMe' && fieldName !== 'role') return 'success';
    if (isFocused) return 'focused';
    return 'default';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div className="w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
        <div className="w-96 h-96 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className={`sm:mx-auto sm:w-full sm:max-w-md transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to NeuroWell</h2>
          <p className="text-gray-600 text-sm">
            Connecting students and counselors for better mental health support
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="font-semibold text-purple-600 hover:text-purple-500 transition-colors duration-200 hover:underline"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>

      <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md transition-all duration-700 delay-200 ${formVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="bg-white/80 backdrop-blur-sm py-8 px-6 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Global Error */}
            {errors.general && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md animate-shake">
                <div className="flex">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Role Selection with Enhanced Design */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                  className={`
                    relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                    ${formData.role === 'student' 
                      ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                      : 'border-gray-200 bg-white/50 hover:border-blue-300'
                    }
                  `}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${formData.role === 'student' ? 'from-blue-500 to-cyan-500' : 'from-gray-400 to-gray-500'}`}>
                      <AcademicCapIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${formData.role === 'student' ? 'text-blue-700' : 'text-gray-600'}`}>
                      Student
                    </span>
                    <span className="text-xs text-gray-500">Seeking support & guidance</span>
                  </div>
                  {formData.role === 'student' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                    </div>
                  )}
                </div>

                <div
                  onClick={() => setFormData(prev => ({ ...prev, role: 'counselor' }))}
                  className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                    ${formData.role === 'counselor' 
                      ? 'border-purple-500 bg-purple-50/50 shadow-md' 
                      : 'border-gray-200 bg-white/50 hover:border-purple-300'
                    }
                  `}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${formData.role === 'counselor' ? 'from-purple-500 to-pink-500' : 'from-gray-400 to-gray-500'}`}>
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${formData.role === 'counselor' ? 'text-purple-700' : 'text-gray-600'}`}>
                      Counselor
                    </span>
                    <span className="text-xs text-gray-500">Providing professional help</span>
                  </div>
                  {formData.role === 'counselor' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircleIcon className="w-5 h-5 text-purple-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`
                    w-full pl-4 pr-10 py-3 border rounded-xl focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm
                    ${getFieldStatus('email') === 'error' ? 'border-red-300 focus:ring-2 focus:ring-red-500' : ''}
                    ${getFieldStatus('email') === 'success' ? 'border-green-300 focus:ring-2 focus:ring-green-500' : ''}
                    ${getFieldStatus('email') === 'focused' ? 'border-purple-300 focus:ring-2 focus:ring-purple-500' : ''}
                    ${getFieldStatus('email') === 'default' ? 'border-gray-200 focus:ring-2 focus:ring-purple-500' : ''}
                  `}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {getFieldStatus('email') === 'success' && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                  {getFieldStatus('email') === 'error' && (
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <ExclamationCircleIcon className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`
                    w-full pl-4 pr-20 py-3 border rounded-xl focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm
                    ${getFieldStatus('password') === 'error' ? 'border-red-300 focus:ring-2 focus:ring-red-500' : ''}
                    ${getFieldStatus('password') === 'success' ? 'border-green-300 focus:ring-2 focus:ring-green-500' : ''}
                    ${getFieldStatus('password') === 'focused' ? 'border-purple-300 focus:ring-2 focus:ring-purple-500' : ''}
                    ${getFieldStatus('password') === 'default' ? 'border-gray-200 focus:ring-2 focus:ring-purple-500' : ''}
                  `}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div className="pr-3">
                    {getFieldStatus('password') === 'success' && (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    )}
                    {getFieldStatus('password') === 'error' && (
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    )}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-colors duration-200"
                  disabled={isLoading}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 font-medium">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-purple-600 hover:text-purple-500 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button - FIXED DISABLED LOGIC */}
            <div>
              <button
                type="submit"
                disabled={isLoading || hasValidationErrors() || !hasRequiredFields()}
                className={`
                  group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white 
                  bg-gradient-to-r ${getRoleColor(formData.role)} 
                  hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 
                  transform hover:-translate-y-0.5 shadow-lg
                `}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {getRoleIcon(formData.role)}
                    <span>Sign in as {formData.role === 'student' ? 'Student' : 'Counselor'}</span>
                    <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Rest of the component remains the same... */}
          {/* Social login buttons, divider, loading indicator, etc. */}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;