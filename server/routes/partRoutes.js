const express = require('express');
const router = express.Router();
const Part = require('../models/Part');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const upload = multer({ dest: 'uploads/' });
const mongoose = require('mongoose');


router.post('/add', upload.array('images'), async (req, res) => {
  try {
    const { title, description, price, category, brand, model, year, type = 'part' } = req.body;
    
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
      year,
      images,
      type,
      isSold: false 
    });

    await newPart.save();
    res.status(201).json(newPart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при добавяне на част' });
  }
});


router.get('/', async (req, res) => {
  try {
    const { brand, model, year } = req.query;

    const query = { isSold: false }; 

    if (brand) query.brand = brand;
    if (model) query.model = model;
    if (year) query.year = year;

    const parts = await Part.find(query).sort({ createdAt: -1 }); 
    res.status(200).json(parts);
  } catch (error) {
    console.error('Грешка при извличане на части:', error);
    res.status(500).json({ message: 'Грешка при извличане на части' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Невалидно ID' });
    }
    
    const part = await Part.findById(id);
    if (!part) {
      return res.status(404).json({ message: 'Частта не е намерена' });
    }

    
    if (part.isSold) {
      return res.status(410).json({ message: 'Тази част е вече продадена' });
    }

    res.status(200).json(part);
  } catch (error) {
    console.error('Грешка при извличане на частта:', error);
    res.status(500).json({ message: 'Грешка при извличане на частта' });
  }
});

module.exports = router;