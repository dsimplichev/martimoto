
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());  

// Примерен роут
app.get('/', (req, res) => {
    res.send('Сървърът работи!');
});

mongoose.connect('mongodb://localhost:27017/MartiMoto', {
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