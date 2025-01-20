const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body; 

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Моля, попълнете всички полета.' });
    }

    try {
        
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ message: 'Потребителят вече съществува.' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword, 
            role: role || 'user' 
        });

        await newUser.save();
        res.status(201).json({ message: 'Успешно регистриран!' });
    } catch (error) {
        console.error('Грешка при регистрацията:', error);
        res.status(500).json({ message: 'Грешка при регистрацията. Опитайте отново.' });
    }
});


router.post('/login', async (req, res) => {
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

        
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        res.status(200).json({
            message: 'Успешен вход!',
            user: { email: user.email, username: user.username, role: user.role }, 
            token,
        });
    } catch (error) {
        console.error('Грешка при логването:', error);
        res.status(500).json({ message: 'Грешка при логването. Опитайте отново.' });
    }
});


router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Успешен изход!' });
});

module.exports = router;