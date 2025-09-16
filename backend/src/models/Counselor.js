const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const counselorSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't include password in queries by default
  },
  
  // Role
  role: {
    type: String,
    default: 'counselor',
    immutable: true
  },
  
  // Profile Information
  avatar: {
    public_id: String,
    url: String
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value < new Date();
      },
      message: 'Date of birth must be in the past'
    }
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  
  // Professional Information
  specialization: [{
    type: String,
    enum: ['anxiety', 'depression', 'stress', 'relationships', 'academic', 'career', 'substance-abuse', 'trauma', 'eating-disorders', 'grief-counseling']
  }],
  qualification: {
    type: String,
    trim: true,
    maxlength: [200, 'Qualification cannot be more than 200 characters']
  },
  experience: {
    type: Number,
    min: [0, 'Experience cannot be negative'],
    default: 0
  },
  licenseNumber: {
    type: String,
    unique: true,
    trim: true,
    sparse: true, // Allow null/undefined values
    maxlength: [50, 'License number cannot be more than 50 characters']
  },
  
  // Additional Professional Details
  education: [{
    degree: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    fieldOfStudy: {
      type: String,
      required: true
    }
  }],
  
  certifications: [{
    name: {
      type: String,
      required: true
    },
    issuingOrganization: {
      type: String,
      required: true
    },
    issueDate: {
      type: Date,
      required: true
    },
    expiryDate: {
      type: Date
    },
    credentialId: {
      type: String
    }
  }],
  
  // Work Information
  currentWorkplace: {
    type: String,
    trim: true
  },
  workingHours: {
    start: {
      type: String, // Format: "HH:MM"
      default: "09:00"
    },
    end: {
      type: String, // Format: "HH:MM"
      default: "17:00"
    }
  },
  workingDays: [{
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    default: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  }],
  
  // Consultation Details
  consultationFee: {
    type: Number,
    min: [0, 'Consultation fee cannot be negative'],
    default: 0
  },
  sessionDuration: {
    type: Number, // in minutes
    default: 50,
    min: [15, 'Session duration must be at least 15 minutes'],
    max: [180, 'Session duration cannot exceed 3 hours']
  },
  languages: [{
    type: String,
    default: ['english']
  }],
  
  // Ratings and Reviews
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  // Availability
  availability: {
    monday: [{
      start: String, // "HH:MM"
      end: String    // "HH:MM"
    }],
    tuesday: [{
      start: String,
      end: String
    }],
    wednesday: [{
      start: String,
      end: String
    }],
    thursday: [{
      start: String,
      end: String
    }],
    friday: [{
      start: String,
      end: String
    }],
    saturday: [{
      start: String,
      end: String
    }],
    sunday: [{
      start: String,
      end: String
    }]
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false // Admin verification for professional credentials
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  lastLogin: {
    type: Date
  },
  
  // Password Reset
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  
  // Privacy & Preferences
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
      },
      showContactInfo: {
        type: Boolean,
        default: false
      }
    }
  },

  // Professional Statistics
  statistics: {
    totalSessions: {
      type: Number,
      default: 0
    },
    totalStudents: {
      type: Number,
      default: 0
    },
    completedSessions: {
      type: Number,
      default: 0
    },
    cancelledSessions: {
      type: Number,
      default: 0
    }
  },

  // Appointment History
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],

  // Students under care
  students: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    assignedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'transferred'],
      default: 'active'
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
counselorSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
counselorSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for years of experience
counselorSchema.virtual('yearsOfExperience').get(function() {
  return this.experience;
});

// Indexes for performance - removed email and licenseNumber indexes to avoid duplicate with unique constraint
counselorSchema.index({ specialization: 1 });
counselorSchema.index({ rating: -1 });
counselorSchema.index({ verificationStatus: 1 });
counselorSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
counselorSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
counselorSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Static method to find by license number
counselorSchema.statics.findByLicenseNumber = function(licenseNumber) {
  return this.findOne({ licenseNumber, isActive: true });
};

// Static method to find by specialization
counselorSchema.statics.findBySpecialization = function(specialization) {
  return this.find({ specialization: { $in: [specialization] }, isActive: true, isVerified: true });
};

// Static method to find verified counselors
counselorSchema.statics.findVerified = function() {
  return this.find({ isActive: true, isVerified: true });
};

// Method to update rating
counselorSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating.average * this.rating.count) + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

module.exports = mongoose.model('Counselor', counselorSchema);