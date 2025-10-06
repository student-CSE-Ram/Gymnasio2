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

        // const hashedPassword = await bcrypt.hash(password,10);

        const newMember = new User({
            name: name,
            email:email,
            password:password,
            role:"member"
        });
         await newMember.save();
           
         return res.status(201).json({msg:"Member created successfully",
          user: {
                id: newMember._id,
                name: newMember.name,
                email: newMember.email,
                role: newMember.role,
            },
         })

    } catch (error) {
        console.log(`The member can not be created`,error);
        res.status(500).json({msg:"Internal server error"})
    }
}

exports.getAllMember = async (req,res) =>{
    try {
        const members = await User.find({role :"member"}).select("-password");
        return res.status(200).json({members})
    } catch (error) {
        console.log("Error geting the members",error);
        return res.status(500).json({msg:"Cannot get the members"})
    }
}

exports.createTrainer=async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        const existingTrainer = await User.findOne({email});

        if (existingTrainer) {
            return res.status(400).json({msg:"Trainer already exist"})
        }

        // const hashedPassword = await bcrypt.hash(password,10);

        const newTrainer = new User({
            name: name,
            email:email,
            password:password,
            role:"trainer"
        });
         await newTrainer.save();
           
         return res.status(201).json({msg:"Trainer Created Sucessfully",
          user: {
            id: newTrainer._id,
            name: newTrainer.name,
            email: newTrainer.email,
            role: newTrainer.role,
             },
         })

    } catch (error) {
        console.log(`The trainer can not be created `,error);
        res.status(500).json({msg:"Internal server error"})
    }
}

exports.getAlltrainer = async(req,res) =>{
    try {
        const trainers = await User.find({role:"trainer"}).select("-password");
        return res.status(200).json({trainers});
    } catch(error){
        console.log("Error getting trainers",error);
        return res.status(500).json({msg:"Cannot get the trainers"})
    }
}

exports.deleteUser = async (req,res) =>{
    try {
        const {email,role} = req.body;

        const user = await User.findOneAndDelete({email,role});

        if (!user) {
            return res.status(404).json({
                msg:"User not found"
            })
        }

        return res.status(200).json({msg:`${role} deleted successfully`,
            id:user._id,
            name:user.name,
            email:user.email
        })
    } catch (error) {
        console.log(`Error deleting ${role}`,error);
        return res.status(500).json({msg:`Cannot delete the ${role}`})
        
    }
}

