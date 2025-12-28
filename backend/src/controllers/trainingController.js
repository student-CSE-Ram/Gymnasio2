// controllers/trainingController.js
const TrainingSession = require("../models/TrainingSession");

exports.createTrainingSession = async (req, res) => {
  try {
    const { memberId, trainerId, classType, scheduledAt } = req.body;

    const session = await TrainingSession.create({
      member: memberId,
      trainer: trainerId,
      classType,
      scheduledAt,
    });

    res.status(201).json({ session });
  } catch (err) {
    res.status(500).json({ message: "Failed to create session" });
  }
};
exports.getAllSessions = async (req, res) => {
  const sessions = await TrainingSession.find()
    .populate("member", "name email")
    .populate("trainer", "name");

  res.json({ sessions });
};
exports.getTrainerSessions = async (req, res) => {
  const trainerId = req.user.id;

  const sessions = await TrainingSession.find({ trainer: trainerId })
    .populate("member", "name");

  res.json({ sessions });
};
exports.markSessionCompleted = async (req, res) => {
  const { sessionId } = req.params;

  const session = await TrainingSession.findById(sessionId);

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  if (session.trainer.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  session.status = "completed";
  await session.save();

  res.json({ message: "Session marked completed" });
};
