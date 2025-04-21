const express = require('express');
const router = express.Router();
const Message = require('../models/Message');


router.post('/', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.status(201).json({ message: 'Съобщението е запазено успешно!' });
    } catch (error) {
        res.status(500).json({ error: 'Грешка при запазване на съобщението.' });
    }
});


router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Грешка при взимане на съобщенията.' });
    }
});

module.exports = router;