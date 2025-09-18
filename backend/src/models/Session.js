const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  // Session Participants
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student is required']
  },
  counselor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Counselor is required']
  },
  
  // Session Details
  title: {
    type: String,
    required: [true, 'Session title is required'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    enum: ['anxiety', 'depression', 'stress', 'relationships', 'academic', 'career', 'substance-abuse', 'trauma', 'general'],
    required: [true, 'Session category is required']
  },
  
  // Scheduling
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Scheduled date must be in the future'
    }
  },
  duration: {
    type: Number, // in minutes
    default: 60,
    min: [15, 'Duration must be at least 15 minutes'],
    max: [180, 'Duration cannot exceed 180 minutes']
  },
  
  // Session Status
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  
  // Session Type
  type: {
    type: String,
    enum: ['video-call', 'voice-call', 'chat', 'in-person'],
    default: 'video-call'
  },
  
  // Meeting Details
  meetingLink: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Meeting link must be a valid URL'
    }
  },
  meetingId: String,
  meetingPassword: String,
  
  // Session Notes & Outcomes
  studentNotes: {
    type: String,
    maxlength: [1000, 'Student notes cannot exceed 1000 characters']
  },
  counselorNotes: {
    type: String,
    maxlength: [2000, 'Counselor notes cannot exceed 2000 characters'],
    select: false // Only accessible to counselor and admin
  },
  
  // Feedback & Rating
  studentRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  studentFeedback: {
    type: String,
    maxlength: [500, 'Feedback cannot exceed 500 characters']
  },
  counselorRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  counselorFeedback: {
    type: String,
    maxlength: [500, 'Feedback cannot exceed 500 characters']
  },
  
  // Follow-up
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  followUpNotes: {
    type: String,
    maxlength: [500, 'Follow-up notes cannot exceed 500 characters']
  },
  
  // Emergency flags
  isUrgent: {
    type: Boolean,
    default: false
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'low'
  },
  
  // Cancellation/Rescheduling
  cancellationReason: String,
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancelledAt: Date,
  
  rescheduleHistory: [{
    originalDate: Date,
    newDate: Date,
    reason: String,
    rescheduledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rescheduledAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Session Recording (if applicable)
  recordingAvailable: {
    type: Boolean,
    default: false
  },
  recordingUrl: String,
  recordingConsent: {
    student: { type: Boolean, default: false },
    counselor: { type: Boolean, default: false }
  },
  
  // Reminders
  remindersSent: {
    student: {
      oneDayBefore: { type: Boolean, default: false },
      oneHourBefore: { type: Boolean, default: false }
    },
    counselor: {
      oneDayBefore: { type: Boolean, default: false },
      oneHourBefore: { type: Boolean, default: false }
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for session duration in hours
sessionSchema.virtual('durationInHours').get(function() {
  return this.duration / 60;
});

// Virtual to check if session is upcoming
sessionSchema.virtual('isUpcoming').get(function() {
  return this.scheduledDate > new Date() && this.status === 'scheduled';
});

// Virtual to check if session is overdue
sessionSchema.virtual('isOverdue').get(function() {
  return this.scheduledDate < new Date() && ['scheduled', 'confirmed'].includes(this.status);
});

// Indexes for performance
sessionSchema.index({ student: 1, scheduledDate: -1 });
sessionSchema.index({ counselor: 1, scheduledDate: -1 });
sessionSchema.index({ status: 1, scheduledDate: 1 });
sessionSchema.index({ category: 1 });
sessionSchema.index({ isUrgent: 1, riskLevel: 1 });
sessionSchema.index({ scheduledDate: 1 });

// Pre-save middleware
sessionSchema.pre('save', function(next) {
  // Set cancellation timestamp if status changed to cancelled
  if (this.isModified('status') && this.status === 'cancelled' && !this.cancelledAt) {
    this.cancelledAt = new Date();
  }
  next();
});

// Static methods
sessionSchema.statics.findUpcomingSessions = function(userId, role = 'student') {
  const filter = { status: { $in: ['scheduled', 'confirmed'] }, scheduledDate: { $gt: new Date() } };
  filter[role] = userId;
  return this.find(filter).populate('student counselor', 'firstName lastName email avatar').sort({ scheduledDate: 1 });
};

sessionSchema.statics.findSessionHistory = function(userId, role = 'student') {
  const filter = { status: { $in: ['completed', 'cancelled'] } };
  filter[role] = userId;
  return this.find(filter).populate('student counselor', 'firstName lastName email avatar').sort({ scheduledDate: -1 });
};

module.exports = mongoose.model('Session', sessionSchema);