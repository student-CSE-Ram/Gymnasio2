const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const {
  createClass,
  updateClass,
  deleteClass,
  getAllClasses,
  assignMember,
} = require("../controllers/classController");

const router = express.Router();

/* =========================
   OWNER ONLY
========================= */

// Create class → ONLY OWNER
router.post("/create", authMiddleware, roleMiddleware("owner"), createClass);

// Delete class → ONLY OWNER
router.delete("/delete/:id", authMiddleware, roleMiddleware("owner"), deleteClass);

/* =========================
   OWNER + TRAINER
========================= */

// Update class → OWNER or TRAINER (controller checks ownership)
router.put("/update/:id", authMiddleware, roleMiddleware("owner", "trainer"), updateClass);

/* =========================
   ALL LOGGED-IN USERS
========================= */

// Get all classes
router.get("/all", authMiddleware, getAllClasses);

/* =========================
   OWNER: ASSIGN MEMBER
========================= */

router.post(
  "/:classId/assign-member",
  authMiddleware,
  roleMiddleware("owner"),
  assignMember
);

module.exports = router;
