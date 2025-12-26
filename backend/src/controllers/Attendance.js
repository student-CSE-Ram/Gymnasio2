const Attendance = require("../models/Attendance");
const User = require("../models/User");

exports.markTrainerAttendance = async (req, res) => {
  try {
    const { trainerId } = req.body;

    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const today = new Date().toISOString().split("T")[0];

    const exists = await Attendance.findOne({
      subject: trainerId,
      date: today,
      subjectRole: "trainer",
    });

    if (exists) {
      return res.status(200).json({ message: "Attendance already marked" });
    }

    await Attendance.create({
      subject: trainerId,
      markedBy: req.user.id,
      subjectRole: "trainer",
      date: today,
    });

    res.json({ message: "Trainer attendance marked" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.markMemberAttendance = async (req, res) => {
  const { memberId } = req.body;

  if (req.user.role !== "trainer") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const member = await User.findById(memberId);

  if (String(member.assignedTrainer) !== req.user.id) {
    return res.status(403).json({ message: "Not your member" });
  }

  const today = new Date().toISOString().split("T")[0];

  await Attendance.create({
    subject: memberId,
    markedBy: req.user.id,
    subjectRole: "member",
    date: today,
  });

  res.json({ message: "Member attendance marked" });
};

exports.getTrainerAttendance = async (req, res) => {
  try {
    const { trainerId } = req.params;

    const trainer = await User.findById(trainerId);
    if (!trainer || trainer.role !== "trainer") {
      return res.status(400).json({ message: "Invalid trainer" });
    }

    const attendance = await Attendance.find({
      subject: trainerId,
      subjectRole: "trainer",
    })
      .populate("subject", "name email")
      .populate("markedBy", "name role")
      .sort({ date: -1 });

    res.status(200).json({ attendance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMemberAttendance = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const attendance = await Attendance.find({
      subjectRole: "member",
      markedBy: trainerId, // trainer marked it
    })
      .populate("subject", "name email")
      .sort({ date: -1 });

    res.status(200).json({ attendance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
