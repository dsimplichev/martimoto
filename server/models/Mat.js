const mongoose = require("mongoose");

const matSchema = new mongoose.Schema({
  title: { type: String, required: true },
  material: { 
    type: String, 
    required: true, 
    enum: ["Мокетни", "Гумени", "Универсални"] 
  },
  color: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const Mat = mongoose.model("Mat", matSchema);
module.exports = Mat;