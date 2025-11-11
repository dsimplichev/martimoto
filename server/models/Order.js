const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  deliveryMethod: { type: String, required: false },
  city: { type: String, required: false },
  office: { type: String, required: false },
  deliveryAddress: { type: String, required: false },
  companyName: { type: String, required: false },
  companyReg: { type: String, required: false },
  companyEIK: { type: String, required: false },
  companyAddress: { type: String, required: false },
  comment: { type: String, required: false },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      itemType: { 
        type: String, 
        enum: ['part', 'accessory', 'tire', 'oil', 'wiperFluid', 'mat'], 
        required: true 
      },
      quantity: { type: Number, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: false },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  statusHistory: [
    {
      status: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);