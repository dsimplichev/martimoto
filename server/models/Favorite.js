const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
  title: String,
  price: Number,
  image: String
});

module.exports = mongoose.model('Favorite', favoriteSchema);