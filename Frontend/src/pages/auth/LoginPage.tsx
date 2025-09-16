import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Lock, Mail, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter, FaUserGraduate, FaUserTie } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", role: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setFormVisible(true), 300);
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      case "role":
        if (!value) return "Please select a role";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        email: formData.email,
        role: formData.role,
        id: `user-${Date.now()}`,
        name: formData.email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
      };

      // Update auth state using the login function from AuthContext
      login(user);
      
      // Redirect based on role
      switch(user.role) {
        case 'student':
          navigate('/student/dashboard', { replace: true });
          break;
        case 'counselor':
          navigate('/counselor/dashboard', { replace: true });
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: "Failed to login. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    try {
      if (!formData.role) {
        setErrors({ role: "Please select a role before signing in with a social provider" });
        return;
      }
      
      const user = {
        email: `${provider}_user@example.com`,
        role: formData.role,
        id: `user-${Date.now()}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        name: provider.charAt(0).toUpperCase() + provider.slice(1) + ' User'
      };
      
      // Update auth state using the login function from AuthContext
      login(user);
      
      // Redirect based on role
      switch(user.role) {
        case 'student':
          navigate('/student/dashboard', { replace: true });
          break;
        case 'counselor':
          navigate('/counselor/dashboard', { replace: true });
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Social login error:', error);
      setErrors({ general: `Failed to login with ${provider}. Please try again.` });
    }
  };

  const getRoleIcon = (role) => (role === "student" ? <FaUserGraduate className="w-5 h-5" /> : <FaUserTie className="w-5 h-5" />);
  const getRoleColor = (role) => (formData.role === role ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-white border-gray-300 text-gray-700");
  const getFieldStatus = (field) => {
    if (!formData[field]) return "";
    return errors[field] ? "border-red-500" : "border-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className={`sm:mx-auto sm:w-full sm:max-w-md transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center text-3xl font-extrabold text-gray-900">
          Welcome Back
        </motion.h2>
        <p className="mt-2 text-center text-sm text-gray-600">Sign in to continue your journey</p>
      </div>

      <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        <div className="bg-white py-8 px-4 shadow-lg rounded-xl sm:px-10 backdrop-blur-sm bg-opacity-90 border border-gray-100">
          {errors.general && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className={`space-y-6 transition-all duration-700 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
                <Mail className="w-4 h-4 mr-1" /> Email address
              </label>
              <div className="mt-1 relative">
                <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} className={`appearance-none block w-full px-3 py-2 border ${getFieldStatus("email")} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200`} placeholder="you@example.com" />
                {formData.email && !errors.email && <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500">✓</span>}
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center">
                <Lock className="w-4 h-4 mr-1" /> Password
              </label>
              <div className="mt-1 relative">
                <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={formData.password} onChange={handleChange} className={`appearance-none block w-full px-3 py-2 border ${getFieldStatus("password")} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <User className="w-4 h-4 mr-1" /> Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["student", "counselor"].map((role) => (
                  <button key={role} type="button" onClick={() => setFormData((prev) => ({ ...prev, role }))} className={`flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium hover:bg-gray-50 transition-all duration-200 ${getRoleColor(role)}`}>
                    {getRoleIcon(role)}
                    <span className="ml-2 capitalize">{role}</span>
                  </button>
                ))}
              </div>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    {formData.role && getRoleIcon(formData.role)}
                    <span className="ml-2">Sign in {formData.role && `as ${formData.role}`}</span>
                  </span>
                )}
              </button>
            </motion.div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button onClick={() => handleSocialLogin("google")} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                <FcGoogle className="w-5 h-5" />
              </button>
              <button onClick={() => handleSocialLogin("facebook")} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                <FaFacebook className="w-5 h-5" />
              </button>
              <button onClick={() => handleSocialLogin("twitter")} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-sky-500 hover:bg-gray-50 transition-colors duration-200">
                <FaTwitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account? {" "}
            <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
