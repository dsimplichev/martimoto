const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Accessory = require('../models/Accessory'); // ✅ Импортиране на модела

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

        if (!title || !description || !price || !category || req.files.length === 0) {
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


router.get('/', async (req, res) => {
    try {
        const accessories = await Accessory.find();
        res.status(200).json(accessories);
    } catch (error) {
        console.error('Грешка при взимането на аксесоарите:', error);
        res.status(500).json({ message: 'Грешка при зареждането на аксесоари!' });
    }
});

module.exports = router;