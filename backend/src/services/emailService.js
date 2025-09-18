const nodemailer = require('nodemailer');
const path = require('path');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  /**
   * Initialize nodemailer transporter
   */
  initialize() {
    try {
      // Create transporter using Gmail SMTP
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS // This should be an App Password for Gmail
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // Verify the connection
      this.transporter.verify((error, success) => {
        if (error) {
          console.error('❌ Email service configuration error:', error.message);
          console.log('📧 Email notifications will not work until configuration is fixed');
        } else {
          console.log('✅ Email service is ready for sending emails');
        }
      });

    } catch (error) {
      console.error('❌ Failed to initialize email service:', error.message);
    }
  }

  /**
   * Send password reset email
   * @param {string} to - Recipient email address
   * @param {string} userName - User's full name
   * @param {string} resetUrl - Password reset URL with token
   * @returns {Promise<boolean>} Success status
   */
  async sendPasswordResetEmail(to, userName, resetUrl) {
    try {
      if (!this.transporter) {
        throw new Error('Email service not configured');
      }

      const mailOptions = {
        from: {
          name: 'SIH Mental Health Platform',
          address: process.env.EMAIL_USER
        },
        to: to,
        subject: 'Password Reset Request - SIH Mental Health Platform',
        html: this.getPasswordResetTemplate(userName, resetUrl),
        text: this.getPasswordResetTextTemplate(userName, resetUrl)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Password reset email sent successfully:', info.messageId);
      return true;

    } catch (error) {
      console.error('❌ Failed to send password reset email:', error.message);
      
      // Fallback: Log the reset URL to console for development/testing
      console.log('🔗 FALLBACK - Password reset URL (copy this to browser):');
      console.log(`   ${resetUrl}`);
      console.log('📧 Please configure email service properly for production use');
      
      return false;
    }
  }

  /**
   * Send welcome email to new users
   * @param {string} to - Recipient email address
   * @param {string} userName - User's full name
   * @param {string} userRole - User's role (student/counselor)
   * @returns {Promise<boolean>} Success status
   */
  async sendWelcomeEmail(to, userName, userRole) {
    try {
      if (!this.transporter) {
        throw new Error('Email service not configured');
      }

      const mailOptions = {
        from: {
          name: 'SIH Mental Health Platform',
          address: process.env.EMAIL_USER
        },
        to: to,
        subject: 'Welcome to SIH Mental Health Platform',
        html: this.getWelcomeTemplate(userName, userRole),
        text: this.getWelcomeTextTemplate(userName, userRole)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Welcome email sent successfully:', info.messageId);
      return true;

    } catch (error) {
      console.error('❌ Failed to send welcome email:', error.message);
      return false;
    }
  }

  /**
   * HTML template for password reset email
   */
  getPasswordResetTemplate(userName, resetUrl) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🧠 SIH Mental Health Platform</h1>
          <p>Password Reset Request</p>
        </div>
        
        <div class="content">
          <h2>Hello ${userName},</h2>
          
          <p>We received a request to reset your password for your SIH Mental Health Platform account.</p>
          
          <p>Click the button below to reset your password:</p>
          
          <a href="${resetUrl}" class="button">Reset My Password</a>
          
          <div class="warning">
            <strong>⚠️ Important:</strong>
            <ul>
              <li>This link will expire in 1 hour for security reasons</li>
              <li>If you didn't request this password reset, please ignore this email</li>
              <li>Never share this link with anyone</li>
            </ul>
          </div>
          
          <p>If the button doesn't work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">${resetUrl}</p>
          
          <p>If you have any questions or need help, please contact our support team.</p>
          
          <p>Best regards,<br>The SIH Mental Health Platform Team</p>
        </div>
        
        <div class="footer">
          <p>© 2024 SIH Mental Health Platform. All rights reserved.</p>
          <p>This is an automated email, please do not reply to this address.</p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Plain text template for password reset email
   */
  getPasswordResetTextTemplate(userName, resetUrl) {
    return `
SIH Mental Health Platform - Password Reset Request

Hello ${userName},

We received a request to reset your password for your SIH Mental Health Platform account.

Please click on the following link to reset your password:
${resetUrl}

IMPORTANT:
- This link will expire in 1 hour for security reasons
- If you didn't request this password reset, please ignore this email
- Never share this link with anyone

If you have any questions or need help, please contact our support team.

Best regards,
The SIH Mental Health Platform Team

© 2024 SIH Mental Health Platform. All rights reserved.
This is an automated email, please do not reply to this address.
    `;
  }

  /**
   * HTML template for welcome email
   */
  getWelcomeTemplate(userName, userRole) {
    const roleFeatures = userRole === 'counselor' 
      ? ['Manage patient sessions', 'View patient progress', 'Schedule appointments', 'Access counseling resources']
      : ['Track your mood daily', 'Book counselor appointments', 'Access mental health resources', 'Join community discussions'];

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to SIH Mental Health Platform</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .feature-list { background: white; padding: 20px; border-radius: 5px; margin: 15px 0; }
          .feature-list li { margin: 10px 0; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🧠 Welcome to SIH Mental Health Platform</h1>
          <p>Your journey to better mental health starts here</p>
        </div>
        
        <div class="content">
          <h2>Hello ${userName},</h2>
          
          <p>Welcome to the SIH Mental Health Platform! We're excited to have you join our community as a <strong>${userRole}</strong>.</p>
          
          <div class="feature-list">
            <h3>What you can do:</h3>
            <ul>
              ${roleFeatures.map(feature => `<li>✅ ${feature}</li>`).join('')}
            </ul>
          </div>
          
          <p>Ready to get started? Log in to your account and explore all the features available to you.</p>
          
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" class="button">Go to Dashboard</a>
          
          <p>If you have any questions or need assistance, our support team is here to help.</p>
          
          <p>Best regards,<br>The SIH Mental Health Platform Team</p>
        </div>
        
        <div class="footer">
          <p>© 2024 SIH Mental Health Platform. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Plain text template for welcome email
   */
  getWelcomeTextTemplate(userName, userRole) {
    const roleFeatures = userRole === 'counselor' 
      ? ['Manage patient sessions', 'View patient progress', 'Schedule appointments', 'Access counseling resources']
      : ['Track your mood daily', 'Book counselor appointments', 'Access mental health resources', 'Join community discussions'];

    return `
SIH Mental Health Platform - Welcome!

Hello ${userName},

Welcome to the SIH Mental Health Platform! We're excited to have you join our community as a ${userRole}.

What you can do:
${roleFeatures.map(feature => `• ${feature}`).join('\n')}

Ready to get started? Log in to your account and explore all the features available to you.

Login URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/login

If you have any questions or need assistance, our support team is here to help.

Best regards,
The SIH Mental Health Platform Team

© 2024 SIH Mental Health Platform. All rights reserved.
    `;
  }

  /**
   * Test email configuration
   * @returns {Promise<boolean>} Configuration status
   */
  async testConfiguration() {
    try {
      if (!this.transporter) {
        return false;
      }
      
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email configuration test failed:', error.message);
      return false;
    }
  }
}

// Create singleton instance
const emailService = new EmailService();

module.exports = emailService;