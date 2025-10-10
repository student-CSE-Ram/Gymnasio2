const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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


exports.userLogin = async (req,res) =>{
  try {
    const {email ,password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({msg: "User not found"});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) {
      return res.status(403).json({msg:"Invalid credentials"})
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
    console.error("Error logging in",error);
    return res.status(500).json({msg:"Cannot logged in, Internal server error."})
  }
}