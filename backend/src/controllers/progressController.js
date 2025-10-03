const Progress = require('../models/Progress');

exports.getMemberProgress = async (req, res) => {
  try {
    const { memberId } = req.params;
    const progress = await Progress.findOne({ user: memberId })
      .populate("user", "name email")
      .populate("classesAttended.class", "name dateTime");

    if (!progress) return res.status(404).json({ msg: "No progress found" });

    return res.status(200).json({ progress });
  } catch (error) {
    console.error("Error fetching progress", error);
    return res.status(500).json({ msg: "Cannot fetch progress" });
  }
};
exports.addProgressEntry = async (req, res) => {
  try {
    const { memberId, classId, workoutName, weight, notes } = req.body;

    let progress = await Progress.findOne({ user: memberId });

    if (!progress) {
      progress = new Progress({ user: memberId });
    }

    if (classId) {
      progress.classesAttended.push({ class: classId });
    }

    if (workoutName) {
      progress.workoutsCompleted.push({ workoutName, notes });
    }

    if (weight) {
      progress.weightProgress.push({ weight });
    }

    await progress.save();
    return res.status(200).json({ msg: "Progress updated", progress });
  } catch (error) {
    console.error("Error updating progress", error);
    return res.status(500).json({ msg: "Cannot update progress" });
  }
};
