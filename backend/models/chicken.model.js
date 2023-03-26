const mongoose = require("mongoose");

const chickenSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        birthday: {
            type: Date,
        },
        weight: {
            type: Number,
            required: true,
        },
        steps: {
            type: Number,
            default: 0,
        },
        isRunning: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("chicken", chickenSchema);