const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  deliveryMethod: { type: String, required: false },
  city: { type: String, required: false },
  office: { type: String, required: false },
  companyName: { type: String, required: false },
  companyReg: { type: String, required: false },
  companyEIK: { type: String, required: false },
  companyAddress: { type: String, required: false },
  comment: { type: String, required: false },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" }, 
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;