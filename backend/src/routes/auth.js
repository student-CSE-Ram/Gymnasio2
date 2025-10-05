const express = require("express");
const router = express.Router();
const { Ownerlogin, userLogin } = require("../controllers/authController");

// route for owner login
router.post("/owner/login", Ownerlogin);

// route for member/trainer login
router.post("/login", userLogin);

module.exports = router;
