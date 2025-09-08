const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createMember=async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        const existingMember = await User.findOne({email});

        if (existingMember) {
            return res.status(400).json({msg:"User already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newMember = new User({
            name: name,
            email:email,
            password:hashedPassword,
            role:"member"
        });
         await newMember.save();
           
         return res.status(201).json({msg:"User Created Sucessfully",
            Id : newMember._id
         })

    } catch (error) {
        console.log("The user can not be created",error);
        res.status(500).json({msg:"Internal server error"})
    }
}

exports.createTrainer=async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        const existingTrainer = await User.findOne({email});

        if (existingTrainer) {
            return res.status(400).json({msg:"Trainer already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newTrainer = new User({
            name: name,
            email:email,
            password:hashedPassword,
            role:"trainer"
        });
         await newTrainer.save();
           
         return res.status(201).json({msg:"Trainer Created Sucessfully",
            Id : newTrainer._id
         })

    } catch (error) {
        console.log("The trainer can not be created",error);
        res.status(500).json({msg:"Internal server error"})
    }
}

