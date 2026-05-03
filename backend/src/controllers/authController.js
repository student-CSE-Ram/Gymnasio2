const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const sendMail = require('../utils/sendMail');
const { resetPasswordTemplate } = require("../utils/emailTemplates");
const { securityAlertTemplate } = require("../utils/emailTemplates");
const hashPassword = require('../utils/hashedPassword');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.jwtsecretkey,
    { expiresIn: "5h" }
  );
};


exports.Ownerlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find owner
    const user = await User.findOne({ email, role: "owner" });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT
    const token = generateToken(user);

    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({ msg: "Invalid credentials" })
    }

    const token = generateToken(user);

    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Error logging in", error);
    return res.status(500).json({ msg: "Cannot logged in, Internal server error." })
  }
}
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();

const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
    await sendMail({
      to: user.email,
      subject: "Reset Your Password",
      html: resetPasswordTemplate(resetUrl),
    });

    return res.status(200).json({ msg: "Password reset link sent to email" });

  } catch (error) {
    console.error("Error logging in", error);
    return res.status(500).json({ msg: "Cannot logged in, Internal server error." })
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ msg: "Token and Password required" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid or expired token",
      });
    }

    // ✅ ALWAYS hash here (no pre-save dependency)
    const newHashedPassword = await hashPassword(password);

    await User.findByIdAndUpdate(user._id, {
      password: newHashedPassword,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    });

    // ✅ optional but correct
    await sendMail({
      to: user.email,
      subject: "Password Changed Successfully",
      html: securityAlertTemplate(),
    });

    return res.status(200).json({
      msg: "Password reset successful",
    });

  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};