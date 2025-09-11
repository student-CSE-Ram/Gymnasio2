require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const userroutes = require('./src/routes/user')
const authUser = require('./src/routes/auth')
const planRoutes = require('./src/routes/plan')
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

connectDB();

app.use('/api/auth',authUser);
app.use('/api/owner',userroutes);

app.use('/api/plan',planRoutes)

app.get('/' ,(req,res) =>{
    console.log("hello there!");
    res.send("Hello there again!")
})

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})