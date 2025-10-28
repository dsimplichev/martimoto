const express = require('express');
const Mats = require('../models/Mats');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/add', upload.array('images', 4), async (req, res) => {
    try {
        const { title, material, color, carBrand, carModel, carYear, description, price } = req.body;

        if (!title || !material || !color || !carBrand || !carModel || !price) {
            return res.status(400).json({ message: 'Полетата "Заглавие, Материал, Цвят, Марка, Модел, Цена" са задължителни!' });
        }

        const images = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, { folder: "car-mats" });
                images.push(result.secure_url);
                fs.unlinkSync(file.path);
            }
        }

        const newMat = new Mats({
            title,
            material,
            color,
            carBrand,
            carModel,
            carYear: carYear || undefined,
            description,
            price: parseFloat(price),
            images
        });

        await newMat.save();
        res.status(201).json({ message: 'Стелката беше успешно добавена!', newMat });
    } catch (err) {
        console.error('Грешка при добавяне на стелка:', err);
        res.status(500).json({ message: 'Грешка при добавяне на стелката.', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const mats = await Mats.find().sort({ createdAt: -1 });
        res.json(mats);
    } catch (err) {
        console.error('Грешка при взимане на стелки:', err);
        res.status(500).json({ message: 'Грешка при взимане на стелки', error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const mat = await Mats.findById(req.params.id);
        if (!mat) return res.status(404).json({ message: 'Продуктът не е намерен' });
        res.json(mat);
    } catch (err) {
        console.error('Грешка при взимане на конкретна стелка:', err);
        res.status(500).json({ message: 'Грешка при взимане на продукта', error: err.message });
    }
});

module.exports = router;