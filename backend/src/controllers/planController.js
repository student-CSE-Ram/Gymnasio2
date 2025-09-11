const Plan = require('../models/Plan');

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
        const {id} = req.params;

        const {name , price, duration ,features} = req.body;

        const updatedPlan = await Plan.findByIdAndUpdate(
            id,
            {name, price, duration, features},
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
