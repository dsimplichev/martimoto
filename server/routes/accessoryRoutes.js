const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Accessory = require('../models/Accessory');

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'accessories',
        allowedFormats: ['jpg', 'png', 'jpeg'],
    },
});
const upload = multer({ storage });

router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        if (!title || !description || !price || !category || req.files.length === 0 ) {
            return res.status(400).json({ message: 'Моля, попълнете всички полета и качете поне едно изображение!' });
        }

        const imageUrls = req.files.map(file => file.path);

        const newAccessory = new Accessory({
            title,  
            description,
            price,
            category,
            images: imageUrls,
        });

        await newAccessory.save();

        res.status(201).json({ message: 'Аксесоарът е добавен успешно!', accessory: newAccessory });
    } catch (error) {
        console.error('Грешка при добавянето на аксесоар:', error);
        res.status(500).json({ message: 'Грешка при създаването на аксесоар!' });
    }
});


router.get('/accessories/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const accessories = await Accessory.find({ category });
        res.json(accessories);
    } catch (error) {
        console.error("Грешка при получаването на аксесоари:", error);
        res.status(500).json({ message: "Грешка при зареждането на аксесоарите." });
    }
});

router.get('/accessories/detail/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        
        const accessory = await Accessory.findById(id);

        if (!accessory) {
            return res.status(404).json({ message: "Аксесоарът не е намерен." });
        }

        
        res.json(accessory);
    } catch (error) {
        console.error("Грешка при заявката:", error);
        res.status(500).json({ message: "Грешка при зареждане на аксесоара." });
    }
});

module.exports = router;