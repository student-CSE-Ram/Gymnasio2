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


app.use(cors({
  origin: (origin, callback) => {
    console.log("Incoming origin:", origin); // 👈 DEBUG FIRST

    // allow Postman / curl / same-origin
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.0.0", // placeholder, won't match directly
    ];

    // 🔥 allow ANY local network IP (this is your real problem solver)
    const isLocalNetwork =
      origin.startsWith("http://192.168.") ||
      origin.startsWith("http://10.") ||
      origin.startsWith("http://172.");

    if (allowedOrigins.includes(origin) || isLocalNetwork) {
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
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