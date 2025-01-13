const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');  

const app = express();


app.use(cors());


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Сървърът работи!');
});


app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Моля, попълнете всички полета.' });
    }

    try {
        
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ message: 'Потребителят вече съществува.' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Успешно регистриран!' });
    } catch (error) {
        console.error('Грешка при регистрацията:', error);
        res.status(500).json({ message: 'Грешка при регистрацията. Опитайте отново.' });
    }
});


app.post('/login', async (req, res) => {
    console.log("POST /login - Заявка получена:", req.body);  

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Моля, попълнете всички полета.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Няма потребител с този имейл.' });
        }

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Грешна парола.' });
        }

        
        res.status(200).json({
            message: 'Успешен вход!',
            user: { email: user.email, username: user.username }
        });
    } catch (error) {
        console.error('Грешка при логването:', error);
        res.status(500).json({ message: 'Грешка при логването. Опитайте отново.' });
    }
});


mongoose.connect('mongodb://localhost:27017/martimoto', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Свързан с MongoDB!');
}).catch(err => {
    console.error('Грешка при свързването с MongoDB:', err);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сървърът работи на порт ${PORT}`);
});