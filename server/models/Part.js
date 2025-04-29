const mongoose = require('mongoose');


const partSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: false },
  images: { type: Array, required: false }, 
}, { timestamps: true });


const Part = mongoose.model('Part', partSchema);


module.exports = Part;