const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  feedback: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Interview", interviewSchema);
