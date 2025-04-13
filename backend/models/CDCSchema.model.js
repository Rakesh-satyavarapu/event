const mongoose = require('mongoose');

const CDCSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  staffId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Staff'],
    default: 'Staff',
  },
  placementRules: {
    minCGPA: {
      type: Number,
      default: 7.0,
    },
    maxBacklogs: {
      type: Number,
      default: 0,
    },
    minAttendance: {
      type: Number,
      default: 75,
    },
    allowedBranches: [{
      type: String,
      enum: ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'],
    }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CDC', CDCSchema);