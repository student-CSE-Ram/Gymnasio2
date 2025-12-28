const Class = require("../models/Class");
const User = require("../models/User");

/* =========================
   OWNER: CREATE CLASS
========================= */
exports.createClass = async (req, res) => {
  try {
    const { name, trainer, date, time, duration, maxMembers, description } = req.body;

    if (!name || !trainer || !date || !time || !duration) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Validate trainer exists
    const trainerDoc = await User.findById(trainer);
    if (!trainerDoc || trainerDoc.role !== "trainer") {
      return res.status(404).json({ msg: "Trainer not found" });
    }

    const dateTime = new Date(`${date}T${time}`);

    const newClass = await Class.create({
      name,
      trainer: trainerDoc._id,
      trainerName: trainerDoc.name,
      dateTime,
      duration,
      maxMembers: maxMembers || 20,
      description,
      bookedMembers: [],
      createdBy: req.user._id,
    });

    return res.status(201).json({
      msg: "Class created successfully",
      class: newClass,
    });
  } catch (error) {
    console.error("Create class error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

/* =========================
   GET CLASSES (ROLE BASED)
========================= */
exports.getAllClasses = async (req, res) => {
  try {
    let classes;

    if (req.user.role === "trainer") {
      classes = await Class.find({ trainer: req.user._id })
        .populate("trainer", "name email"); // populate trainer info
    } else {
      classes = await Class.find()
        .populate("trainer", "name email"); // populate trainer info
    }

    return res.status(200).json({ classes });
  } catch (error) {
    console.error("Fetch classes error:", error);
    return res.status(500).json({ msg: "Cannot fetch classes" });
  }
};

/* =========================
   UPDATE CLASS
========================= */
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classDoc = await Class.findById(id);
    if (!classDoc) return res.status(404).json({ msg: "Class not found" });

    if (req.user.role !== "owner" && classDoc.trainer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Access denied" });
    }

    Object.assign(classDoc, req.body);
    await classDoc.save();

    return res.status(200).json({
      msg: "Class updated successfully",
      class: classDoc,
    });
  } catch (error) {
    console.error("Update class error:", error);
    return res.status(500).json({ msg: "Cannot update class" });
  }
};

/* =========================
   DELETE CLASS
========================= */
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classDoc = await Class.findById(id);
    if (!classDoc) return res.status(404).json({ msg: "Class not found" });

    if (req.user.role !== "owner" && classDoc.trainer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Access denied" });
    }

    await Class.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Class deleted successfully" });
  } catch (error) {
    console.error("Delete class error:", error);
    return res.status(500).json({ msg: "Cannot delete class" });
  }
};

/* =========================
   MEMBER OR OWNER: ASSIGN/BOOK CLASS
========================= */
exports.assignMember = async (req, res) => {
  try {
    const { classId } = req.params;
    const { memberId } = req.body;

    if (!memberId) return res.status(400).json({ msg: "memberId required" });

    const classDoc = await Class.findById(classId);
    if (!classDoc) return res.status(404).json({ msg: "Class not found" });

    // Initialize bookedMembers array if undefined
    if (!classDoc.bookedMembers) classDoc.bookedMembers = [];

    if (classDoc.bookedMembers.includes(memberId))
      return res.status(400).json({ msg: "Member already assigned" });

    if (classDoc.bookedMembers.length >= classDoc.maxMembers)
      return res.status(400).json({ msg: "Class is full" });

    classDoc.bookedMembers.push(memberId);
    await classDoc.save();

    return res.status(200).json({ msg: "Member assigned", class: classDoc });
  } catch (err) {
    console.error("Assign member error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};
