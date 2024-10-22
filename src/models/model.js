const mongoose = require('mongoose')

const genSchema = new mongoose.Schema(
    {
        genId: {
            type: String,
            default: 0,
        },
        stakedBal: {
            type: Number,
            default: 0,
        },
        availBal: {
            type: Number,
            default: 0,
        },
        rewards: {
            type: Number,
            default: 0,
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
);

const Gen = mongoose.model("Gen", genSchema);
module.exports = Gen;