const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
    ],
    unique: true
},
  password: {
    type: String,
    required: true,
  },
  cgpa: {
    type: Number,
    default: null,
    min: [0, 'CGPA cannot be less than 0'],
    max: [10, 'CGPA cannot be more than 10'],
  },
  branch: {
    type: String,
    required: true,
    enum: ['CSE','IT', 'ECE', 'EEE', 'MECH', 'CIVIL'],
  },
  resume: {
    type: String,
    trim: true,
    default: null,
  },
  backlogs: {
    type: Number,
    default: 0,
    min: [0, 'Backlogs cannot be less than 0'],
  },
  appliedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }],
  selectedByCompanies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', 
  }],
  feedbacks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback', // Reference to the Feedback model
  }],
  interviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview', 
  }],
}, { timestamps: true });

module.exports = mongoose.model("student", studentSchema);
