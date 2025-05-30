const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PORT, MONGO_URI } = require('./config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const partRoutes = require('./routes/partRoutes');
const accessoryRoutes = require('./routes/accessoryRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const Accessory = require('./models/Accessory');
const Part = require('./models/Part')
const orderRoutes = require('./routes/orderRoutes');
const Order = require('./models/Order');
const favoriteRoutes = require('./routes/favoriteRoutes');

const upload = multer(); 
const app = express();

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
app.use('/api/accessories', accessoryRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/favorites', favoriteRoutes);

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
                return res.status(500).send('Грешка при качването на изображението.');
            }
            res.status(200).json({ imageUrl: result.secure_url });
        }).end(req.file.buffer);
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

app.get("/accessories/:category", async (req, res) => {
    try {
        const category = decodeURIComponent(req.params.category); 
        const accessories = await Accessory.find({ category: category });

        if (accessories.length === 0) {
            return res.status(404).json({ message: "Няма аксесоари в тази категория" });
        }

        res.json(accessories);
    } catch (error) {
        res.status(500).json({ message: "Грешка при зареждане на аксесоарите" });
    }
});

app.get('/accessories/detail/:id', (req, res) => {
    const { id } = req.params;
    
    Accessory.findById(id)
        .then(accessory => {
            if (!accessory) {
                return res.status(404).json({ message: "Аксесоарът не е намерен." });
            }
            res.json(accessory);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Грешка при зареждане на аксесоара." });
        });
});


app.get('/api/search', async (req, res) => {
  const query = req.query.query;

  try {
    const accessoriesPromise = Accessory.find({
      title: { $regex: query, $options: 'i' }
    });

    const partsPromise = Part.find({
      title: { $regex: query, $options: 'i' }
    });

    const [accessories, parts] = await Promise.all([accessoriesPromise, partsPromise]);

    const results = [...accessories, ...parts];
    res.json(results);
  } catch (error) {
    console.error('Грешка при глобално търсене:', error);
    res.status(500).json({ message: 'Грешка при търсене на продукти' });
  }
});