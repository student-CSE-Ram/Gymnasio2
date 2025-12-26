const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subjectRole: {
      type: String,
      enum: ["trainer", "member"],
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    checkInTime: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["present", "absent"],
      default: "present",
    },
  },
  { timestamps: true }
);

attendanceSchema.index(
  { subject: 1, date: 1, subjectRole: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
