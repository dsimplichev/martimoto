const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  deliveryMethod: { type: String, required: true },
  city: { type: String, required: true },
  office: { type: String, required: true },
  companyName: { type: String },
  companyReg: { type: String },
  companyEIK: { type: String },
  companyAddress: { type: String },
  comment: { type: String },
  cart: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);