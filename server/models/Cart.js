const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
     
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    itemType: {
        type: String, 
        required: true,
        enum: ['part', 'accessory', 'tire', 'oil', "wiperFluid", 'mat']
    },
    
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);