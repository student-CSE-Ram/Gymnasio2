const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const {
  createClass,
  updateClass,
  deleteClass,
  getAllClasses,
  bookClass
} = require("../controllers/classController");
const Class = require('../models/Class')

const router = express.Router();

// Create a class → Only owner or trainer can create
router.post("/create", authMiddleware, roleMiddleware("owner", "trainer"), createClass);

// Update a class → Only trainer can update
router.put("/update/:id", authMiddleware, roleMiddleware("trainer"), updateClass);

// Delete a class → Only owner can delete
router.delete("/delete/:id", authMiddleware, roleMiddleware("owner"), deleteClass);

// Get all classes → Anyone logged in can see
router.get("/all", authMiddleware, getAllClasses);

// Book a class → Member can book
router.post("/book/:classId", authMiddleware, roleMiddleware("member"), bookClass);

// get the class -> member can see his booked classes

router.get('/my-classes', authMiddleware, async (req, res) => {
  try {
    const classes = await Class.find({ bookedMembers: req.user._id })
      .populate('trainer', 'name') // shows trainer name
      .select('name dateTime duration trainer'); // limit the fields
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error });
  }
});


module.exports = router;
