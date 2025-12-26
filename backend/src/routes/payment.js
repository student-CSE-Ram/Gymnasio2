const express = require("express");
const router = express.Router();

const { createOrder, capturePayment, getMyPayments} = require("../controllers/razorpayController");

const { verifyPayment } = require("../controllers/verifyRazorpay");
const { authMiddleware } = require("../middleware/authMiddleware");
const {roleMiddleware: role} = require("../middleware/roleMiddleware");

router.post("/create-order", authMiddleware, createOrder);
router.post("/verify-payment", authMiddleware, verifyPayment);
router.post("/capture", authMiddleware, capturePayment);
router.get("/my-payments", authMiddleware, getMyPayments);

module.exports = router;
