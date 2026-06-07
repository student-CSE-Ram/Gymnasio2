const express = require("express");
const router = express.Router();

const {
  scanAttendance,
  getAttendanceStats
} = require("../controllers/memberAttendanceController");
const {authMiddleware} = require('../middleware/authMiddleware')

router.post("/scan", scanAttendance);
router.get(
  "/stats",
  authMiddleware,
  getAttendanceStats
);

module.exports = router;