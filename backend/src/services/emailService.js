const nodemailer = require('nodemailer');

/**
 * Email service for sending various types of emails
 */
class EmailService {
  constructor() {
    this.transporter = null;
    this.init();
  }

  /**
   * Initialize email transporter
   */
  init() {
    try {
      // Create transporter based on environment
      if (process.env.NODE_ENV === 'production') {
        // Production configuration (replace with your preferred service)
        this.transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          secure: true,
          tls: {
            rejectUnauthorized: false
          }
        });
      } else {
        // Development configuration using Gmail or Ethereal Email
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          // Use real Gmail for development if credentials provided
          console.log(`📧 Setting up Gmail SMTP for: ${process.env.EMAIL_USER}`);
          this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            },
            secure: true,
            tls: {
              rejectUnauthorized: false
            }
          });
        } else {
          // Fallback to Ethereal Email for testing
          this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              user: 'ethereal.user@ethereal.email',
              pass: 'ethereal.pass'
            }
          });
        }
      }

      // Verify connection
      if (this.transporter) {
        this.transporter.verify((error, success) => {
          if (error) {
            console.error('❌ Email service connection failed:', error.message);
            console.log('📧 Falling back to console logging for development');
          } else {
            console.log('✅ Email service ready and verified');
          }
        });
      }

    } catch (error) {
      console.error('❌ Email service initialization failed:', error);
    }
  }

  /**
   * Send email
   * @param {Object} options - Email options
   * @returns {Promise} Send result
   */
  async sendEmail(options) {
    try {
      if (!this.transporter) {
        // Fallback: log email content for development
        console.log('📧 Email service not initialized. Logging email content:');
        console.log('To:', options.to);
        console.log('Subject:', options.subject);
        console.log('Content:', options.text || 'HTML content provided');
        
        // Return a mock successful result for development
        return {
          messageId: 'dev-mode-' + Date.now(),
          response: 'Email logged to console (development mode)'
        };
      }

      const mailOptions = {
        from: `"SIH Mental Health Support" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('📧 Email sent successfully:', {
        to: options.to,
        subject: options.subject,
        messageId: result.messageId
      });

      return result;

    } catch (error) {
      console.error('❌ Email send failed:', error.message);
      
      // Fallback: log email content when send fails
      console.log('📧 Fallback - Email content:');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      
      // Don't throw error in development - just log
      if (process.env.NODE_ENV === 'development') {
        console.log('📝 Development mode: Email failure logged, continuing...');
        return {
          messageId: 'fallback-' + Date.now(),
          response: 'Email logged due to send failure (development mode)'
        };
      }
      
      throw new Error('Failed to send email');
    }
  }

  /**
   * Send welcome email to new users
   * @param {Object} user - User object
   * @returns {Promise} Send result
   */
  async sendWelcomeEmail(user) {
    const subject = 'Welcome to SIH Mental Health Support Platform!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4f46e5; color: white; padding: 20px; text-align: center;">
          <h1>Welcome to SIH Mental Health Support!</h1>
        </div>
        
        <div style="padding: 20px;">
          <h2>Hello ${user.firstName}!</h2>
          
          <p>Thank you for joining our mental health support platform. We're here to help you on your wellness journey.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>What you can do next:</h3>
            <ul>
              <li>Complete your profile to get personalized recommendations</li>
              <li>Browse our resources and self-help tools</li>
              ${user.role === 'student' ? '<li>Book an appointment with a counselor</li>' : ''}
              ${user.role === 'counselor' ? '<li>Set up your counseling profile and availability</li>' : ''}
              <li>Join our supportive community discussions</li>
            </ul>
          </div>
          
          <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/dashboard" 
               style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
              Get Started
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>
            The SIH Mental Health Support Team
          </p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>This email was sent to ${user.email}. If you didn't create an account, please ignore this email.</p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: user.email,
      subject,
      html
    });
  }

  /**
   * Send email verification email
   * @param {Object} user - User object
   * @param {string} verificationToken - Verification token
   * @returns {Promise} Send result
   */
  async sendEmailVerification(user, verificationToken) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const subject = 'Verify Your Email Address';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #10b981; color: white; padding: 20px; text-align: center;">
          <h1>Verify Your Email</h1>
        </div>
        
        <div style="padding: 20px;">
          <h2>Hello ${user.firstName}!</h2>
          
          <p>Please verify your email address to complete your account setup.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}">${verificationUrl}</a>
          </p>
          
          <p style="color: #ef4444; font-size: 14px;">
            This link will expire in 24 hours.
          </p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: user.email,
      subject,
      html
    });
  }

  /**
   * Send password reset email
   * @param {Object} user - User object
   * @param {string} resetToken - Reset token
   * @returns {Promise} Send result
   */
  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const subject = 'Password Reset Request - NeuroWell';
    
    console.log(`🔗 Password reset URL: ${resetUrl}`);
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
        <div style="background-color: #f59e0b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🔒 Password Reset Request</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-top: 0;">Hello ${user.firstName}!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">You requested a password reset for your NeuroWell account. Click the button below to set a new password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);">
              🔑 Reset My Password
            </a>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons.
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #3b82f6; word-break: break-all;">${resetUrl}</a>
          </p>
          
          <p style="color: #6b7280; font-size: 14px;">If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 10px 0;">
            This email was sent to: <strong>${user.email}</strong><br>
            NeuroWell Mental Health Support Platform
          </p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: user.email,
      subject,
      html
    });
  }

  /**
   * Send appointment confirmation email
   * @param {Object} session - Session object
   * @returns {Promise} Send result
   */
  async sendAppointmentConfirmation(session) {
    const subject = 'Appointment Confirmation';
    const appointmentDate = new Date(session.scheduledDate).toLocaleString();
    
    // Send to student
    const studentHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #8b5cf6; color: white; padding: 20px; text-align: center;">
          <h1>Appointment Confirmed</h1>
        </div>
        
        <div style="padding: 20px;">
          <h2>Hello ${session.student.firstName}!</h2>
          
          <p>Your counseling appointment has been confirmed.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Appointment Details:</h3>
            <p><strong>Counselor:</strong> ${session.counselor.firstName} ${session.counselor.lastName}</p>
            <p><strong>Date & Time:</strong> ${appointmentDate}</p>
            <p><strong>Duration:</strong> ${session.duration} minutes</p>
            <p><strong>Type:</strong> ${session.type}</p>
            ${session.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${session.meetingLink}">${session.meetingLink}</a></p>` : ''}
          </div>
          
          <p>We'll send you a reminder 24 hours and 1 hour before your appointment.</p>
        </div>
      </div>
    `;

    // Send to counselor
    const counselorHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #8b5cf6; color: white; padding: 20px; text-align: center;">
          <h1>New Appointment</h1>
        </div>
        
        <div style="padding: 20px;">
          <h2>Hello ${session.counselor.firstName}!</h2>
          
          <p>You have a new counseling appointment.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Appointment Details:</h3>
            <p><strong>Student:</strong> ${session.student.firstName} ${session.student.lastName}</p>
            <p><strong>Date & Time:</strong> ${appointmentDate}</p>
            <p><strong>Duration:</strong> ${session.duration} minutes</p>
            <p><strong>Type:</strong> ${session.type}</p>
            <p><strong>Category:</strong> ${session.category}</p>
          </div>
        </div>
      </div>
    `;

    // Send emails to both parties
    await Promise.all([
      this.sendEmail({
        to: session.student.email,
        subject: `${subject} - ${appointmentDate}`,
        html: studentHtml
      }),
      this.sendEmail({
        to: session.counselor.email,
        subject: `${subject} - ${appointmentDate}`,
        html: counselorHtml
      })
    ]);
  }

  /**
   * Send appointment reminder email
   * @param {Object} session - Session object
   * @param {string} reminderType - '24h' or '1h'
   * @returns {Promise} Send result
   */
  async sendAppointmentReminder(session, reminderType) {
    const appointmentDate = new Date(session.scheduledDate).toLocaleString();
    const timeUntil = reminderType === '24h' ? '24 hours' : '1 hour';
    const subject = `Appointment Reminder - ${timeUntil}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f59e0b; color: white; padding: 20px; text-align: center;">
          <h1>Appointment Reminder</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>Your appointment is in ${timeUntil}!</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Appointment Details:</h3>
            <p><strong>Date & Time:</strong> ${appointmentDate}</p>
            <p><strong>Duration:</strong> ${session.duration} minutes</p>
            <p><strong>Type:</strong> ${session.type}</p>
            ${session.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${session.meetingLink}">${session.meetingLink}</a></p>` : ''}
          </div>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: session.student.email,
      subject,
      html
    });
  }
}

// Create singleton instance
const emailService = new EmailService();

module.exports = emailService;