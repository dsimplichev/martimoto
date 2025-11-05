
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const mongoose = require("mongoose");
const authenticateToken = require("../middleware/authMiddleware");
require("../models/Part");
const Accessory = require("../models/Accessory");


let Part;

router.post("/create", async (req, res) => {
  console.log("Получено от клиента:", req.body);

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      deliveryMethod,
      city,
      office,
      deliveryAddress,
      companyName,
      companyReg,
      companyEIK,
      companyAddress,
      comment,
      cart,
      totalAmount,
    } = req.body;

    // Валидация на количката
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Количката не може да бъде празна." });
    }

    // Валидация на ID и количество
    for (const item of cart) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ message: `Невалиден productId: ${item.productId}` });
      }
      if (typeof item.quantity !== "number" || item.quantity <= 0) {
        return res.status(400).json({ message: `Невалидно количество за продукт ${item.productId}` });
      }
    }

    // Зареждане на моделите само ако не са заредени
    if (!Part) Part = require("../models/Part");

    // === ПРОВЕРКА И МАРКИРАНЕ НА ПРОДАДЕНИ АКСЕСОАРИ (1 бройка, атомарно) ===
    const soldAccessories = cart.filter(item => item.itemType === "accessory");

    for (const item of soldAccessories) {
      // 1. Проверка за 1 бройка
      if (item.quantity !== 1) {
        return res.status(400).json({
          message: "Аксесоарите могат да се поръчват само по 1 брой."
        });
      }

      // 2. Атомарно маркиране – само ако НЕ е продаден
      const result = await Accessory.findOneAndUpdate(
        { _id: item.productId, isSold: false },
        { isSold: true },
        { new: true }
      );

      if (!result) {
        const accessory = await Accessory.findById(item.productId);
        const title = accessory?.title || "Неизвестен аксесоар";
        return res.status(400).json({
          message: `Аксесоарът "${title}" вече е продаден.`
        });
      }
    }

    // === ПРОВЕРКА И МАРКИРАНЕ НА ПРОДАДЕНИ ЧАСТИ (по същия начин) ===
    const soldParts = cart.filter(item => item.itemType === "part");

    for (const item of soldParts) {
      const result = await Part.findOneAndUpdate(
        { _id: item.productId, isSold: false },
        { isSold: true },
        { new: true }
      );

      if (!result) {
        const part = await Part.findById(item.productId);
        const title = part?.title || "Неизвестна част";
        return res.status(400).json({
          message: `Частта "${title}" вече е продадена.`
        });
      }
    }

    // === СЪЗДАВАНЕ НА ПОРЪЧКАТА ===
    const newOrder = new Order({
      firstName,
      lastName,
      email,
      phone,
      deliveryMethod,
      city,
      office,
      deliveryAddress,
      companyName,
      companyReg,
      companyEIK,
      companyAddress,
      comment,
      cart,
      totalAmount,
      status: "Pending",
      userId: req.user ? req.user._id : undefined,
    });

    const savedOrder = await newOrder.save();

    console.log(`Поръчка създадена: #${savedOrder._id} | Части: ${soldParts.length} | Аксесоари: ${soldAccessories.length}`);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Грешка при създаване на поръчката:", error);
    res.status(500).json({ message: "Грешка при създаване на поръчката." });
  }
});

// === Останалите рутове – без промяна ===
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Грешка при зареждане на поръчките!" });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const orders = await Order.find({ status: "Pending" });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Грешка при извличането на поръчките." });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Shipped", "Completed", "Deleted"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Невалиден статус." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Поръчката не е намерена." });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Грешка при актуализиране на поръчката:", error);
    res.status(500).json({ message: "Грешка при актуализиране на поръчката." });
  }
});

router.get("/history", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });

    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const items = await Promise.all(
          order.cart.map(async (item) => {
            let product = null;

            if (item.itemType === "part") {
              product = await Part.findById(item.productId);
            } else if (item.itemType === "accessory") {
              product = await Accessory.findById(item.productId);
            }

            return {
              name: product?.title || "Без име",
              description: product?.description || "",
              price: product?.price || 0,
              image: product?.images?.[0] || "",
              quantity: item.quantity,
            };
          })
        );

        return {
          _id: order._id,
          createdAt: order.createdAt,
          totalAmount: order.totalAmount,
          status: order.status,
          items,
        };
      })
    );

    res.status(200).json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error("Грешка при взимане на история на поръчките:", error);
    res.status(500).json({ success: false, message: "Сървърна грешка" });
  }
});

router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Поръчката не е намерена" });
    }

    res.json(order);
  } catch (error) {
    console.error("Грешка при търсене на поръчката:", error.message);
    res.status(500).json({ message: "Грешка при търсене на поръчката" });
  }
});

router.patch("/delete/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Deleted" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Поръчката не беше намерена." });
    }

    res.json({ message: "Поръчката беше маркирана като 'Deleted'." });
  } catch (error) {
    console.error("Грешка при маркиране на поръчката:", error);
    res.status(500).json({ message: "Възникна грешка при изтриването на поръчката." });
  }
});

module.exports = router;