const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PORT, MONGO_URI } = require('./config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

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