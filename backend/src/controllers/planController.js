const Plan = require('../models/Plan');
const Payment = require("../models/Payment");

exports.createPlan = async (req,res) =>{
    try {
        const {name, price,duration , features} = req.body;

        const existingPlan = await Plan.findOne({name});
        
        if (existingPlan) {
            return res.status(400).json({msg:"Plan already exist"})
        }

        const newPlan = new Plan({
            name:name,
            price:price,
            duration,
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

        const { price, duration ,features} = req.body;

        const updatedPlan = await Plan.findOneAndUpdate(
            {name :name},
            {price, duration, features},
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

    // Fetch only successful payments
    const payments = await Payment.find({
      userId,
      status: "paid",
    })
      .populate("planId")
      .sort({ createdAt: -1 });

    const plans = payments.map((payment) => {
      const plan = payment.planId;

      if (!plan) return null;

      // Start date = when payment succeeded
      const startDate = payment.paidAt || payment.createdAt;

      // duration is STRING → convert safely
      const durationInMonths = Number(plan.duration);

      if (isNaN(durationInMonths)) {
        throw new Error(`Invalid duration for plan ${plan.name}`);
      }

      // Calculate end date
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + durationInMonths);

      const isActive = new Date() <= endDate;

      return {
        paymentId: payment._id,
        planId: plan._id,
        name: plan.name,
        price: `₹${payment.amount / 100}`,
        start: startDate,
        end: endDate,
        status: isActive ? "Active" : "Expired",
      };
    }).filter(Boolean);

    return res.status(200).json({ plans });
  } catch (error) {
    console.error("Error fetching my plans:", error);
    return res.status(500).json({ msg: "Failed to fetch plans" });
  }
};
