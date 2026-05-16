const Membership = require('../models/Membership');
const Plan = require('../models/Plan');
const User = require('../models/User');

exports.createMembership = async (req, res) => {
  try {

    const { planId, userId } = req.body;

    // Basic validation
    if (!planId || !userId) {
      return res.status(400).json({
        msg: "Plan ID and User ID are required"
      });
    }

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        msg: "User not found"
      });
    }

    // Ensure only members can get membership
    if (user.role !== "member") {
      return res.status(400).json({
        msg: "Membership can only be assigned to members"
      });
    }

    // Find plan
    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        msg: "Plan not found"
      });
    }

    // Prevent duplicate active memberships
const existingMembership = await Membership.findOne({
  user: userId,
  status: { $in: ["active", "cancelled"] },
  endDate: { $gt: new Date() }
});

    if (existingMembership) {
      return res.status(400).json({
        msg: "User already has an active membership"
      });
    }

    // Calculate expiry date
    const days = plan.durationInMonths;

    const startDate = new Date();

    const endDate = new Date();
endDate.setMonth(
  startDate.getMonth() + plan.durationInMonths
);
    // Create membership
    const membership = new Membership({
      user: userId,
      plan: planId,
      startDate,
      endDate,
      status: "active",
      paymentStatus: "paid"
    });

    await membership.save();

    // Populate response
    const populatedMembership = await Membership.findById(membership._id)
      .populate("user", "name email")
      .populate("plan", "name durationInMonths price");

    return res.status(201).json({
      msg: "Membership created successfully",
      membership: populatedMembership
    });

  } catch (error) {

    console.error("Error creating membership", error);

    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};

exports.getMembership = async (req, res) => {

  try {

    await exports.expireMemberships();

    const populatedMembership = await Membership.find()
      .populate("user", "name email")
      .populate("plan", "name durationInMonths price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      membership: populatedMembership
    });

  } catch (error) {

    console.error("Error fetching memberships", error);

    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};

exports.expireMemberships = async () => {

  try {

    const activeMemberships = await Membership.find({
      status: "active"
    });

    for (const membership of activeMemberships) {

      if (membership.endDate < Date.now()) {

        membership.status = "expired";

        await membership.save();
      }
    }

    console.log("Expired memberships updated");

  } catch (error) {

    console.error("Error expiring memberships", error);

    throw error;
  }
};

exports.cancelMembership = async (req, res) => {

  try {

    const { membershipId } = req.params;

    const membership = await Membership.findById(membershipId);

    if (!membership) {
      return res.status(404).json({
        msg: "Membership not found"
      });
    }

    membership.status = "cancelled";

    await membership.save();

    return res.status(200).json({
      msg: "Membership cancelled successfully"
    });

  } catch (error) {

    console.error("Error cancelling membership", error);

    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};
exports.reactivateMembership = async (req, res) => {

  try {

    const { membershipId } = req.params;

    const membership = await Membership.findById(membershipId);

    if (!membership) {

      return res.status(404).json({
        msg: "Membership not found"
      });
    }

    if (membership.status !== "cancelled") {

      return res.status(400).json({
        msg: "Only cancelled memberships can be reactivated"
      });
    }

    membership.status = "active";

    await membership.save();

    return res.status(200).json({
      msg: "Membership reactivated successfully"
    });

  } catch (error) {

    console.error("Error reactivating membership", error);

    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};