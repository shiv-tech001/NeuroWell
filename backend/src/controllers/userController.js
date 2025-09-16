const User = require('../models/User');
const { validationResult } = require('express-validator');
const { MESSAGES } = require('../constants/messages');
const { uploadImage, deleteImage } = require('../config/cloudinary');

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
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
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = async (req, res) => {
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

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Extract updatable fields from request body
    const allowedUpdates = [
      'firstName', 'lastName', 'phone', 'dateOfBirth', 'gender',
      'college', 'course', 'year', 'specialization', 'qualification', 
      'experience', 'preferences'
    ];

    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Check if studentId is being updated and if it's unique
    if (req.body.studentId && req.body.studentId !== user.studentId) {
      const existingStudent = await User.findOne({ 
        studentId: req.body.studentId, 
        _id: { $ne: user._id } 
      });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Student ID already exists'
        });
      }
      updates.studentId = req.body.studentId;
    }

    // Check if licenseNumber is being updated and if it's unique
    if (req.body.licenseNumber && req.body.licenseNumber !== user.licenseNumber) {
      const existingCounselor = await User.findOne({ 
        licenseNumber: req.body.licenseNumber, 
        _id: { $ne: user._id } 
      });
      if (existingCounselor) {
        return res.status(400).json({
          success: false,
          message: 'License number already exists'
        });
      }
      updates.licenseNumber = req.body.licenseNumber;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      updates, 
      { 
        new: true, 
        runValidators: true 
      }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: updatedUser
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Upload user avatar
 * @route   POST /api/users/avatar
 * @access  Private
 */
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Delete old avatar if exists
    if (user.avatar && user.avatar.public_id) {
      try {
        await deleteImage(user.avatar.public_id);
      } catch (deleteError) {
        console.error('Error deleting old avatar:', deleteError);
        // Continue with upload even if deletion fails
      }
    }

    // Upload new avatar
    const uploadResult = await uploadImage(req.file.path, 'avatars');

    // Update user with new avatar
    user.avatar = {
      public_id: uploadResult.public_id,
      url: uploadResult.url
    };

    await user.save();

    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Delete user avatar
 * @route   DELETE /api/users/avatar
 * @access  Private
 */
const deleteAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    if (!user.avatar || !user.avatar.public_id) {
      return res.status(400).json({
        success: false,
        message: 'No avatar found to delete'
      });
    }

    // Delete avatar from Cloudinary
    await deleteImage(user.avatar.public_id);

    // Remove avatar from user
    user.avatar = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Avatar deleted successfully'
    });

  } catch (error) {
    console.error('Delete avatar error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Change user password
 * @route   PUT /api/users/change-password
 * @access  Private
 */
const changePassword = async (req, res) => {
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

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.matchPassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Deactivate user account
 * @route   PUT /api/users/deactivate
 * @access  Private
 */
const deactivateAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND
      });
    }

    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: 'Account deactivated successfully'
    });

  } catch (error) {
    console.error('Deactivate account error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get all counselors (for students to browse)
 * @route   GET /api/users/counselors
 * @access  Private (Students only)
 */
const getCounselors = async (req, res) => {
  try {
    const { specialization, page = 1, limit = 10 } = req.query;

    const query = { 
      role: 'counselor', 
      isActive: true,
      isEmailVerified: true 
    };

    // Filter by specialization if provided
    if (specialization) {
      query.specialization = { $in: [specialization] };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      select: 'firstName lastName email avatar specialization qualification experience',
      sort: { createdAt: -1 }
    };

    const counselors = await User.paginate(query, options);

    res.json({
      success: true,
      data: counselors
    });

  } catch (error) {
    console.error('Get counselors error:', error);
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  changePassword,
  deactivateAccount,
  getCounselors
};