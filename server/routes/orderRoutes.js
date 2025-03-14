const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.post("/create", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
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
    res.status(500).json({ error: "Грешка при зареждане на поръчките!" });
  }
});

router.get('/pending', async (req, res) => {
  try {
      const orders = await Order.find({ status: "Pending" }); // Или друг статус, ако имаш
      res.json(orders);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Грешка при извличането на поръчките." });
  }
});

module.exports = router;