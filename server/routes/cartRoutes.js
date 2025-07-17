const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); 
const { checkAuth } = require('../middleware/authMiddleware'); 


router.get('/:userId', checkAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "Количката не е намерена." });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Грешка при зареждане на количката." });
  }
});

router.post('/:userId', checkAuth, async (req, res) => {
    try {
      const { productId, quantity } = req.body; 
      let cart = await Cart.findOne({ userId: req.params.userId });
  
      if (!cart) {
        cart = new Cart({ userId: req.params.userId, items: [] });
      }
  
      const existingProduct = cart.items.find(item => item.productId.toString() === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity || 1;  
      } else {
        cart.items.push({ productId, quantity: quantity || 1 });  
      }
  
      await cart.save();
      res.json({ items: cart.items });
    } catch (error) {
      res.status(500).json({ message: "Грешка при добавяне на продукт." });
    }
  });

  router.delete('/:userId/product/:productId', checkAuth, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Количката не е намерена." });
      }
  
      cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
      await cart.save();
  
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Грешка при премахване на продукт." });
    }
});

module.exports = router;