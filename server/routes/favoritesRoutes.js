const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');


router.get('/:userEmail', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userEmail: req.params.userEmail });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Грешка при зареждане на любимите' });
  }
});


router.post('/', async (req, res) => {
  try {
    console.log('Получено в /api/favorites:', req.body);
    const newFavorite = new Favorite(req.body);
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    console.error('ГРЕШКА ПРИ ЗАПИС В MONGODB:', err);
    res.status(500).json({ error: 'Грешка при запис' });
  }
});

router.delete('/:userEmail/:partId', async (req, res) => {
  try {
    await Favorite.deleteOne({ userEmail: req.params.userEmail, partId: req.params.partId });
    res.status(200).json({ message: 'Премахнато успешно' });
  } catch (err) {
    res.status(500).json({ error: 'Грешка при изтриване' });
  }
});


module.exports = router;