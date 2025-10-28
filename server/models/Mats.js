const mongoose = require("mongoose");

const matsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  material: { type: String, required: true }, 
  color: { type: String, required: true },
  carBrand: { type: String, required: true },
  carModel: { type: String, required: true },
  carYear: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const Mats = mongoose.model("Mats", matsSchema);
module.exports = Mats;