const mongoose = require("mongoose");

const matsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  material: { type: String, required: true }, 
  color: { type: String, required: true },
  carBrand: { type: String, required: true },
  carModel: { type: String, required: true },
  carYear: { type: String, required: false },
  description: { type: String },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  itemType: { type: String, default: "mat" },
  createdAt: { type: Date, default: Date.now }
});

const Mats = mongoose.model("Mats", matsSchema);
module.exports = Mats;