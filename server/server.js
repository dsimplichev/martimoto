const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


const User = require('./models/User');  

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

        
        const newUser = new User({ username, email, password });

       
        await newUser.save();

        res.status(201).json({ message: 'Успешно регистриран!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Грешка при регистрацията. Опитайте отново.' });
    }
});


mongoose.connect('mongodb://localhost:27017/martimoto', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Свързан с MongoDB!');
}).catch(err => {
    console.error('Грешка при свързването с MongoDB', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сървърът работи на порт ${PORT}`);
});