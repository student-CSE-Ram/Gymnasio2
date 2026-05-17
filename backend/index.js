require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const cors = require('cors')
const userroutes = require('./src/routes/user')
const authUser = require('./src/routes/auth')
const planRoutes = require('./src/routes/plan')
const membershipRoute = require('./src/routes/membershipRoute')
const classRoutes = require('./src/routes/classRoutes')
const progressRoutes = require('./src/routes/progressRoutes')
const attendanceRoutes = require("./src/routes/Attendance")
const paymentRoutes = require("./src/routes/payment");
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://gymnasio-one.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {

    // Allow requests with no origin
    // (Postman, mobile apps, curl, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    // Normalize origin
    const normalizedOrigin = origin.trim().replace(/\/$/, "");

    // Allow local network testing
    const isLocalNetwork =
      /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/.test(normalizedOrigin) ||
      /^http:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/.test(normalizedOrigin) ||
      /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+(:\d+)?$/.test(normalizedOrigin);

    if (
      allowedOrigins.includes(normalizedOrigin) ||
      isLocalNetwork
    ) {
      console.log("✅ Allowed Origin:", normalizedOrigin);
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", normalizedOrigin);

    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
}));


app.use(express.json());

connectDB();


app.use('/api/auth',authUser);
app.use('/api/ownerwork',userroutes);

app.use('/api/plan',planRoutes)
app.use('/api/membership',membershipRoute)

app.use('/api/class',classRoutes)
app.use('/api/progress',progressRoutes)

app.use("/api/attendance", attendanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/training-sessions", require("./src/routes/trainingRoutes"));

app.use("/api/owner-dashboard", require("./src/routes/ownerDashboard"));





app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})