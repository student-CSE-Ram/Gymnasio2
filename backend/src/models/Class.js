const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },

    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trainerName: { type: String },

    dateTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    maxMembers: { type: Number, default: 20 },

    bookedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
