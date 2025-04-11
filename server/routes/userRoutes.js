const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

const router = express.Router();


router.get('/', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Няма валиден токен.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Потребителят не съществува.' });
        }

        res.status(200).json({ user: { email: user.email, username: user.username } });
    } catch (error) {
        console.error('Грешка при валидиране на токена:', error);
        res.status(401).json({ message: 'Невалиден токен.' });
    }
});


router.post('/change-password', async (req, res) => {
    const { newPassword } = req.body;
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Не е предоставен токен.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Потребителят не беше намерен.' });
        }

        
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        
        console.log('Хешираната парола:', hashedPassword);

        
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Паролата беше успешно променена.' });
    } catch (error) {
        console.error('Грешка при промяна на паролата:', error);
        res.status(500).json({ message: 'Сървърна грешка. Опитайте по-късно.' });
    }
});

module.exports = router;