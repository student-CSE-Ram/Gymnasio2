// models/TrainingSession.js
const mongoose = require("mongoose");

const trainingSessionSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
// models/TrainingSession.js
class: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Class",
  required: true,
},

    scheduledAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrainingSession", trainingSessionSchema);
