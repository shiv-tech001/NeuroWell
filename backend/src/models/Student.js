const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
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
    default: 'student',
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
        return value < new Date();
      },
      message: 'Date of birth must be in the past'
    }
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  
  // Student-specific fields
  studentId: {
    type: String,
    unique: true,
    trim: true,
    sparse: true // Allow null/undefined values
  },
  college: {
    type: String,
    trim: true,
    maxlength: [100, 'College name cannot be more than 100 characters']
  },
  course: {
    type: String,
    trim: true,
    maxlength: [100, 'Course name cannot be more than 100 characters']
  },
  year: {
    type: Number,
    min: [1, 'Year must be at least 1'],
    max: [6, 'Year cannot be more than 6']
  },
  semester: {
    type: Number,
    min: [1, 'Semester must be at least 1'],
    max: [8, 'Semester cannot be more than 8']
  },
  
  // Mental Health Related
  emergencyContact: {
    name: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
    },
    relationship: {
      type: String,
      enum: ['parent', 'guardian', 'sibling', 'friend', 'other']
    }
  },
  
  // Academic Performance & Stress Indicators
  academicStressLevel: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  previousCounselingHistory: {
    type: Boolean,
    default: false
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
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'private', 'counselors-only'],
        default: 'private'
      },
      shareAcademicInfo: {
        type: Boolean,
        default: false
      }
    }
  },

  // Appointment History
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],

  // Resources accessed
  accessedResources: [{
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource'
    },
    accessedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
studentSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
studentSchema.virtual('age').get(function() {
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

// Indexes for performance - removed email index to avoid duplicate with unique constraint
studentSchema.index({ college: 1 });
studentSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
studentSchema.pre('save', async function(next) {
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
studentSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Static method to find by student ID
studentSchema.statics.findByStudentId = function(studentId) {
  return this.findOne({ studentId, isActive: true });
};

// Static method to find by college
studentSchema.statics.findByCollege = function(college) {
  return this.find({ college, isActive: true });
};

module.exports = mongoose.model('Student', studentSchema);