
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const Order = require("../models/Order");
const Part = require("../models/Part");
const Accessory = require("../models/Accessory");
const Tire = require("../models/CarTire");
const Oil = require("../models/Oil");
const WiperFluid = require("../models/WiperFluid");
const Mats = require("../models/Mats");
const authenticateToken = require("../middleware/authMiddleware");


router.post("/create", async (req, res) => {
  console.log("Получено от клиента:", req.body);

  let userId = null;
  const token = req.cookies?.token; 
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
      console.log("Логнат потребител:", userId);
    } catch (err) {
      console.log("Невалиден токен – гост:", err.message);
    }
  }

  try {
    const {
      firstName, lastName, email, phone,
      deliveryMethod = "", city = "", office = "", deliveryAddress = "",
      companyName = "", companyReg = "", companyEIK = "", companyAddress = "",
      comment = "", cart, totalAmount
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !cart || !totalAmount) {
      return res.status(400).json({ message: "Липсват задължителни данни." });
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Количката е празна." });
    }

    const populatedCart = await Promise.all(
      cart.map(async (item) => {
        let product = null;
        let title = "Неизвестен продукт";

        switch (item.itemType) {
          case "part":
            product = await Part.findById(item.productId);
            title = product?.title || "Част";
            break;
          case "accessory":
            product = await Accessory.findById(item.productId);
            title = product?.title || "Аксесоар";
            break;
          case "tire":
            product = await Tire.findById(item.productId);
            if (product)
              title = `${product.brand} ${product.model} ${product.width}/${product.aspectRatio} R${product.diameter} ${product.speedRating}`;
            break;
          case "oil":
            product = await Oil.findById(item.productId);
            if (product)
              title = `${product.brand} ${product.viscosity} ${product.type} ${product.volume}`;
            break;
          case "wiperFluid":
            product = await WiperFluid.findById(item.productId);
            title = product?.brand || "Течност";
            break;
          case "mat":
            product = await Mats.findById(item.productId);
            title = product ? `${product.carBrand} ${product.carModel}` : "Стелки";
            break;
          default:
            return { error: `Невалиден itemType: ${item.itemType}` };
        }

        if (!product) {
          return { error: `Продуктът не е намерен: ${item.productId}` };
        }

        if (product.isSold !== undefined && !product.isSold) {
          product.isSold = true;
          await product.save();
        }

        return {
          productId: item.productId,
          itemType: item.itemType,
          quantity: item.quantity,
          title,
          price: product.price || 0,
          image: product.images?.[0] || "https://placehold.co/80x80?text=Без+снимка",
        };
      })
    );

    const error = populatedCart.find((i) => i.error);
    if (error) {
      return res.status(400).json({ message: error.error });
    }

    const newOrder = new Order({
      firstName, lastName, email, phone,
      deliveryMethod, city, office, deliveryAddress,
      companyName, companyReg, companyEIK, companyAddress,
      comment, cart: populatedCart, totalAmount,
      status: "Pending",
      userId: userId || null,
      statusHistory: [{ status: "Pending", timestamp: new Date() }],
    });

    const savedOrder = await newOrder.save();
    console.log("Поръчка създадена:", savedOrder._id, "userId:", userId || "гост");
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Грешка при поръчка:", error);
    res.status(500).json({ message: "Сървърна грешка." });
  }
});


router.get("/history", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const items = await Promise.all(
          order.cart.map(async (item) => {
            let product = null;
            switch (item.itemType) {
              case "part": product = await Part.findById(item.productId); break;
              case "accessory": product = await Accessory.findById(item.productId); break;
              case "tire": product = await Tire.findById(item.productId); break;
              case "oil": product = await Oil.findById(item.productId); break;
              case "wiperFluid": product = await WiperFluid.findById(item.productId); break;
              case "mat": product = await Mats.findById(item.productId); break;
            }
            return {
              title: product?.title || item.title || "Без име",
              price: product?.price || item.price || 0,
              image: product?.images?.[0] || item.image || "https://placehold.co/80x80?text=Без+снимка",
              quantity: item.quantity || 1,
            };
          })
        );
        return {
          _id: order._id,
          createdAt: order.createdAt,
          totalAmount: order.totalAmount,
          status: order.status,
          statusHistory: order.statusHistory || [],
          cart: items,
        };
      })
    );
    res.status(200).json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error("Грешка при история:", error);
    res.status(500).json({ success: false, message: "Сървърна грешка" });
  }
});

router.patch("/update/:id", authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Нямате права." });
    const { status } = req.body;
    const validStatuses = ["Pending", "Shipped", "Completed", "Deleted"];
    if (!validStatuses.includes(status)) return res.status(400).json({ message: "Невалиден статус." });
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Не е намерена." });
    if (order.status !== status) {
      order.status = status;
      order.statusHistory.push({ status, timestamp: new Date() });
    }
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Грешка при актуализация." });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Само админ." });
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Сървърна грешка." });
  }
});

router.get("/pending", authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Само админ." });
    const orders = await Order.find({ status: "Pending" }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Сървърна грешка." });
  }
});

router.get("/:orderId", authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Не е намерена." });
    if (order.userId?.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Нямате достъп." });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Сървърна грешка." });
  }
});

router.patch("/delete/:id", authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Само админ." });
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Deleted" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Не е намерена." });
    res.json({ message: "Изтрита." });
  } catch (error) {
    res.status(500).json({ message: "Грешка при изтриване." });
  }
});

module.exports = router;