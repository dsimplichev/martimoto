const express = require('express');
const router = express.Router();
const Part = require('../models/Part');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const upload = multer({ dest: 'uploads/' });

router.post('/add', upload.array('images'), async (req, res) => {
  try {
    const { title, description, price, category, brand, model, cylinder, year } = req.body;

    const images = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      images.push(result.secure_url);
    }

    const newPart = new Part({
      title,
      description,
      price,
      category,
      brand,
      model,
      cylinder,  
      year,
      images,
    });

    await newPart.save();
    res.status(201).json(newPart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при добавяне на част' });
  }
});

router.get('/', async (req, res) => {
  const { brand, model, year } = req.query;  

  try {
    
    const parts = await Part.find({
      brand,
      model,
      cylinder: year,  
    });

    if (!parts.length) {
      return res.status(404).json({ message: 'Части не са намерени' });
    }

    res.json(parts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при извличане на части' });
  }
});

module.exports = router;