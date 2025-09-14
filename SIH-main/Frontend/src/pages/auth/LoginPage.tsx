import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogoIcon } from '@components/icons';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Basic validation
            if (!formData.email || !formData.password) {
                setError('Please enter both email and password');
                setIsLoading(false);
                return;
            }

            // Simulate API call - Replace with actual authentication logic
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // In a real app, you'd validate credentials with your backend
            // For demo, we'll create a mock user
            const mockUser = {
                id: '123',
                name: formData.email.split('@')[0],
                email: formData.email,
                role: 'student'
            };

            // Call login from AuthContext
            login(mockUser);

            // Store remember me preference
            if (formData.rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberMe');
            }

            // Redirect to the intended page or dashboard
            const from = location.state?.from?.pathname || '/student/dashboard';
            navigate(from, { replace: true });
            
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: string) => {
        try {
            setIsLoading(true);
            setError('');
            
            // Simulate social login API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mock user data from social login
            const mockUser = {
                id: `social-${Date.now()}`,
                name: `User-${Math.floor(Math.random() * 1000)}`,
                email: `user-${Math.floor(Math.random() * 1000)}@${provider}.com`,
                role: 'student',
                avatar: `https://ui-avatars.com/api/?name=User&background=random`
            };

            // Call login from AuthContext
            login(mockUser);

            // Redirect to the intended page or dashboard
            const from = location.state?.from?.pathname || '/student/dashboard';
            navigate(from, { replace: true });
        } catch (err) {
            setError(`Failed to login with ${provider}. Please try again.`);
            console.error('Social login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            

            <div className="flex flex-1">
                {/* Left Side - Purple Gradient */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 relative">
                    {/* Main Content */}
                    <div className="flex flex-col items-center justify-center w-full px-12">
                        {/* Logo Circle */}
                        <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-12">
                            <div className="w-20 h-20 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-3xl">M</span>
                            </div>
                        </div>

                        {/* Title and Description */}
                        <h1 className="text-4xl font-bold text-white text-center mb-6">MindfulU</h1>
                        <p className="text-lg text-white text-center opacity-90 max-w-md leading-relaxed">
                            Your safe space for mental wellness.<br />
                            Resources, support, and community, all in<br />
                            one place.
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                    <div className="w-full max-w-md">
                        {/* Welcome Back Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                            <p className="text-gray-600">Please enter your details to sign in.</p>
                        </div>

                        {/* Login Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
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

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                {/* Remember Me and Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            checked={formData.rememberMe}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                            disabled={isLoading}
                                        />
                                        <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-medium transition">
                                        Forgot your password?
                                    </Link>
                                </div>

                                {/* Sign In Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing In...
                                        </>
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>
                            </form>

                            {/* Social Login Options */}
                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => handleSocialLogin('facebook')}
                                        disabled={isLoading}
                                        className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => handleSocialLogin('github')}
                                        disabled={isLoading}
                                        className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 2.078c-5.477 0-9.937 4.492-9.937 9.969 0 4.404 2.863 8.140 6.839 9.458.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.110-1.466-1.110-1.466-.908-.620.069-.608.069-.608 1.003.070 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.350-1.088.636-1.338-2.220-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112.017 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.100 2.651.640.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022.056 12.047c0-5.477-4.452-9.969-9.939-9.969z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <p className="mt-8 text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-medium text-purple-600 hover:text-purple-700 transition">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default LoginPage;
