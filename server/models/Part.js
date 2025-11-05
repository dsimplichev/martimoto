const mongoose = require('mongoose');


const partSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: false },
  images: { type: Array, required: false }, 
  type: { type: String, default: "part" },
  isSold: { type: Boolean, default: false } 
}, { timestamps: true });

partSchema.index({ brand: 1, model: 1, year: 1 });
const Part = mongoose.model('Part', partSchema);


module.exports = Part;