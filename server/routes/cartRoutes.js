const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const checkAuth = require("../middleware/authMiddleware");
const Part = require("../models/Part");
const Accessory = require("../models/Accessory");

router.get("/:userId", checkAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: "Количката не е намерена." });
    }

    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        let productData = null;

        if (item.itemType === "part") {
          productData = await Part.findById(item.productId);
        } else if (item.itemType === "accessory") {
          productData = await Accessory.findById(item.productId);
        }

        if (!productData) return null;

        const imageUrl =
          productData.images && productData.images.length > 0
            ? productData.images[0]
            : null;

        return {
          _id: productData._id,
          title: productData.title,
          price: productData.price,
          image: imageUrl,
          quantity: item.quantity,
          itemType: item.itemType,
        };
      })
    );

    res.json({ items: populatedItems.filter((item) => item !== null) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Грешка при зареждане на количката." });
  }
});

router.post("/:userId", checkAuth, async (req, res) => {
  try {
    const { productId, quantity } = req.body; // itemType НЕ се взима от req.body вече
    const userId = req.params.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    let productDetails;
    let determinedItemType; // Определяме го на бекенда

    // 1. Опитваме се да намерим продукта като ЧАСТ
    productDetails = await Part.findById(productId);
    if (productDetails) {
      determinedItemType = "part";
    } else {
      // 2. Ако не е част, опитваме се да намерим продукта като АКСЕСОАР
      productDetails = await Accessory.findById(productId);
      if (productDetails) {
        determinedItemType = "accessory";
      }
    }

    if (!productDetails) {
      return res.status(404).json({ message: "Продуктът не е намерен в базата данни." });
    }

    const existingProduct = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.itemType === determinedItemType // Сравняваме с определен от бекенда тип
    );

    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.items.push({ productId, quantity: quantity || 1, itemType: determinedItemType }); // Използваме определен от бекенда тип
    }

    await cart.save();
    res.status(200).json({ message: "Продуктът е добавен успешно." });

  } catch (error) {
    console.error("Грешка при добавяне на продукт:", error);
    res.status(500).json({ message: "Грешка при добавяне на продукт." });
  }
});

router.delete("/:userId/:productId", checkAuth, async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Количката не е намерена." });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({ message: "Продуктът е премахнат от количката." });
  } catch (error) {
    res.status(500).json({ message: "Грешка при премахване на продукт." });
  }
});

module.exports = router;
