const Student = require('../models/Student');
const Counselor = require('../models/Counselor');
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

    // Determine which model to use based on role
    const Model = role === 'counselor' ? Counselor : Student;
    const otherModel = role === 'counselor' ? Student : Counselor;

    // Check if user already exists in either table
    const existingUser = await Model.findOne({ email });
    const existingInOtherTable = await otherModel.findOne({ email });
    
    if (existingUser || existingInOtherTable) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.USER_ALREADY_EXISTS
      });
    }

    // Role-specific validation and checks
    if (role === 'student') {
      // Check if studentId already exists
      if (studentId) {
        const existingStudent = await Student.findOne({ studentId });
        if (existingStudent) {
          return res.status(400).json({
            success: false,
            message: 'Student ID already exists'
          });
        }
      }

      // Create student object with required fields
      const studentData = {
        firstName,
        lastName,
        email,
        password,
        role: 'student'
      };

      // Add student-specific required fields
      if (studentId) studentData.studentId = studentId;
      if (college) studentData.college = college;
      if (course) studentData.course = course;
      if (year) studentData.year = year;

      // Create student
      const user = await Student.create(studentData);
      
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

    } else if (role === 'counselor') {
      // Check if licenseNumber already exists
      if (licenseNumber) {
        const existingCounselor = await Counselor.findOne({ licenseNumber });
        if (existingCounselor) {
          return res.status(400).json({
            success: false,
            message: 'License number already exists'
          });
        }
      }

      // Create counselor object with required fields
      const counselorData = {
        firstName,
        lastName,
        email,
        password,
        role: 'counselor'
      };

      // Add counselor-specific fields
      if (specialization) counselorData.specialization = specialization;
      if (qualification) counselorData.qualification = qualification;
      if (experience !== undefined) counselorData.experience = experience;
      if (licenseNumber) counselorData.licenseNumber = licenseNumber;

      // Create counselor
      const user = await Counselor.create(counselorData);
      
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
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified'
      });
    }

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

    // Try to find user in both Student and Counselor collections
    let user = await Student.findOne({ email }).select('+password');
    let userRole = 'student';
    
    if (!user) {
      user = await Counselor.findOne({ email }).select('+password');
      userRole = 'counselor';
    }
    
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

    // Generate token with user ID and role
    const token = generateToken(user._id, userRole);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    // Ensure role is set correctly in response
    userResponse.role = userRole;

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
    let user;
    
    // Try to find user in Student collection first
    user = await Student.findById(req.user.id);
    
    if (!user) {
      // If not found in Student, try Counselor collection
      user = await Counselor.findById(req.user.id);
    }
    
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

    // Try to find user in both Student and Counselor collections
    let user = await Student.findOne({ email });
    let userType = 'student';
    
    if (!user) {
      user = await Counselor.findOne({ email });
      userType = 'counselor';
    }
    
    if (!user) {
      // For security, don't reveal if email exists or not
      return res.json({
        success: true,
        message: 'If an account with that email exists, password reset instructions have been sent.'
      });
    }

    // Generate password reset token
    const resetToken = generatePasswordResetToken(user._id);
    
    // Save reset token and expiry to user (add fields to both models)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save({ validateBeforeSave: false });

    // Send password reset email
    try {
      console.log(`📧 Attempting to send password reset email to: ${user.email}`);
      console.log(`🔑 Generated reset token: ${resetToken.substring(0, 20)}...`);
      
      // Generate the reset URL for logging
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      console.log(`🔗 Password Reset URL: ${resetUrl}`);
      console.log(`👆 Copy this URL and paste in browser to reset password for: ${user.email}`);
      
      await emailService.sendPasswordResetEmail(user, resetToken);
      
      console.log(`✅ Password reset email sent successfully to: ${email}`);
      
      res.json({
        success: true,
        message: 'Password reset instructions have been sent to your email'
      });
    } catch (emailError) {
      console.error('❌ Failed to send password reset email:', emailError.message);
      console.error('Full error:', emailError);
      
      // Generate the reset URL for logging even if email fails
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      console.log(`🚨 EMAIL FAILED - But you can still reset password using this URL:`);
      console.log(`🔗 ${resetUrl}`);
      console.log(`👆 Copy this URL and paste in browser to reset password for: ${user.email}`);
      
      // Don't remove the reset token if email failed - user can still use the URL
      // user.resetPasswordToken = undefined;
      // user.resetPasswordExpires = undefined;
      // await user.save({ validateBeforeSave: false });
      
      // Return success anyway since user can use the logged URL
      res.json({
        success: true,
        message: 'Password reset instructions have been generated. Check server console for reset link.'
      });
    }

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
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Verify the reset token
    let decoded;
    try {
      decoded = verifyToken(token, 'password-reset');
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Find user in both collections
    let user = await Student.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });
    
    if (!user) {
      user = await Counselor.findOne({
        _id: decoded.id,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() }
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.'
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