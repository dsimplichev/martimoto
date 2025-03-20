const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.post("/create", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, deliveryMethod, city, office, companyName, companyReg, companyEIK, companyAddress, comment, cart, totalAmount } = req.body;
    
    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Количката не може да бъде празна." });
    }

    const newOrder = new Order({
      firstName, lastName, email, phone, deliveryMethod, city, office, companyName, companyReg, companyEIK, companyAddress, comment, cart, totalAmount,
      status: "Pending" 
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Грешка при създаване на поръчката:", error);
    res.status(500).json({ message: "Грешка при създаване на поръчката." });
  }
});


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Грешка при зареждане на поръчките!" });
  }
});


router.get('/pending', async (req, res) => {
  try {
    const orders = await Order.find({ status: "Pending" });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Грешка при извличането на поръчките." });
  }
});


router.patch('/update/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error('Грешка при актуализиране на поръчката:', error);
    res.status(500).json({ message: 'Грешка при актуализиране на поръчката.' });
  }
});


router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  
  try {
      const order = await Order.findById(orderId)
      .populate("cart.productId", "title image");
     
      if (!order) {
          return res.status(404).json({ message: "Поръчката не е намерена" });
      }
      res.json(order);
  } catch (error) {
      res.status(500).json({ message: "Грешка при търсене на поръчката" });
  }
});

module.exports = router;