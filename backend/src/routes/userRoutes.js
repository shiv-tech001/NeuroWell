const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  changePassword,
  deactivateAccount,
  getCounselors
} = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { ROLES } = require('../constants/roles');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + req.user.id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only image files'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Validation rules
const updateProfileValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^\d{10}$/)
    .withMessage('Please provide a valid 10-digit phone number'),
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Date of birth must be a valid date')
    .custom((value) => {
      if (new Date(value) >= new Date()) {
        throw new Error('Date of birth must be in the past');
      }
      return true;
    }),
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other', 'prefer-not-to-say'])
    .withMessage('Invalid gender option'),
  
  // Student-specific validations
  body('studentId')
    .optional()
    .isLength({ min: 5, max: 20 })
    .withMessage('Student ID must be between 5 and 20 characters'),
  body('college')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('College name cannot exceed 100 characters'),
  body('course')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Course name cannot exceed 100 characters'),
  body('year')
    .optional()
    .isInt({ min: 1, max: 6 })
    .withMessage('Year must be between 1 and 6'),
  
  // Counselor-specific validations
  body('specialization')
    .optional()
    .isArray()
    .withMessage('Specialization must be an array'),
  body('specialization.*')
    .optional()
    .isIn(['anxiety', 'depression', 'stress', 'relationships', 'academic', 'career', 'substance-abuse', 'trauma'])
    .withMessage('Invalid specialization'),
  body('qualification')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Qualification cannot exceed 200 characters'),
  body('experience')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Experience must be a non-negative number'),
  body('licenseNumber')
    .optional()
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('License number must be between 5 and 50 characters'),
  
  // Preferences validation
  body('preferences.notifications.email')
    .optional()
    .isBoolean()
    .withMessage('Email notification preference must be boolean'),
  body('preferences.notifications.sms')
    .optional()
    .isBoolean()
    .withMessage('SMS notification preference must be boolean'),
  body('preferences.notifications.push')
    .optional()
    .isBoolean()
    .withMessage('Push notification preference must be boolean'),
  body('preferences.privacy.profileVisibility')
    .optional()
    .isIn(['public', 'private', 'counselors-only'])
    .withMessage('Invalid profile visibility option')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('confirmNewPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match new password');
      }
      return true;
    })
];

// Routes

// Profile management
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfileValidation, updateProfile);

// Avatar management
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);
router.delete('/avatar', protect, deleteAvatar);

// Password management
router.put('/change-password', protect, changePasswordValidation, changePassword);

// Account management
router.put('/deactivate', protect, deactivateAccount);

// Browse counselors (students only)
router.get('/counselors', protect, authorize(ROLES.STUDENT), getCounselors);

module.exports = router;