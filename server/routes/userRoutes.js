const express = require('express');
const jwt = require('jsonwebtoken');
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

module.exports = router;