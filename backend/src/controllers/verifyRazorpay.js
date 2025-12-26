const razorpay = require("../config/razorpay");
const Payment = require("../models/Payment");
const Plan = require("../models/Plan");
const User = require("../models/User");

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id) {
      return res.status(400).json({ msg: "Missing payment details" });
    }

    // 1. Fetch payment directly from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // 2. Verify payment really belongs to this order
    if (
      payment.status !== "captured" ||
      payment.order_id !== razorpay_order_id
    ) {
      return res.status(400).json({ msg: "Payment not verified" });
    }

    // 3. Find local payment record
    const dbPayment = await Payment.findOne({ orderId: razorpay_order_id });

    if (!dbPayment) {
      return res.status(404).json({ msg: "Payment record not found" });
    }

    if (dbPayment.status === "paid") {
      return res.status(200).json({ msg: "Already processed" });
    }

    // 4. Mark payment as paid
    dbPayment.status = "paid";
    dbPayment.paymentId = razorpay_payment_id;
    dbPayment.paidAt = new Date();
    await dbPayment.save();

    // 5. Activate plan
    const plan = await Plan.findById(dbPayment.planId);

    await User.findByIdAndUpdate(dbPayment.userId, {
      activePlan: plan._id,
      planStart: new Date(),
      planEnd: new Date(
        Date.now() + plan.duration * 30 * 24 * 60 * 60 * 1000
      ),
    });

    return res.status(200).json({ msg: "Payment verified & plan activated" });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return res.status(500).json({ msg: "Payment verification failed" });
  }
};
