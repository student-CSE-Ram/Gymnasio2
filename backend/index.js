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
    "http://localhost:5173",              // local dev
    "https://gymnasio-one.vercel.app"     // live frontend
];

app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin (like Postman)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
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