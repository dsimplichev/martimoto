const express = require('express');
const router = express.Router();
const CarTire = require('../models/CarTire');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const upload = multer({ dest: 'uploads/' });

router.post('/add-car-tire', upload.array('images', 5), async (req, res) => {
  try {
    const {
      brand, model, width, aspectRatio, diameter,
      loadIndex, speedRating, fuelEconomy, wetGrip,
      noiseLevel, season, price, description
    } = req.body;

    if (!brand) return res.status(400).json({ message: 'Марка е задължителна!' });

    // Качваме всички снимки в Cloudinary
    const images = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "car-tires"
      });
      images.push(result.secure_url);
    }

    // Създаваме гума с масив от снимки
    const newTire = new CarTire({
      brand,
      model,
      width,
      aspectRatio,
      diameter,
      loadIndex,
      speedRating,
      fuelEconomy,
      wetGrip,
      noiseLevel,
      season,
      price,
      description,
      images, 
    });

    await newTire.save();
    res.status(201).json({ message: 'Гумата беше успешно добавена!', newTire });

  } catch (err) {
    console.error('Грешка при добавяне на гума:', err);
    res.status(500).json({ message: 'Грешка при добавяне на гума.', error: err.message });
  }
});

router.get('/car-tires', async (req, res) => {
  try {
    const tires = await CarTire.find().sort({ createdAt: -1 });
    res.json(tires);
  } catch (err) {
    console.error('Грешка при взимане на гуми:', err);
    res.status(500).json({ message: 'Грешка при взимане на гуми.' });
  }
});

router.get('/car-tires/:id', async (req, res) => {
  try {
    const tire = await CarTire.findById(req.params.id);
    if (!tire) return res.status(404).json({ message: 'Гумата не е намерена.' });
    res.json(tire);
  } catch (err) {
    res.status(500).json({ message: 'Грешка при взимане на гума.' });
  }
});

router.delete('/car-tires/:id', async (req, res) => {
  try {
    const deleted = await CarTire.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Гумата не е намерена.' });
    res.json({ message: 'Гумата беше изтрита.' });
  } catch (err) {
    res.status(500).json({ message: 'Грешка при изтриване.' });
  }
});

module.exports = router;