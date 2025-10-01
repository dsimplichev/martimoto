const express = require('express');
const router = express.Router();
const Accessory = require('../models/Accessory');
const Part = require('../models/Part');

router.get('/', async (req, res) => {
    try {
        const lastAccessories = await Accessory.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .lean(); 

        const lastParts = await Part.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .lean(); 

        
        const accessoriesWithTypes = lastAccessories.map(acc => ({ ...acc, itemType: 'accessory' }));
        const partsWithTypes = lastParts.map(part => ({ ...part, itemType: 'part' }));

        const combined = [...accessoriesWithTypes, ...partsWithTypes]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10); 

        res.json(combined);
    } catch (error) {
        console.error('Грешка при зареждане на последните продукти:', error);
        res.status(500).json({ message: 'Грешка при зареждане на последните продукти' });
    }
});

module.exports = router;