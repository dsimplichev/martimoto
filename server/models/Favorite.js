const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, 
  partId: { type: String, required: true },    
  title: String,
  price: Number,
  image: String
});

module.exports = mongoose.model('Favorite', favoriteSchema);