const express = require("express");
const {
  markTrainerAttendance,
  markMemberAttendance,
  getTrainerAttendance,
  getMemberAttendance,
} = require("../controllers/Attendance");

const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

const router = express.Router();

/* ================= TRAINER ATTENDANCE ================= */

// Owner marks trainer attendance
router.post(
  "/trainer/mark",
  authMiddleware,
  roleMiddleware("owner"),
  markTrainerAttendance
);

// Owner views trainer attendance
router.get(
  "/trainer/:trainerId",
  authMiddleware,
  roleMiddleware("owner"),
  getTrainerAttendance
);

/* ================= MEMBER ATTENDANCE ================= */

// Trainer marks member attendance
router.post(
  "/member/mark",
  authMiddleware,
  roleMiddleware("trainer"),
  markMemberAttendance
);

// Trainer views their members attendance
router.get(
  "/member",
  authMiddleware,
  roleMiddleware("trainer"),
  getMemberAttendance
);

module.exports = router;
