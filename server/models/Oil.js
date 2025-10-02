const mongoose = require('mongoose');

const oilSchema = new mongoose.Schema({
    vehicleType: { type: String, required: true },
    oilCategory: { type: String, required: true },
    brand: { type: String, required: true },
    viscosity: { type: String, required: true },
    type: { type: String, required: true },
    volume: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] }, 
}, { timestamps: true });

module.exports = mongoose.model('Oil', oilSchema);