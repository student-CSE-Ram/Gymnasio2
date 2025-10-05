require('dotenv').config();
const User = require('../models/User');
const connectDB = require('./db');

const seedOwner = async () => {
  try {
    await connectDB();

    // Delete old owner if exists
    await User.deleteOne({ role: "owner" });

    // Create owner with plain password
    const owner = new User({
      name: "Nitesh",
      email: "muskd89@gmail.com",
      password: "DonaldMusk89@", // plain password
      role: "owner",
    });

    await owner.save(); // pre('save') will hash the password automatically

    console.log("✅ Owner created:", owner.email);
    process.exit(0);
  } catch (error) {
    console.log("❌ Error creating owner:", error);
    process.exit(1);
  }
};

seedOwner();
