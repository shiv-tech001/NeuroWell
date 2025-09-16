const crypto = require('crypto');

/**
 * OTP (One-Time Password) Service
 * Handles generation, storage, and verification of OTPs
 */
class OTPService {
  constructor() {
    // In-memory storage for development
    // In production, use Redis or database
    this.otpStore = new Map();
    this.cleanupInterval = 60000; // Clean up expired OTPs every minute
    
    // Start cleanup process
    this.startCleanup();
  }

  /**
   * Generate a random OTP
   * @param {number} length - OTP length (default: 6)
   * @returns {string} Generated OTP
   */
  generateOTP(length = 6) {
    const digits = '0123456789';
    let otp = '';
    
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    
    return otp;
  }

  /**
   * Generate a secure random OTP using crypto
   * @param {number} length - OTP length (default: 6)
   * @returns {string} Generated OTP
   */
  generateSecureOTP(length = 6) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    
    // Generate random bytes and convert to number within range
    const randomBytes = crypto.randomBytes(4);
    const randomNumber = randomBytes.readUInt32BE(0);
    const otp = min + (randomNumber % (max - min + 1));
    
    return otp.toString().padStart(length, '0');
  }

  /**
   * Store OTP with expiration
   * @param {string} identifier - User identifier (email, phone, etc.)
   * @param {string} otp - OTP to store
   * @param {number} expiryMinutes - Expiry time in minutes (default: 10)
   * @param {string} purpose - Purpose of OTP (verification, reset, etc.)
   * @returns {Object} Storage result
   */
  storeOTP(identifier, otp, expiryMinutes = 10, purpose = 'verification') {
    const key = `${identifier}_${purpose}`;
    const expiryTime = Date.now() + (expiryMinutes * 60 * 1000);
    
    const otpData = {
      otp,
      identifier,
      purpose,
      createdAt: Date.now(),
      expiryTime,
      attempts: 0,
      maxAttempts: 3
    };
    
    this.otpStore.set(key, otpData);
    
    console.log(`📱 OTP stored for ${identifier} (${purpose}): ${otp} - Expires in ${expiryMinutes} minutes`);
    
    return {
      success: true,
      expiryTime: new Date(expiryTime),
      attemptsRemaining: otpData.maxAttempts
    };
  }

  /**
   * Verify OTP
   * @param {string} identifier - User identifier
   * @param {string} providedOTP - OTP provided by user
   * @param {string} purpose - Purpose of OTP
   * @returns {Object} Verification result
   */
  verifyOTP(identifier, providedOTP, purpose = 'verification') {
    const key = `${identifier}_${purpose}`;
    const otpData = this.otpStore.get(key);
    
    if (!otpData) {
      return {
        success: false,
        message: 'OTP not found or expired',
        code: 'OTP_NOT_FOUND'
      };
    }
    
    // Check if OTP has expired
    if (Date.now() > otpData.expiryTime) {
      this.otpStore.delete(key);
      return {
        success: false,
        message: 'OTP has expired',
        code: 'OTP_EXPIRED'
      };
    }
    
    // Check attempt count
    if (otpData.attempts >= otpData.maxAttempts) {
      this.otpStore.delete(key);
      return {
        success: false,
        message: 'Maximum verification attempts exceeded',
        code: 'MAX_ATTEMPTS_EXCEEDED'
      };
    }
    
    // Increment attempt count
    otpData.attempts += 1;
    this.otpStore.set(key, otpData);
    
    // Verify OTP
    if (otpData.otp === providedOTP) {
      // Remove OTP after successful verification
      this.otpStore.delete(key);
      
      console.log(`✅ OTP verified successfully for ${identifier} (${purpose})`);
      
      return {
        success: true,
        message: 'OTP verified successfully',
        code: 'OTP_VERIFIED'
      };
    } else {
      const attemptsRemaining = otpData.maxAttempts - otpData.attempts;
      
      console.log(`❌ Invalid OTP for ${identifier} (${purpose}). Attempts remaining: ${attemptsRemaining}`);
      
      return {
        success: false,
        message: 'Invalid OTP',
        code: 'INVALID_OTP',
        attemptsRemaining
      };
    }
  }

  /**
   * Generate and store OTP
   * @param {string} identifier - User identifier
   * @param {string} purpose - Purpose of OTP
   * @param {number} expiryMinutes - Expiry time in minutes
   * @param {number} length - OTP length
   * @returns {Object} Generated OTP data
   */
  generateAndStoreOTP(identifier, purpose = 'verification', expiryMinutes = 10, length = 6) {
    const otp = this.generateSecureOTP(length);
    const result = this.storeOTP(identifier, otp, expiryMinutes, purpose);
    
    return {
      ...result,
      otp // Include OTP in response for sending via email/SMS
    };
  }

  /**
   * Check if OTP exists and is valid
   * @param {string} identifier - User identifier
   * @param {string} purpose - Purpose of OTP
   * @returns {Object} Status information
   */
  getOTPStatus(identifier, purpose = 'verification') {
    const key = `${identifier}_${purpose}`;
    const otpData = this.otpStore.get(key);
    
    if (!otpData) {
      return {
        exists: false,
        message: 'No OTP found'
      };
    }
    
    const isExpired = Date.now() > otpData.expiryTime;
    const attemptsRemaining = otpData.maxAttempts - otpData.attempts;
    const timeRemaining = Math.max(0, otpData.expiryTime - Date.now());
    
    return {
      exists: true,
      isExpired,
      attemptsRemaining,
      timeRemainingMs: timeRemaining,
      timeRemainingMinutes: Math.ceil(timeRemaining / (60 * 1000)),
      createdAt: new Date(otpData.createdAt),
      expiryTime: new Date(otpData.expiryTime)
    };
  }

  /**
   * Invalidate/delete OTP
   * @param {string} identifier - User identifier
   * @param {string} purpose - Purpose of OTP
   * @returns {boolean} Success status
   */
  invalidateOTP(identifier, purpose = 'verification') {
    const key = `${identifier}_${purpose}`;
    const deleted = this.otpStore.delete(key);
    
    if (deleted) {
      console.log(`🗑️ OTP invalidated for ${identifier} (${purpose})`);
    }
    
    return deleted;
  }

  /**
   * Clean up expired OTPs
   */
  cleanupExpiredOTPs() {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [key, otpData] of this.otpStore.entries()) {
      if (now > otpData.expiryTime) {
        this.otpStore.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired OTPs`);
    }
  }

  /**
   * Start automatic cleanup of expired OTPs
   */
  startCleanup() {
    setInterval(() => {
      this.cleanupExpiredOTPs();
    }, this.cleanupInterval);
    
    console.log('🧹 OTP cleanup service started');
  }

  /**
   * Get statistics about stored OTPs
   * @returns {Object} Statistics
   */
  getStatistics() {
    const stats = {
      totalOTPs: this.otpStore.size,
      byPurpose: {},
      expired: 0,
      active: 0
    };
    
    const now = Date.now();
    
    for (const [key, otpData] of this.otpStore.entries()) {
      // Count by purpose
      if (!stats.byPurpose[otpData.purpose]) {
        stats.byPurpose[otpData.purpose] = 0;
      }
      stats.byPurpose[otpData.purpose]++;
      
      // Count expired vs active
      if (now > otpData.expiryTime) {
        stats.expired++;
      } else {
        stats.active++;
      }
    }
    
    return stats;
  }

  /**
   * Generate alphanumeric OTP (for cases where numbers-only might not be suitable)
   * @param {number} length - OTP length (default: 6)
   * @returns {string} Generated alphanumeric OTP
   */
  generateAlphanumericOTP(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let otp = '';
    
    for (let i = 0; i < length; i++) {
      otp += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return otp;
  }
}

// Create singleton instance
const otpService = new OTPService();

module.exports = otpService;