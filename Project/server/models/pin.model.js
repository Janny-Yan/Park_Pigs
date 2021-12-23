const  mongoose = require("mongoose");


const PinSchema = new mongoose.Schema(
    {  
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },

        location: {
            type: String,
            required: [true, "A location of vehicle parked must be provided"],
            minLength: [ 4, "location parked should have a city and state, with at least 4 characters", ],
        },

        time: {
            type: String,
            required: [true, "A time stamp of parked vehicle must be provided"],
        },

        vehiclemake: {
            type: String,
            required: [true, "Vehicle make must be provided"]
        },
    
        color: {
            type: String,
            required: [true, "Color of vehicle must be provided"]
        },
    },

    { timestamps: true },
);

const Pin = mongoose.model("Pin", PinSchema);

module.exports = Pin;