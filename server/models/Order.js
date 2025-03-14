const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  deliveryMethod: String,
  city: String,
  office: String,
  companyName: String,
  companyReg: String,
  companyEIK: String,
  companyAddress: String,
  comment: String,
  cart: [
    {
      title: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  totalAmount: Number,
  status: { type: String, default: "Очаква обработка" }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);