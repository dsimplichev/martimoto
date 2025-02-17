const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PORT, MONGO_URI } = require('./config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const partRoutes = require('./routes/partRoutes');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const fs = require('fs');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api/parts', partRoutes);  

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const result = await cloudinary.uploader.upload(filePath);

        
        fs.unlinkSync(filePath);

        res.status(200).json({ imageUrl: result.url });
    } catch (error) {
        console.error('Грешка при качването на изображението:', error);
        res.status(500).send('Грешка при качването на изображението.');
    }
});

app.get('/', (req, res) => {
    res.send('Сървърът работи!');
});

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Свързан с MongoDB!'))
    .catch((err) => console.error('Грешка при свързването с MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Сървърът работи на порт ${PORT}`);
});