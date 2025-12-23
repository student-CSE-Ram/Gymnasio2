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
        const {name,email,phone,specialization,password} = req.body;

        const existingTrainer = await User.findOne({email});

        if (existingTrainer) {
            return res.status(400).json({msg:"Trainer already exist"})
        }

        // const hashedPassword = await bcrypt.hash(password,10);

        const newTrainer = new User({
            name: name,
            email:email,
            password:password,
            phone:phone,
            specialization:specialization,
            role:"trainer"
        });
         await newTrainer.save();
           
         return res.status(201).json({msg:"Trainer Created Sucessfully",
          user: {
            id: newTrainer._id,
            name: newTrainer.name,
            email: newTrainer.email,
            specialization: newTrainer.specialization,
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

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "trainer") {
    return res.status(400).json({ message: "Only trainers can be deleted here" });
  }

  await user.deleteOne();

  res.json({ message: "Trainer deleted successfully" });
};

exports.assignMemberToTrainer = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { userId, trainerUserId } = req.body;

    const member = await User.findById(userId);
    if (!member || member.role !== "member") {
      return res.status(400).json({ message: "User is not a member" });
    }

    const trainer = await User.findById(trainerUserId);
    if (!trainer || trainer.role !== "trainer") {
      return res.status(400).json({ message: "User is not a trainer" });
    }

    member.assignedTrainer = trainer._id;
    await member.save();

    res.json({ message: "Member assigned to trainer" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getTrainerMembers = async (req, res) => {
  if (req.user.role !== "trainer") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const members = await User.find({
    role: "member",
    assignedTrainer: req.user.id,
  });

  res.json(members);
};

