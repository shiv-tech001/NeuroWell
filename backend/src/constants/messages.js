const MESSAGES = {
  // Validation messages
  VALIDATION_ERROR: 'Validation failed. Please check your input.',
  
  // Authentication messages
  REGISTRATION_SUCCESS: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  INVALID_CREDENTIALS: 'Invalid email or password',
  ACCOUNT_DEACTIVATED: 'Your account has been deactivated',
  
  // User messages
  USER_ALREADY_EXISTS: 'User with this email already exists',
  USER_NOT_FOUND: 'User not found',
  
  // General messages
  SERVER_ERROR: 'Internal server error',
  UNAUTHORIZED: 'Not authorized to access this resource',
  FORBIDDEN: 'Access denied',
  
  // Password reset messages
  PASSWORD_RESET_EMAIL_SENT: 'Password reset instructions sent to your email',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  INVALID_RESET_TOKEN: 'Invalid or expired reset token',
  
  // Profile messages
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  CURRENT_PASSWORD_INCORRECT: 'Current password is incorrect'
};

module.exports = { MESSAGES };