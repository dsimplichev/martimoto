const express = require("express");
const router = express.Router();
const Part = require("../models/Part");       
const Accessory = require("../models/Accessory"); 



router.get("/products/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        let product = null;

        
        product = await Part.findById(productId);
        if (product) {
            return res.status(200).json(product);
        }

        
        product = await Accessory.findById(productId);
        if (product) {
            return res.status(200).json(product);
        }

        
        res.status(404).json({ message: "Продуктът не е намерен." });
    } catch (error) {
        console.error("Грешка при зареждане на продукт по ID:", error);
        res.status(500).json({ message: "Вътрешна сървърна грешка при зареждане на продукта." });
    }
});

module.exports = router;