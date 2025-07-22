const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // *** Важно: Премахваме 'ref' тук! ***
        // ref: 'Accessory', // <-- Това се премахва!
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    itemType: { // <--- НОВО ПОЛЕ!
        type: String, // Ще съхранява 'part' или 'accessory'
        required: true,
        enum: ['part', 'accessory']
    },
    // Можеш да добавиш и директни полета, за да избегнеш populate на GET заявка
    // title: { type: String, required: true },
    // price: { type: Number, required: true },
    // image: { type: String, required: false },
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