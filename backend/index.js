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
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

connectDB();

app.use(cors({
     origin: "http://localhost:5173", 
     credentials: true,
}))

app.use('/api/auth',authUser);
app.use('/api/ownerwork',userroutes);

app.use('/api/plan',planRoutes)
app.use('/api/membership',membershipRoute)

app.use('/api/class',classRoutes)
app.use('/api/progress',progressRoutes)



app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})