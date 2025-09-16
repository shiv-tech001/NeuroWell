/**
 * Application messages constants
 * Centralized message definitions for consistent communication
 */

const MESSAGES = {
  // Success Messages
  REGISTRATION_SUCCESS: 'Account created successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  EMAIL_SENT: 'Email sent successfully',
  ACCOUNT_VERIFIED: 'Account verified successfully',
  APPOINTMENT_BOOKED: 'Appointment booked successfully',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully',
  RESOURCE_CREATED: 'Resource created successfully',
  RESOURCE_UPDATED: 'Resource updated successfully',
  RESOURCE_DELETED: 'Resource deleted successfully',

  // Error Messages - Authentication
  INVALID_CREDENTIALS: 'Invalid email or password',
  ACCOUNT_DEACTIVATED: 'Account has been deactivated',
  EMAIL_NOT_VERIFIED: 'Please verify your email address',
  INVALID_TOKEN: 'Invalid or expired token',
  NO_TOKEN: 'Access denied. No token provided',
  TOKEN_EXPIRED: 'Token has expired',
  INSUFFICIENT_PERMISSIONS: 'You do not have permission to access this resource',

  // Error Messages - User Management
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User with this email already exists',
  INVALID_USER_ROLE: 'Invalid user role specified',
  CANNOT_DELETE_SELF: 'You cannot delete your own account',
  CANNOT_CHANGE_OWN_ROLE: 'You cannot change your own role',

  // Error Messages - Validation
  VALIDATION_ERROR: 'Validation failed',
  INVALID_EMAIL: 'Please provide a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters',
  PASSWORD_MISMATCH: 'Passwords do not match',
  INVALID_PHONE: 'Please provide a valid phone number',
  INVALID_DATE: 'Please provide a valid date',
  REQUIRED_FIELD: 'This field is required',
  FIELD_TOO_LONG: 'Field exceeds maximum length',
  FIELD_TOO_SHORT: 'Field does not meet minimum length requirement',

  // Error Messages - File Upload
  FILE_TOO_LARGE: 'File size exceeds maximum limit (5MB)',
  INVALID_FILE_TYPE: 'Invalid file type. Only images are allowed',
  UPLOAD_FAILED: 'File upload failed',
  FILE_NOT_FOUND: 'File not found',

  // Error Messages - Appointments/Sessions
  APPOINTMENT_NOT_FOUND: 'Appointment not found',
  APPOINTMENT_CONFLICT: 'Appointment time conflicts with existing appointment',
  APPOINTMENT_PAST_DUE: 'Cannot book appointment in the past',
  COUNSELOR_UNAVAILABLE: 'Counselor is not available at the selected time',
  CANNOT_CANCEL_APPOINTMENT: 'Cannot cancel appointment less than 24 hours before scheduled time',
  SESSION_NOT_FOUND: 'Session not found',
  SESSION_ALREADY_COMPLETED: 'Session has already been completed',

  // Error Messages - Resources
  RESOURCE_NOT_FOUND: 'Resource not found',
  RESOURCE_ACCESS_DENIED: 'You do not have access to this resource',
  CATEGORY_NOT_FOUND: 'Category not found',

  // Error Messages - Community
  POST_NOT_FOUND: 'Post not found',
  COMMENT_NOT_FOUND: 'Comment not found',
  CANNOT_EDIT_POST: 'You can only edit your own posts',
  CANNOT_DELETE_POST: 'You can only delete your own posts',
  POST_ALREADY_REPORTED: 'This post has already been reported',

  // Error Messages - General
  SERVER_ERROR: 'Internal server error. Please try again later',
  NOT_FOUND: 'Requested resource not found',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later',
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
  DATABASE_ERROR: 'Database connection error',
  NETWORK_ERROR: 'Network connection error',

  // Information Messages
  ACCOUNT_CREATED_VERIFICATION: 'Account created successfully. Please check your email for verification instructions',
  PASSWORD_RESET_SENT: 'Password reset instructions have been sent to your email',
  VERIFICATION_EMAIL_SENT: 'Verification email has been sent',
  REMINDER_SET: 'Reminder has been set',
  NOTIFICATION_SENT: 'Notification sent successfully',
  DATA_EXPORTED: 'Data exported successfully',
  SETTINGS_SAVED: 'Settings saved successfully',

  // Warning Messages
  UNSAVED_CHANGES: 'You have unsaved changes. Are you sure you want to leave?',
  DELETE_CONFIRMATION: 'Are you sure you want to delete this item? This action cannot be undone',
  ACCOUNT_DELETION_WARNING: 'Deleting your account will permanently remove all your data. This action cannot be undone',
  SENSITIVE_DATA_WARNING: 'This section contains sensitive information. Please ensure you have permission to access it',

  // OTP Messages
  OTP_SENT: 'OTP has been sent to your registered email/phone',
  OTP_VERIFIED: 'OTP verified successfully',
  INVALID_OTP: 'Invalid OTP. Please try again',
  OTP_EXPIRED: 'OTP has expired. Please request a new one',
  OTP_ATTEMPTS_EXCEEDED: 'Maximum OTP attempts exceeded. Please request a new OTP',

  // Email Messages
  EMAIL_VERIFICATION_REQUIRED: 'Please verify your email address to continue',
  EMAIL_ALREADY_VERIFIED: 'Email address is already verified',
  EMAIL_VERIFICATION_SUCCESS: 'Email verified successfully',
  EMAIL_VERIFICATION_FAILED: 'Email verification failed or link has expired',

  // Session/Authentication Messages
  SESSION_EXPIRED: 'Your session has expired. Please log in again',
  CONCURRENT_LOGIN_DETECTED: 'Your account is being used elsewhere. Please log in again',
  ACCOUNT_LOCKED: 'Account has been temporarily locked due to multiple failed login attempts',
  ACCOUNT_UNLOCKED: 'Account has been unlocked successfully',

  // Feature-specific Messages
  COUNSELOR_APPLICATION_SUBMITTED: 'Your counselor application has been submitted and is under review',
  COUNSELOR_APPLICATION_APPROVED: 'Your counselor application has been approved',
  COUNSELOR_APPLICATION_REJECTED: 'Your counselor application has been rejected',
  AVAILABILITY_UPDATED: 'Availability updated successfully',
  FEEDBACK_SUBMITTED: 'Thank you for your feedback',
  RATING_SUBMITTED: 'Rating submitted successfully',

  // Maintenance Messages
  MAINTENANCE_MODE: 'The system is currently under maintenance. Please try again later',
  FEATURE_DISABLED: 'This feature is temporarily disabled',
  UPGRADE_REQUIRED: 'Please upgrade your account to access this feature',

  // Data Messages
  NO_DATA_FOUND: 'No data found matching your criteria',
  DATA_LOADING: 'Loading data...',
  DATA_SAVED: 'Data saved successfully',
  DATA_SYNC_FAILED: 'Failed to sync data. Please check your connection',
  EXPORT_COMPLETED: 'Export completed successfully',
  IMPORT_COMPLETED: 'Import completed successfully',
  BACKUP_CREATED: 'Backup created successfully',
  RESTORE_COMPLETED: 'Restore completed successfully'
};

