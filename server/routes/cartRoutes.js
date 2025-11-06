const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const checkAuth = require("../middleware/authMiddleware");
const Part = require("../models/Part");
const Accessory = require("../models/Accessory");
const Tire = require("../models/CarTire");
const Oil = require("../models/Oil");
const WiperFluid = require("../models/WiperFluid");

router.get("/:userId", checkAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Количката не е намерена." });

    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        let productData = null;

        if (item.itemType === "part") productData = await Part.findById(item.productId);
        else if (item.itemType === "accessory") productData = await Accessory.findById(item.productId);
        else if (item.itemType === "tire") productData = await Tire.findById(item.productId);
        else if (item.itemType === "oil") productData = await Oil.findById(item.productId);
        else if (item.itemType === "wiperFluid") {
          productData = await WiperFluid.findById(item.productId);

        }

        if (!productData) return null;


        const clean = productData.toObject();


        const title = clean.title ||
          (clean.brand && clean.model ? `${clean.brand} ${clean.model}` :
            clean.brand && clean.viscosity ? `${clean.brand} ${clean.viscosity} ${clean.volume}` :
              `Продукт ${clean._id}`);

        const image = clean.images?.[0] || null;

        return {
          _id: clean._id,
          title,
          price: clean.price,
          image,
          quantity: item.quantity,
          itemType: item.itemType,
        };
      })
    );

    res.json({ items: populatedItems.filter(Boolean) });
  } catch (error) {
    console.error("Грешка при зареждане на количката:", error);
    res.status(500).json({ message: "Грешка при зареждане на количката." });
  }
});

router.post("/:userId", checkAuth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;

    if (!productId) {
      return res.status(400).json({ message: "Липсва productId." });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    let productDetails = null;
    let determinedItemType = null;


    productDetails = await Part.findById(productId);
    if (productDetails) determinedItemType = "part";

    if (!productDetails) {
      productDetails = await Accessory.findById(productId);
      if (productDetails) determinedItemType = "accessory";
    }

    if (!productDetails) {
      productDetails = await Tire.findById(productId);
      if (productDetails) determinedItemType = "tire";
    }
    if (!productDetails) {
      productDetails = await Oil.findById(productId);
      if (productDetails) determinedItemType = "oil";
    }
    if (!productDetails) {
      productDetails = await WiperFluid.findById(productId); 
      if (productDetails) determinedItemType = "wiperFluid";
    }

    if (!productDetails) {
      return res.status(404).json({ message: "Продуктът не е намерен." });
    }

    const existingItem = cart.items.find(
      (i) =>
        i.productId.toString() === productId && i.itemType === determinedItemType
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        productId,
        quantity: quantity || 1,
        itemType: determinedItemType,
      });
    }

    await cart.save();
    res.status(200).json({ message: "Продуктът е добавен успешно." });
  } catch (error) {
    console.error("Грешка при добавяне в количката:", error);
    res.status(500).json({ message: "Грешка при добавяне в количката." });
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
    res.status(200).json({ message: "Продуктът е премахнат." });
  } catch (error) {
    console.error("Грешка при премахване:", error);
    res.status(500).json({ message: "Грешка при премахване." });
  }
});

router.delete("/:userId", checkAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.deleteOne({ userId });
    res.status(200).json({ message: "Количката е изчистена." });
  } catch (error) {
    console.error("Грешка при изчистване:", error);
    res.status(500).json({ message: "Грешка при изчистване на количката." });
  }
});

module.exports = router;