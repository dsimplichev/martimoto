const express = require('express');
const router = express.Router();
const Part = require('../models/Part'); 
const multer = require('multer'); 
const upload = multer({ dest: 'uploads/' }); 

router.post('/add', upload.array('images'), async (req, res) => {  
  try {
    const { title, description, price, category, brand, model, cylinder, year } = req.body;  
    const images = req.files ? req.files.map(file => file.path) : [];  
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

module.exports = router;