/**
 * HTTP Status Code Messages
 */
const HTTP_MESSAGES = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
};

/**
 * Email Templates Messages
 */
const EMAIL_MESSAGES = {
  WELCOME_SUBJECT: 'Welcome to SIH Mental Health Support Platform',
  VERIFICATION_SUBJECT: 'Please verify your email address',
  PASSWORD_RESET_SUBJECT: 'Password Reset Request',
  APPOINTMENT_CONFIRMATION_SUBJECT: 'Appointment Confirmation',
  APPOINTMENT_REMINDER_SUBJECT: 'Appointment Reminder',
  APPOINTMENT_CANCELLATION_SUBJECT: 'Appointment Cancelled',
  COUNSELOR_APPROVAL_SUBJECT: 'Counselor Application Status Update'
};

/**
 * Notification Messages
 */
const NOTIFICATION_MESSAGES = {
  NEW_APPOINTMENT: 'You have a new appointment scheduled',
  APPOINTMENT_REMINDER: 'Your appointment is starting soon',
  APPOINTMENT_CANCELLED: 'Your appointment has been cancelled',
  NEW_MESSAGE: 'You have a new message',
  PROFILE_UPDATED: 'Your profile has been updated',
  RESOURCE_SHARED: 'A new resource has been shared with you',
  COMMUNITY_REPLY: 'Someone replied to your post'
};

/**
 * Helper functions for message handling
 */
const MessageHelpers = {
  /**
   * Get formatted error message
   * @param {string} key - Message key
   * @param {Object} params - Parameters to replace in message
   * @returns {string} Formatted message
   */
  getErrorMessage: (key, params = {}) => {
    let message = MESSAGES[key] || 'An error occurred';
    
    // Replace parameters in message
    Object.keys(params).forEach(param => {
      message = message.replace(`{${param}}`, params[param]);
    });
    
    return message;
  },

  /**
   * Get success message
   * @param {string} key - Message key
   * @param {Object} params - Parameters to replace in message
   * @returns {string} Formatted message
   */
  getSuccessMessage: (key, params = {}) => {
    let message = MESSAGES[key] || 'Operation completed successfully';
    
    // Replace parameters in message
    Object.keys(params).forEach(param => {
      message = message.replace(`{${param}}`, params[param]);
    });
    
    return message;
  },

  /**
   * Check if message key exists
   * @param {string} key - Message key
   * @returns {boolean} True if exists
   */
  hasMessage: (key) => {
    return MESSAGES.hasOwnProperty(key);
  }
};

module.exports = {
  MESSAGES,
  HTTP_MESSAGES,
  EMAIL_MESSAGES,
  NOTIFICATION_MESSAGES,
  MessageHelpers
};