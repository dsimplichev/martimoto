const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const checkAuth = require("../middleware/authMiddleware");
const Part = require("../models/Part");
const Accessory = require("../models/Accessory");

router.get("/:userId", checkAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate({
      path: "items.productId",

      model: "Part",
    });

    if (!cart) {
      return res.status(404).json({ message: "Количката не е намерена." });
    }

    const populatedItems = cart.items
      .map((item) => {
        if (item.productId) {
          const imageUrl =
            item.productId.images && item.productId.images.length > 0
              ? item.productId.images[0]
              : null;

          if (!imageUrl) {
          }

          return {
            _id: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            image: imageUrl,
            quantity: item.quantity,
          };
        }

        return null;
      })
      .filter((item) => item !== null);

    res.json({ items: populatedItems });
  } catch (error) {
    res.status(500).json({ message: "Грешка при зареждане на количката." });
  }
});

router.post("/:userId", checkAuth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      cart = new Cart({ userId: userId, items: [] });
    } else {
    }

    const existingProduct = cart.items.find(
      (item) => item.productId.toString() === productId
    );
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

module.exports = router;
