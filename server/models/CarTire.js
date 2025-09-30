const mongoose = require('mongoose');

const carTireSchema = new mongoose.Schema({
    
 
    brand: { type: String, required: true },
    model: { type: String },
    width: { type: Number, required: true },
    aspectRatio: { type: Number, required: true },
    diameter: { type: String, required: true },
    loadIndex: { type: String, required: true },
    speedRating: { type: String, required: true },
    fuelEconomy: { type: String, required: true }, 
    wetGrip: { type: String, required: true },     
    noiseLevel: { type: Number, required: true },  
    season: { type: String, required: true, enum: ['Летни', 'Зимни', 'Всесезонни'] },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('CarTire', carTireSchema);