const Plan = require('../models/Plan');
const Payment = require("../models/Payment");
const Membership = require("../models/Membership");

exports.createPlan = async (req,res) =>{
    try {
        const {name, price,durationInMonths , features} = req.body;

        const existingPlan = await Plan.findOne({name});
        
        if (existingPlan) {
            return res.status(400).json({msg:"Plan already exist"})
        }

        const newPlan = new Plan({
            name:name,
            price:price,
            durationInMonths,
            features
        })

        await newPlan.save();

        return res.status(201).json({msg:"plan created successfully",
            plan:newPlan
        })
    } catch (error) {
        console.error("Error creating plan",error);
        return res.status(500).json({msg: "Plan is not created"})
    }
}

    exports.getAllPlans = async (req,res) =>{
        try {
            const plans = await Plan.find();

            return res.status(200).json({plans})
        } catch (error) {
            console.error("Error getting plans",error);
            return res.status(500).json({msg:"Cannot get the plans"});
        }
    }

exports.updatePlan = async (req,res) =>{
    try {
        const {name} = req.params;

        const { price, durationInMonths ,features} = req.body;

        const updatedPlan = await Plan.findOneAndUpdate(
            {name :name},
            {price, durationInMonths, features},
            {new: true}
        );

        if (!updatedPlan) {
            return res.status(404).json({msg:"Cannot find the plan"});
        }

        return res.status(200).json({msg:"plan updated successfully",
            plan:updatedPlan
        });
    } catch (error) {
        console.error("Error updating plan",error);
        return res.status(500).json({msg:"Cannot update the plan"})
    }
}

exports.deletePlanByName =async (req,res) =>{
    try {
        const {name} = req.params;

        const delPlan = await Plan.findOneAndDelete({name});

        if (!delPlan) {
            return res.status(404).json({msg:"Plan not found"})
        }

        return res.status(200).json({msg: "Plan deleted successfully",
            plan:delPlan
        })
    } catch (error) {
        console.error("Error deleteing plan",error);
        return res.status(500).json({msg: "Cannot delete the plan"})
    }
}

exports.deletePlanById = async (req,res) =>{
    try {
        const {id} = req.params;

        const delPlan = await Plan.findByIdAndDelete(id);

        if (!delPlan) {
            return res.status(404).json({msg: "Plan not found"})
        }

        return res.status(200).json({msg: "Plan deleted successfully",
            plan:delPlan
        })
    } catch (error) {
        console.error("Cannot delete the plan by id",error);
        return res.status(500).json({msg: "Cannot delete the plan"})
    }
}


exports.getMyPlans = async (req, res) => {

  try {

    const userId = req.user.id;

    const memberships = await Membership.find({
      user: userId
    })
    .populate("plan")
    .sort({ startDate: -1 });

    const plans = memberships.map((membership) => {

      const plan = membership.plan;

      if (!plan) return null;

      return {

        _id: membership._id,

        planId: plan._id,

        name: plan.name,

        price: plan.price,

        duration: plan.durationInMonths,

        start: membership.startDate,

        end: membership.endDate,

        status: membership.status,

        paymentStatus: membership.paymentStatus
      };
    }).filter(Boolean);

    return res.status(200).json({
      plans
    });

  } catch (error) {

    console.error("Error fetching memberships:", error);

    return res.status(500).json({
      msg: "Failed to fetch memberships"
    });
  }
};