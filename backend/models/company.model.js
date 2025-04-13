const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
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
  location: {
    type: String
  },
  website: {
    type: String
  },
  description: {
    type: String
  },
  logo: {
    type: String
  },
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }],
  selectedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
  }]
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);