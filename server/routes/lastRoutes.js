const express = require('express');
const router = express.Router();
const Accessory = require('../models/Accessory');
const Part = require('../models/Part');

router.get('/', async (req, res) => {
    try {
        const lastAccessories = await Accessory.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .lean(); // Използваме .lean() за по-бързо извличане на обикновени JS обекти

        const lastParts = await Part.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .lean(); // Използваме .lean()

        // 🆕 Добавяме itemType към всеки продукт
        const accessoriesWithTypes = lastAccessories.map(acc => ({ ...acc, itemType: 'accessory' }));
        const partsWithTypes = lastParts.map(part => ({ ...part, itemType: 'part' }));

        const combined = [...accessoriesWithTypes, ...partsWithTypes]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10); // Взимаме само последните 10 от комбинираните

        res.json(combined);
    } catch (error) {
        console.error('Грешка при зареждане на последните продукти:', error);
        res.status(500).json({ message: 'Грешка при зареждане на последните продукти' });
    }
});

module.exports = router;