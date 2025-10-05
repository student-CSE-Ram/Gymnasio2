 const Membership = require('../models/Membership')
 const Plan = require('../models/Plan');
 const User = require('../models/User');

 exports.createMembership = async (req,res) =>{
    try {
        const {planId, userId,username} = req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({msg:"User not found"})
        }
        if (user.name !== username) {
            return res.status(400).json({msg:"Username does not match the userid"})
        }

        const  plan = await Plan.findById(planId);
        if (!plan) {
            return res.status(404).json({msg: "Plan not found"});
        }

    const days = parseInt(plan.duration);  
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    const membership = new Membership({
      user: userId,
      plan: planId,
      username:username,
      endDate
    });
    await membership.save();
    return res.status(201).json({ msg: "Membership created", membership });
    } catch (error) {
        console.error("Error creating membership",error);
        return res.status(500).json({msg: "Cannot create membership plan"})
    }
 }
