const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const { getMemberProgress, addProgressEntry } = require("../controllers/progressController");

const router = express.Router();

// Get member progress
router.get("/:memberId", authMiddleware, roleMiddleware("owner", "trainer", "member"), getMemberProgress);

// Add new progress entry
router.post("/add", authMiddleware, roleMiddleware("owner", "trainer", "member"), addProgressEntry);

module.exports = router;
