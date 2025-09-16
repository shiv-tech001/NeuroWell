const { body, param, query } = require('express-validator');

/**
 * User registration validation rules
 */
const registerValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 100 })
    .withMessage('Email cannot exceed 100 characters'),
  
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, lowercase letter, number, and special character'),
  
  body('role')
    .optional()
    .isIn(['student', 'counselor'])
    .withMessage('Role must be either student or counselor')
];

/**
 * User login validation rules
 */
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1, max: 128 })
    .withMessage('Password length is invalid')
];

/**
 * Profile update validation rules
 */
const updateProfileValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('phone')
    .optional()
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Please provide a valid phone number')
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 digits'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Date of birth must be a valid date (YYYY-MM-DD format)')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (birthDate >= today) {
        throw new Error('Date of birth must be in the past');
      }
      
      if (age < 13) {
        throw new Error('Must be at least 13 years old');
      }
      
      if (age > 120) {
        throw new Error('Invalid date of birth');
      }
      
      return true;
    }),
  
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other', 'prefer-not-to-say'])
    .withMessage('Invalid gender option')
];

/**
 * Password change validation rules
 */
const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 8, max: 128 })
    .withMessage('New password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, lowercase letter, number, and special character'),
  
  body('confirmNewPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match new password');
      }
      return true;
    })
];

/**
 * Email validation
 */
const emailValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

/**
 * MongoDB ObjectId validation
 */
const objectIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format')
];

/**
 * Pagination validation
 */
const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sort')
    .optional()
    .isIn(['createdAt', '-createdAt', 'name', '-name', 'email', '-email'])
    .withMessage('Invalid sort option')
];

/**
 * Student-specific validation rules
 */
const studentValidation = [
  body('studentId')
    .optional()
    .isLength({ min: 5, max: 20 })
    .withMessage('Student ID must be between 5 and 20 characters')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Student ID can only contain letters and numbers'),
  
  body('college')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('College name must be between 2 and 100 characters'),
  
  body('course')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Course name must be between 2 and 100 characters'),
  
  body('year')
    .optional()
    .isInt({ min: 1, max: 6 })
    .withMessage('Year must be between 1 and 6')
];

/**
 * Counselor-specific validation rules
 */
const counselorValidation = [
  body('specialization')
    .optional()
    .isArray({ min: 1, max: 5 })
    .withMessage('Specialization must be an array with 1-5 items'),
  
  body('specialization.*')
    .isIn(['anxiety', 'depression', 'stress', 'relationships', 'academic', 'career', 'substance-abuse', 'trauma'])
    .withMessage('Invalid specialization'),
  
  body('qualification')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Qualification must be between 10 and 200 characters'),
  
  body('experience')
    .optional()
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  
  body('licenseNumber')
    .optional()
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('License number must be between 5 and 50 characters')
    .matches(/^[a-zA-Z0-9\-\/]+$/)
    .withMessage('License number contains invalid characters')
];

/**
 * File upload validation
 */
const fileValidation = {
  image: {
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    maxSize: 5 * 1024 * 1024, // 5MB
    validate: (file) => {
      if (!file) {
        throw new Error('No file uploaded');
      }
      
      if (!fileValidation.image.allowedTypes.includes(file.mimetype)) {
        throw new Error('Invalid file type. Only JPEG, JPG, PNG, and WebP are allowed');
      }
      
      if (file.size > fileValidation.image.maxSize) {
        throw new Error('File size too large. Maximum size is 5MB');
      }
      
      return true;
    }
  }
};

/**
 * Search and filter validation
 */
const searchValidation = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search term must be between 1 and 100 characters')
    .escape(),
  
  query('category')
    .optional()
    .isIn(['anxiety', 'depression', 'stress', 'relationships', 'academic', 'career', 'substance-abuse', 'trauma', 'general'])
    .withMessage('Invalid category'),
  
  query('status')
    .optional()
    .isIn(['active', 'inactive', 'pending', 'verified'])
    .withMessage('Invalid status')
];

/**
 * Date range validation
 */
const dateRangeValidation = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date (YYYY-MM-DD format)'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date (YYYY-MM-DD format)')
    .custom((value, { req }) => {
      if (req.query.startDate && value < req.query.startDate) {
        throw new Error('End date must be after start date');
      }
      return true;
    })
];

/**
 * Common validation helper functions
 */
const validationHelpers = {
  /**
   * Sanitize string input
   */
  sanitizeString: (str) => {
    if (typeof str !== 'string') return str;
    return str.trim().replace(/\s+/g, ' ');
  },
  
  /**
   * Validate phone number format
   */
  isValidPhoneNumber: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },
  
  /**
   * Check password strength
   */
  checkPasswordStrength: (password) => {
    const strength = {
      score: 0,
      feedback: []
    };
    
    if (password.length >= 8) strength.score++;
    else strength.feedback.push('Use at least 8 characters');
    
    if (/[a-z]/.test(password)) strength.score++;
    else strength.feedback.push('Include lowercase letters');
    
    if (/[A-Z]/.test(password)) strength.score++;
    else strength.feedback.push('Include uppercase letters');
    
    if (/\d/.test(password)) strength.score++;
    else strength.feedback.push('Include numbers');
    
    if (/[@$!%*?&]/.test(password)) strength.score++;
    else strength.feedback.push('Include special characters');
    
    return strength;
  }
};

module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  emailValidation,
  objectIdValidation,
  paginationValidation,
  studentValidation,
  counselorValidation,
  fileValidation,
  searchValidation,
  dateRangeValidation,
  validationHelpers
};