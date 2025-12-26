const express = require("express");
const router = express.Router();
const {getRecentPayments, getOwnerOverview } = require("../controllers/ownerdashboardController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

router.get("/overview", authMiddleware, roleMiddleware("owner"), getOwnerOverview);
router.get("/recent", authMiddleware, roleMiddleware("owner"), getRecentPayments);


module.exports = router;
