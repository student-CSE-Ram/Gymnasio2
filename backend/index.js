const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
app.use(express.json());

app.get('/' ,(req,res) =>{
    console.log("hello there!");
    res.send("Hello there again!")
})

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})