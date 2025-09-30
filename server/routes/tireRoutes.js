const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const CarTire = require('../models/CarTire'); 
const { protect, admin } = require('../middleware/authMiddleware'); 

const router = express.Router();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'tires', 
        allowedFormats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage }); 




router.post('/add-car-tire', 
    protect, 
    admin,   
    upload.array('images', 5), 
    async (req, res) => {
        try {
            
            const { 
                brand, model, width, aspectRatio, diameter, 
                loadIndex, speedRating, fuelEconomy, wetGrip, 
                noiseLevel, season, price, description
            } = req.body;

            
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'Трябва да качите поне една снимка!' });
            }

            
            const imageUrls = req.files.map(file => file.path); 

            
            const newTire = new CarTire({
                brand, model, 
                width, aspectRatio, diameter, 
                loadIndex, speedRating, 
                fuelEconomy, wetGrip, noiseLevel, 
                season, price, description,
                images: imageUrls 
            });

            await newTire.save();

           
            res.status(201).json({ message: 'Гумата беше успешно добавена!', newTire });

        } catch (error) {
            console.error('Грешка при добавянето на гума:', error);
            res.status(500).json({ message: 'Грешка при създаването на гума. Проверете сървърните логове.' });
        }
    }
);



module.exports = router;