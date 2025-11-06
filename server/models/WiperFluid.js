const mongoose = require("mongoose");

const wiperFluidSchema = new mongoose.Schema({
  title: { type: String, required: true },
  volume: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  itemType: { type: String, default: "wiperFluid" },
  createdAt: { type: Date, default: Date.now }
});

const WiperFluid = mongoose.model("WiperFluid", wiperFluidSchema);
module.exports = WiperFluid;