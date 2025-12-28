// routes/trainingRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTrainingSession,
  getAllSessions,
  getTrainerSessions,
  markSessionCompleted,
} = require("../controllers/trainingController");

const {authMiddleware} = require("../middleware/authMiddleware");
const {roleMiddleware} = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("owner"), createTrainingSession);
router.get("/", authMiddleware, roleMiddleware("owner"), getAllSessions);
router.get("/trainer", authMiddleware, roleMiddleware("trainer"), getTrainerSessions);
router.patch("/:sessionId/complete", authMiddleware, roleMiddleware("trainer"), markSessionCompleted);

module.exports = router;
