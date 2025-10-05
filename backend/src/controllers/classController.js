const Class = require("../models/Class");

exports.createClass = async (req, res) => {
  try {
    const { name, dateTime, duration, maxMembers, description } = req.body;

    const trainerId = req.user._id;

    const existingClass = await Class.findOne({ name });
    if (existingClass) {
      return res.status(400).json({ msg: "Class already exist" });
    }

    const newClass = new Class({
      name,
      dateTime,
      duration,
      maxMembers,
      description,
      trainer: trainerId,
    });

    await newClass.save();

    return res
      .status(201)
      .json({ msg: "Class created successfully", class: newClass });
  } catch (error) {
    console.error("Error creating class,Internal server error");
    return res.status(500).json({ msg: "Cannot create the class" });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dateTime, duration, maxMembers, description } = req.body;

    const existingClass = await Class.findById(id);

    if (!existingClass) {
      return res.status(404).json({ msg: "Class not found" });
    }

    if (existingClass.trainer.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          msg: "Access denied: Only the trainer who created this class can update it",
        });
    }

    if (name) existingClass.name = name;
    if (dateTime) existingClass.dateTime = dateTime;
    if (duration) existingClass.duration = duration;
    if (maxMembers) existingClass.maxMembers = maxMembers;
    if (description) existingClass.description = description;

    await existingClass.save();

    return res.status(200).json({
      msg: "Class updated successfully",
      class: existingClass,
    });
  } catch (error) {
    console.error("Error updating class", error);
    return res.status(500).json({ msg: "Cannot update the class" });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const existingClass = await Class.findById(id);

    if (!existingClass) return res.status(404).json({ msg: "Class not found" });

    // Trainer who created the class can delete
    if (existingClass.trainer.toString() !== req.user._id.toString() && req.user.role !== "owner") {
      return res.status(403).json({ msg: "Access denied" });
    }

    await Class.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class", error);
    return res.status(500).json({ msg: "Cannot delete class" });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    let classes;
    if (req.user.role === "trainer") {
      classes = await Class.find({ trainer: req.user._id });
    } else {
      classes = await Class.find(); // All classes for members
    }

    return res.status(200).json({ classes });
  } catch (error) {
    console.error("Error getting classes", error);
    return res.status(500).json({ msg: "Cannot fetch classes" });
  }
};

exports.bookClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const classObj = await Class.findById(classId);

    if (!classObj) return res.status(404).json({ msg: "Class not found" });

    // Check if member already booked
    if (classObj.bookedMembers.includes(req.user._id)) {
      return res.status(400).json({ msg: "You already booked this class" });
    }

    // Check capacity
    if (classObj.bookedMembers.length >= classObj.maxMembers) {
      return res.status(400).json({ msg: "Class is full" });
    }

    classObj.bookedMembers.push(req.user._id);
    await classObj.save();

    return res.status(200).json({ msg: "Class booked successfully", class: classObj });
  } catch (error) {
    console.error("Error booking class", error);
    return res.status(500).json({ msg: "Cannot book class" });
  }
};
