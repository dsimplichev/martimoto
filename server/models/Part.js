const mongoose = require('mongoose');

// Схема за частите
const partSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  cylinder: { type: String, required: true },
  year: { type: String, required: true },
  img: { type: String, required: true }, 
}, { timestamps: true });


const Part = mongoose.model('Part', partSchema);


module.exports = Part;