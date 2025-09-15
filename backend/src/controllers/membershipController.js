 const Membership = require('../models/Membership')
 const Plan = require('../models/Plan');

 exports.createMembership = async (req,res) =>{
    try {
        const {planId, userId} = req.body;

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
      endDate
    });
    await membership.save();
    return res.status(201).json({ msg: "Membership created", membership });
    } catch (error) {
        console.error("Error creating membership",error);
        return res.status(500).json({msg: "Cannot create membership plan"})
    }
 }
