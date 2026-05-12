const express = require("express");
const { authMiddleware} = require("../middleware/authMiddleware");
const { createMembership } = require("../controllers/membershipController");
const { roleMiddleware } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post('/create', authMiddleware,roleMiddleware, createMembership);


module.exports = router;