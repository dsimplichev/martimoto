const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.post("/create", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Поръчката е запазена успешно!" });
  } catch (error) {
    res.status(500).json({ error: "Грешка при запис на поръчката!" });
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

module.exports = router;