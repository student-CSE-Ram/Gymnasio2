const razorpay = require("../config/razorpay");
const Payment = require("../models/Payment");
const Plan = require("../models/Plan");
const User = require("../models/User"); 


exports.getRecentPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ status: "paid" })
      .populate("userId", "name email")
      .populate("planId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const formatted = payments.map((p) => ({
      paymentId: p._id,
      member: p.userId ? p.userId.name : "Deleted User",
      plan: p.planId ? p.planId.name : "Deleted Plan",
      amount: `₹${p.amount / 100}`,
      date: p.createdAt,
    }));

    res.status(200).json({ payments: formatted });
  } catch (error) {
    console.error("Error fetching recent payments:", error);
    res.status(500).json({ msg: "Failed to fetch recent payments" });
  }
};


exports.getOwnerOverview = async (req, res) => {
  try {
    const totalMembers = await User.countDocuments({ role: "member" });
    const totalTrainers = await User.countDocuments({ role: "trainer" });

    const payments = await Payment.find({ status: "paid" });

    const totalRevenue = payments.reduce(
      (sum, p) => sum + p.amount,
      0
    ) / 100;

    // Monthly revenue (current month)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyRevenue =
      payments
        .filter(p => p.createdAt >= startOfMonth)
        .reduce((sum, p) => sum + p.amount, 0) / 100;

    res.status(200).json({
      totalMembers,
      totalTrainers,
      totalRevenue,
      monthlyRevenue,
    });
  } catch (err) {
    console.error("Owner overview error:", err);
    res.status(500).json({ msg: "Failed to load dashboard data" });
  }
};

