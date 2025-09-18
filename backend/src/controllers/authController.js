const User = require('../models/User');
const { generateToken, generatePasswordResetToken, verifyToken } = require('../utils/generateToken');
const { validationResult } = require('express-validator');
const { MESSAGES } = require('../constants/messages');
const emailService = require('../services/emailService');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.VALIDATION_ERROR,
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password, role, studentId, college, course, year, specialization, qualification, experience, licenseNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.USER_ALREADY_EXISTS
      });
    }

    // Check if studentId already exists (for students)
    if (role === 'student' && studentId) {
      const existingStudent = await User.findOne({ studentId });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Student ID already exists'
        });
      }
    }

    // Check if licenseNumber already exists (for counselors)
    if (role === 'counselor' && licenseNumber) {
      const existingCounselor = await User.findOne({ licenseNumber });
      if (existingCounselor) {
        return res.status(400).json({
          success: false,
          message: 'License number already exists'
        });
      }
    }

    // Create user object
    const userData = {
      firstName,
      lastName,
      email,
      password,
      role: role || 'student'
    };

    // Add role-specific fields
    if (role === 'student') {
      if (studentId) userData.studentId = studentId;
      if (college) userData.college = college;
      if (course) userData.course = course;
      if (year) userData.year = year;
    } else if (role === 'counselor') {
      if (specialization) userData.specialization = specialization;
      if (qualification) userData.qualification = qualification;
      if (experience) userData.experience = experience;
      if (licenseNumber) userData.licenseNumber = licenseNumber;
    }

    // Create user
    const user = await User.create(userData);

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: MESSAGES.REGISTRATION_SUCCESS,
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.VALIDATION_ERROR,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Check if user exists and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.INVALID_CREDENTIALS
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.ACCOUNT_DEACTIVATED
      });
    }

    // Validate password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.INVALID_CREDENTIALS
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: MESSAGES.LOGIN_SUCCESS,
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    res.json({
      success: true,
      data: {
        user
      }
    });

  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Logout user / clear token
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = async (req, res) => {
  try {
    // In a stateless JWT system, logout is handled client-side by removing the token
    // However, we can implement a token blacklist for enhanced security
    
    res.json({
      success: true,
      message: MESSAGES.LOGOUT_SUCCESS
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Forgot password - send reset email
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.VALIDATION_ERROR,
        errors: errors.array()
      });
    }

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Generate password reset token (expires in 1 hour)
    const resetToken = generatePasswordResetToken(user._id);
    
    // Create reset URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;
    
    // Send password reset email
    const emailSent = await emailService.sendPasswordResetEmail(
      user.email,
      user.fullName,
      resetUrl
    );

    // Always return success to prevent email enumeration attacks
    // But log the reset URL as fallback when email fails
    if (!emailSent) {
      console.log(`\n🔗 PASSWORD RESET FALLBACK for ${user.email}:`);
      console.log(`   ${resetUrl}`);
      console.log(`   This link expires in 1 hour\n`);
    }
    
    res.json({
      success: true,
      message: 'Password reset instructions sent to your email'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Reset password
 * @route   PUT /api/auth/reset-password/:token
 * @access  Public
 */
const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.VALIDATION_ERROR,
        errors: errors.array()
      });
    }

    const { token } = req.params;
    const { password } = req.body;

    // Verify the password reset token
    let decoded;
    try {
      decoded = verifyToken(token, 'password-reset');
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_RESET_TOKEN
      });
    }

    // Find the user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.ACCOUNT_DEACTIVATED
      });
    }

    // Update password
    user.password = password;
    await user.save();

    // Generate new token for immediate login
    const loginToken = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      success: true,
      message: MESSAGES.PASSWORD_RESET_SUCCESS,
      data: {
        user: userResponse,
        token: loginToken
      }
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
  resetPassword
};