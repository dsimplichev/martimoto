const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
})

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;