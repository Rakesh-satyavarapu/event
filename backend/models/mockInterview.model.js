const mongoose = require("mongoose");

const mockInterviewSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  feedback: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("MockInterview", mockInterviewSchema);
