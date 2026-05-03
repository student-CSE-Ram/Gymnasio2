const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["owner", "trainer", "member"],
      default: "member",
    },
    // Trainer-only fields
    phone: {
      type: String,
      required: function () {
        return this.role === "trainer";
      },
    },
    specialization: {
      type: String,
      required: function () {
        return this.role === "trainer";
      },
    },
    assignedTrainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
