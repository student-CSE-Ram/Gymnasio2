const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
  
});

console.log("RAZORPAY KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY SECRET:", process.env.RAZORPAY_KEY_SECRET);

module.exports = razorpayInstance;