const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["lost", "found"],
        required: true
    },

    status: {
        type: String,
        enum: ["open", "resolved"],
        default: "open"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Item", itemSchema)