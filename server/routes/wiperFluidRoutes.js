const express = require('express');
const WiperFluid = require('../models/WiperFluid');
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


router.post('/add', upload.array('images', 3), async (req, res) => {
  try {
    const { title, volume, price } = req.body;

    if (!title || !volume || !price) {
      return res.status(400).json({ message: 'Всички полета са задължителни!' });
    }

    const images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "wiper-fluids"
        });
        images.push(result.secure_url);
        fs.unlinkSync(file.path); 
      }
    }

    const newFluid = new WiperFluid({
      title,
      volume,
      price: parseFloat(price),
      images,
      itemType: "wiperFluid" 
    });

    await newFluid.save();
    res.status(201).json({ message: 'Течността беше успешно добавена!', newFluid });
  } catch (err) {
    console.error('Грешка при добавяне на течността:', err);
    res.status(500).json({ message: 'Грешка при добавяне на течността.', error: err.message });
  }
});

router.get('/', async (req, res) => {
    try {
        const fluids = await WiperFluid.find().sort({ createdAt: -1 });
        res.json(fluids);
    } catch (err) {
        console.error('Грешка при взимане на течности:', err);
        res.status(500).json({ message: 'Грешка при взимане на течности', error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const fluid = await WiperFluid.findById(req.params.id);

        if (!fluid) {
            return res.status(404).json({ message: 'Продуктът не е намерен' });
        }

        res.json(fluid);
    } catch (err) {
        console.error('Грешка при взимане на конкретна течност:', err);
        res.status(500).json({ message: 'Грешка при взимане на продукта', error: err.message });
    }
});

module.exports = router;