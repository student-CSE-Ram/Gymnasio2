const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Membership"
  },
  classesAttended: [
    {
      class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
      date: { type: Date, default: Date.now }
    }
  ],
  workoutsCompleted: [
    {
      workoutName: { type: String },
      date: { type: Date, default: Date.now },
      notes: { type: String, default: "" }
    }
  ],
  weightProgress: [
    {
      weight: { type: Number },
      date: { type: Date, default: Date.now }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Progress", progressSchema);
