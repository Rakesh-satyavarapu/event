const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  minCGPA: {
    type: Number,
    required: true,
  },
  maxBacklogs: {
    type: Number,
    required: true,
  },
  allowedBranches: {
    type: [String],
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open',
  },
  applications: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Withdrawn', 'Rejected', 'Selected'],
      default: 'Applied',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  interviews: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    feedback: {
      type: String,
    },
  }],
  offers: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    offeredAt: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', JobSchema);