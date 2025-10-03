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

    duration: {
        type:String,
        required: true
    },
    features: {
        type: [String],   // array of strings
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Plan",planSchema)