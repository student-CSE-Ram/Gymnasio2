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

module.exports = router;
