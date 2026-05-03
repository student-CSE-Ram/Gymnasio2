const express = require("express");
const router = express.Router();
const { Ownerlogin, userLogin , forgotPassword,resetPassword} = require("../controllers/authController");

// route for owner login
router.post("/owner/login", Ownerlogin);

router.post("/login", userLogin);

//Forgot password (send email)
router.post("/forgot-password", forgotPassword);

//  Reset password (with token)
router.post("/reset-password", resetPassword);

module.exports = router;
