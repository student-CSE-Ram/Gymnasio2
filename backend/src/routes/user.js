const express = require("express");
const { createMember, createTrainer } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

const router = express.Router();

// Only owner can create members or trainers
router.post("/create-member", authMiddleware, roleMiddleware("owner"), createMember);
router.post("/create-trainer", authMiddleware, roleMiddleware("owner"), createTrainer);

module.exports = router;
