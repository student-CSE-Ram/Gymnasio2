const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },

    price: {
        type:Number,
        required : true
    },

    durationInMonths: {
        type:Number,
        required: true
    },

    dailyCheckinLimit: {
        type: Number,
        required: true,
        default: 1
    },

    features: {
        type: [String],
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Plan",planSchema);