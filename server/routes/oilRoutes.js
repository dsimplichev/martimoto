const express = require('express');
const router = express.Router();
const Oil = require('../models/Oil');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const upload = multer({ dest: 'uploads/' });


router.post('/add-oil', upload.array('images', 3), async (req, res) => {
    try {
        
        const { vehicleType, oilCategory, brand, viscosity, type, volume, price } = req.body; 

        if (!vehicleType || !oilCategory || !brand || !viscosity || !type || !volume || !price) {
            return res.status(400).json({ message: 'Всички полета са задължителни!' });
        }

        const images = [];
        
        if (req.files && req.files.length > 0) {
             for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "oils"
                });
                images.push(result.secure_url);
            }
        }
       

        const newOil = new Oil({
            vehicleType,
            oilCategory,
            brand,
            viscosity,
            type,
            volume,
            price: parseFloat(price), 
            images
        });

        await newOil.save();
        res.status(201).json({ message: 'Маслото беше успешно добавено!', newOil });

    } catch (err) {
        console.error('Грешка при добавяне на масло:', err);
        res.status(500).json({ message: 'Грешка при добавяне на масло.', error: err.message });
    }
});

router.get('/category/:category', async (req, res) => {
  try {
    const category = decodeURIComponent(req.params.category); 
    const oils = await Oil.find({ oilCategory: category }).sort({ createdAt: -1 });
    res.json(oils);
  } catch (err) {
    console.error("Грешка при взимане на масла по категория:", err);
    res.status(500).json({ message: "Грешка при взимане на масла по категория." });
  }
});


router.get('/', async (req, res) => {
  try {
    const oils = await Oil.find().sort({ createdAt: -1 });
    res.json(oils);
  } catch (err) {
    console.error('Грешка при взимане на масла:', err);
    res.status(500).json({ message: 'Грешка при взимане на масла.' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const oil = await Oil.findById(req.params.id);
    if (!oil) return res.status(404).json({ message: 'Маслото не е намерено.' });
    res.json(oil);
  } catch (err) {
    res.status(500).json({ message: 'Грешка при взимане на масло.' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Oil.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Маслото не е намерено.' });
    res.json({ message: 'Маслото беше изтрито.' });
  } catch (err) {
    res.status(500).json({ message: 'Грешка при изтриване.' });
  }
});

module.exports = router;