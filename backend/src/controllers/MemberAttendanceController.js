const MemberAttendance = require("../models/MemberAttendance");
const Membership = require("../models/Membership");
const User = require("../models/User");

exports.scanAttendance = async (req, res) => {
  try {
    const { memberId } = req.body;

    if (!memberId) {
      return res.status(400).json({
        msg: "Member ID is required",
      });
    }

    // Verify member exists
    const member = await User.findById(memberId);

    if (!member) {
      return res.status(404).json({
        msg: "Member not found",
      });
    }

    if (member.role !== "member") {
      return res.status(400).json({
        msg: "Attendance can only be marked for members",
      });
    }

    // Verify active membership
    const membership = await Membership.findOne({
      user: memberId,
      status: "active",
      paymentStatus: "paid",
      endDate: { $gte: new Date() },
    }).populate("plan");

    if (!membership) {
      return res.status(400).json({
        msg: "No active membership found",
      });
    }

    // Check if member currently has an active session
    const activeAttendance = await MemberAttendance.findOne({
      memberId,
      checkOutTime: null,
    });

    // =====================================================
    // CHECK OUT
    // =====================================================
    if (activeAttendance) {
      const now = new Date();

      const minutesSpent =
        (now - activeAttendance.checkInTime) / (1000 * 60);

      // Prevent accidental double scan
      if (minutesSpent < 15) {
        return res.status(400).json({
          msg: "Cannot checkout before 15 minutes",
        });
      }

      activeAttendance.checkOutTime = now;

      await activeAttendance.save();

      return res.status(200).json({
        success: true,
        action: "checkout",
        msg: "Check-out successful",
        memberName: member.name,
        attendance: activeAttendance,
      });
    }

    // =====================================================
    // CHECK IN
    // =====================================================

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAttendanceCount =
      await MemberAttendance.countDocuments({
        memberId,
        attendanceDate: today,
      });

    const dailyLimit =
      membership.plan.dailyCheckinLimit;

    if (
      dailyLimit !== -1 &&
      todayAttendanceCount >= dailyLimit
    ) {
      return res.status(400).json({
        msg: "Daily check-in limit reached for your plan",
      });
    }

    const attendance =
      await MemberAttendance.create({
        memberId,
        membershipId: membership._id,
      });

    return res.status(201).json({
      success: true,
      action: "checkin",
      msg: "Check-in successful",
      memberName: member.name,
      attendance,
    });

  } catch (error) {
    console.error("Attendance Scan Error:", error);

    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
exports.getAttendanceStats = async (req, res) => {
  try {

    const memberId = req.user._id;

    const totalVisits =
      await MemberAttendance.countDocuments({
        memberId
      });

    const lastAttendance =
      await MemberAttendance.findOne({
        memberId
      })
      .sort({ createdAt: -1 });

    const activeSession =
      await MemberAttendance.findOne({
        memberId,
        checkOutTime: null
      });

    return res.status(200).json({
      totalVisits,

      lastVisit:
        lastAttendance?.attendanceDate || null,

      currentStatus:
        activeSession
          ? "Checked In"
          : "Checked Out"
    });

  } catch (error) {

    console.error(
      "Error fetching attendance stats",
      error
    );

    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};