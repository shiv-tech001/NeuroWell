import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogoIcon } from '@components/icons';
import { useAuth } from '../../contexts/AuthContext';
import { 
  AcademicCapIcon,
  UserIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const RegisterPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student' as 'student' | 'counselor', // Added role field
        agreeToTerms: false
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        // Redirect if already authenticated
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/student/dashboard';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    // Handle role selection
    const handleRoleChange = (role: 'student' | 'counselor') => {
        setFormData(prev => ({
            ...prev,
            role: role
        }));
        // Clear error when user changes role
        if (error) setError('');
    };

    const validateStep1 = () => {
        if (!formData.fullName.trim()) {
            setError('Please enter your full name');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Please enter your email address');
            return false;
        }
        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!formData.password) {
            setError('Please enter a password');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (!formData.agreeToTerms) {
            setError('Please agree to the Terms and Conditions');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Validate form data
            if (!formData.agreeToTerms) {
                setError('You must agree to the terms and conditions');
                setIsLoading(false);
                return;
            }

            // Simulate API call - Replace with actual registration logic
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Create user object with selected role
            const user = {
                id: `user-${Date.now()}`,
                name: formData.fullName,
                email: formData.email,
                role: formData.role, // Use selected role
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=random`
            };

            // Call login from AuthContext (in a real app, you'd register first then login)
            login(user);

            // Redirect based on selected role
            const redirectPath = `/${formData.role}/dashboard`;
            navigate(redirectPath, { replace: true });
            
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return '';
        if (password.length < 4) return 'Weak';
        if (password.length < 8) return 'Medium';
        return 'Strong';
    };

    const getPasswordStrengthColor = (password: string) => {
        const strength = getPasswordStrength(password);
        switch (strength) {
            case 'Weak': return 'bg-red-400';
            case 'Medium': return 'bg-yellow-400';
            case 'Strong': return 'bg-green-400';
            default: return 'bg-gray-300';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {/* Progress Indicator */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-purple-600 font-medium">Step 1 of 3</span>
                                <span className="text-sm text-gray-500">Personal Info</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: '33%' }}></div>
                            </div>
                        </div>

                        {/* Form Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h1>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Role Selection */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    I am registering as a
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Student Option */}
                                    <div
                                        onClick={() => handleRoleChange('student')}
                                        className={`
                                            relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                                            ${formData.role === 'student' 
                                                ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                                                : 'border-gray-200 bg-white/50 hover:border-blue-300'
                                            }
                                        `}
                                    >
                                        <div className="flex flex-col items-center text-center space-y-2">
                                            <div className={`p-3 rounded-lg bg-gradient-to-r ${formData.role === 'student' ? 'from-blue-500 to-cyan-500' : 'from-gray-400 to-gray-500'}`}>
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

                                    {/* Counselor Option */}
                                    <div
                                        onClick={() => handleRoleChange('counselor')}
                                        className={`
                                            relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                                            ${formData.role === 'counselor' 
                                                ? 'border-purple-500 bg-purple-50/50 shadow-md' 
                                                : 'border-gray-200 bg-white/50 hover:border-purple-300'
                                            }
                                        `}
                                    >
                                        <div className="flex flex-col items-center text-center space-y-2">
                                            <div className={`p-3 rounded-lg bg-gradient-to-r ${formData.role === 'counselor' ? 'from-purple-500 to-pink-500' : 'from-gray-400 to-gray-500'}`}>
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

                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    placeholder="Enter your full name"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Email Address */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    placeholder="you@example.com"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    placeholder="Create a strong password"
                                    disabled={isLoading}
                                    required
                                />
                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex-1 bg-gray-200 rounded-full h-1">
                                                <div 
                                                    className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor(formData.password)}`}
                                                    style={{ 
                                                        width: formData.password.length === 0 ? '0%' : 
                                                               formData.password.length < 4 ? '33%' : 
                                                               formData.password.length < 8 ? '66%' : '100%' 
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-500">{getPasswordStrength(formData.password)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    placeholder="Confirm your password"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start space-x-3">
                                <input
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    type="checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 mt-1 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    disabled={isLoading}
                                />
                                <label htmlFor="agreeToTerms" className="text-sm text-gray-700 leading-relaxed">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                                        Terms and Conditions
                                    </Link>
                                </label>
                            </div>

                            {/* Next Step Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`
                                    w-full font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center
                                    ${formData.role === 'student' 
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white' 
                                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                                    }
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                `}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        {formData.role === 'student' ? (
                                            <AcademicCapIcon className="w-5 h-5" />
                                        ) : (
                                            <UserIcon className="w-5 h-5" />
                                        )}
                                        <span>Register as {formData.role === 'student' ? 'Student' : 'Counselor'}</span>
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-700 transition">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
