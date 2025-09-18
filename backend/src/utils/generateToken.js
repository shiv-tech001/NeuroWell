const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  if (!id) {
    throw new Error('User ID is required to generate token');
  }

  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      issuer: 'sih-mental-health-api',
      audience: 'sih-mental-health-app'
    }
  );
};

/**
 * Generate refresh token (for future implementation)
 * @param {string} id - User ID
 * @returns {string} Refresh token
 */
const generateRefreshToken = (id) => {
  if (!id) {
    throw new Error('User ID is required to generate refresh token');
  }

  return jwt.sign(
    { id, type: 'refresh' }, 
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, 
    {
      expiresIn: '30d',
      issuer: 'sih-mental-health-api',
      audience: 'sih-mental-health-app'
    }
  );
};

/**
 * Generate password reset token
 * @param {string} id - User ID
 * @returns {string} Password reset token
 */
const generatePasswordResetToken = (id) => {
  if (!id) {
    throw new Error('User ID is required to generate password reset token');
  }

  return jwt.sign(
    { id, type: 'password-reset' }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '1h', // Short expiry for security
      issuer: 'sih-mental-health-api',
      audience: 'sih-mental-health-app'
    }
  );
};

/**
 * Generate email verification token
 * @param {string} id - User ID
 * @returns {string} Email verification token
 */
const generateEmailVerificationToken = (id) => {
  if (!id) {
    throw new Error('User ID is required to generate email verification token');
  }

  return jwt.sign(
    { id, type: 'email-verification' }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '24h',
      issuer: 'sih-mental-health-api',
      audience: 'sih-mental-health-app'
    }
  );
};

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token to verify
 * @param {string} expectedType - Expected token type (optional)
 * @returns {object} Decoded token payload
 */
const verifyToken = (token, expectedType = null) => {
  if (!token) {
    throw new Error('Token is required');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check token type if specified
    if (expectedType && decoded.type !== expectedType) {
      throw new Error('Invalid token type');
    }

    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw error;
    }
  }
};

/**
 * Extract token from Authorization header
 * @param {object} req - Express request object
 * @returns {string|null} Extracted token or null
 */
const extractTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  
  return null;
};

/**
 * Get token expiration date
 * @param {string} token - JWT token
 * @returns {Date} Expiration date
 */
const getTokenExpiration = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
      return new Date(decoded.exp * 1000);
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired
 */
const isTokenExpired = (token) => {
  const expiration = getTokenExpiration(token);
  if (!expiration) return true;
  
  return expiration < new Date();
};

/**
 * Generate token pair (access + refresh)
 * @param {string} id - User ID
 * @returns {object} Object containing access and refresh tokens
 */
const generateTokenPair = (id) => {
  return {
    accessToken: generateToken(id),
    refreshToken: generateRefreshToken(id)
  };
};

module.exports = {
  generateToken,
  generateRefreshToken,
  generatePasswordResetToken,
  generateEmailVerificationToken,
  verifyToken,
  extractTokenFromHeader,
  getTokenExpiration,
  isTokenExpired,
  generateTokenPair
};