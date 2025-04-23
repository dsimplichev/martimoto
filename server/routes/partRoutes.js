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


router.get('/brands/:brandName/models/:modelName/:subModelName/:yearRange', async (req, res) => {
  const { brandName, modelName, subModelName, yearRange } = req.params;

  try {
    const [startYear, endYear] = yearRange.split('-').map(Number);

    const parts = await Part.find({
      brand: brandName,
      model: modelName,
      subModel: subModelName, 
      year: { $gte: startYear, $lte: endYear },
    });

    console.log('Parts found:', parts);
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