const express = require('express');
const router = express.Router();
const Part = require('../models/Part');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const upload = multer({ dest: 'uploads/' });

router.post('/add', upload.array('images'), async (req, res) => {
  try {
    const { title, description, price, category, brand, model, year, type } = req.body;

    
    if (!title || !description || !price || !category || !brand || !model || !year || !type || req.files.length === 0) {
      return res.status(400).json({ message: 'Моля, попълнете всички полета и качете поне едно изображение!' });
    }

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
      type, 
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
  try {
    const { brand, model, year } = req.query;
    console.log('Получени параметри:', brand, model, year);
    const query = {};
    if (brand) query.brand = new RegExp(brand, 'i'); 
    if (model) query.model = new RegExp(model, 'i');
    if (year) query.year = new RegExp(year, 'i');
    
    const parts = await Part.find(query);
    console.log('Намерени части:', parts); 
    res.status(200).json(parts);
  } catch (error) {
    console.error('Грешка при извличане на части:', error);
    res.status(500).json({ message: 'Грешка при извличане на части' });
  }

});

router.get('/:id', async (req, res) => {
  try {
      const part = await Part.findById(req.params.id);
      if (!part) {
          return res.status(404).json({ message: 'Частта не е намерена' });
      }
      res.json(part);
  } catch (error) {
      res.status(500).json({ message: 'Сървърна грешка' });
  }
});
module.exports = router;