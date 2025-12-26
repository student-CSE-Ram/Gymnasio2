const razorpay = require("../config/razorpay");
const Payment = require("../models/Payment");
const Plan = require("../models/Plan");
const User = require("../models/User"); // Only if you want member name


exports.createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;

    // 1. Validate plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    // 2. Amount calculation (source of truth)
    const amount = plan.price * 100; // paise

    // 3. Create Razorpay order
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // 4. Save payment attempt
    await Payment.create({
      userId,
      planId,
      amount,
      orderId: order.id,
      status: "created",
    });

    // 5. Send required data to frontend
    return res.status(200).json({
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
      amount,
      currency: "INR",
    });
  } catch (error) {
    console.error("Error creating payment order:", error);
    return res.status(500).json({ msg: "Unable to create payment order" });
  }
};

// MEMBER: get only their own payments
exports.getMyPayments = async (req, res) => {
  try {
    const userId = req.user.id;

    const payments = await Payment.find({ userId })
      .populate("planId", "name price") // get plan name and price
      .sort({ createdAt: -1 }); // newest first

    const formattedPayments = payments.map((p) => ({
      id: p._id,
      plan: p.planId.name,
      amount: p.amount,
      date: p.createdAt.toLocaleDateString(),
      status: p.status,
    }));

    res.status(200).json({ payments: formattedPayments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ msg: "Cannot fetch payments" });
  }
};
exports.capturePayment = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    const payment = await Payment.findOne({ orderId });
    if (!payment) return res.status(404).json({ msg: "Payment not found" });

    payment.paymentId = paymentId;
    payment.status = "paid";
    await payment.save();

    res.status(200).json({ msg: "Payment captured successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Cannot capture payment" });
  }
};



