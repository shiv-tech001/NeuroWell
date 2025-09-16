const { MESSAGES } = require('../constants/messages');

/**
 * Global error handling middleware
 * Must be placed after all other middleware and routes
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(`❌ Error: ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = {
      message,
      statusCode: 404
    };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    let message = `${field} already exists`;
    
    // Customize message for specific fields
    switch (field) {
      case 'email':
        message = 'Email address is already registered';
        break;
      case 'studentId':
        message = 'Student ID already exists';
        break;
      case 'licenseNumber':
        message = 'License number already exists';
        break;
    }

    error = {
      message,
      statusCode: 400
    };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    
    error = {
      message,
      statusCode: 400
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: MESSAGES.INVALID_TOKEN,
      statusCode: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token has expired',
      statusCode: 401
    };
  }

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = {
      message: 'File size too large. Maximum size is 5MB',
      statusCode: 400
    };
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    error = {
      message: 'Too many files uploaded',
      statusCode: 400
    };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = {
      message: 'Unexpected file field',
      statusCode: 400
    };
  }

  // Rate limiting errors
  if (err.statusCode === 429) {
    error = {
      message: 'Too many requests, please try again later',
      statusCode: 429
    };
  }

  // MongoDB connection errors
  if (err.name === 'MongooseServerSelectionError') {
    error = {
      message: 'Database connection failed',
      statusCode: 500
    };
  }

  // Default error response
  const statusCode = error.statusCode || 500;
  const message = error.message || MESSAGES.SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      error: err.message,
      stack: err.stack
    })
  });
};

/**
 * Handle 404 errors for undefined routes
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
};

/**
 * Async error handler wrapper
 * Catches async errors and passes them to error middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Validation error formatter
 * Formats express-validator errors
 */
const formatValidationErrors = (errors) => {
  return errors.map(error => ({
    field: error.param,
    message: error.msg,
    value: error.value
  }));
};

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Development error handler with detailed information
 */
const developmentErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    error: {
      name: err.name,
      statusCode: statusCode,
      stack: err.stack,
      // Additional request info for debugging
      request: {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      }
    }
  });
};

/**
 * Production error handler with minimal information
 */
const productionErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Only send error details for operational errors
  if (err.isOperational) {
    res.status(statusCode).json({
      success: false,
      message: err.message
    });
  } else {
    // Log the error but don't expose details
    console.error('Programming Error:', err);
    
    res.status(500).json({
      success: false,
      message: MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * Choose appropriate error handler based on environment
 */
const getErrorHandler = () => {
  return process.env.NODE_ENV === 'production' 
    ? productionErrorHandler 
    : errorHandler; // Use the comprehensive error handler in development
};

module.exports = {
  errorHandler,
  notFound,
  asyncHandler,
  formatValidationErrors,
  ApiError,
  developmentErrorHandler,
  productionErrorHandler,
  getErrorHandler
};