const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

const router = express.Router();


const registerValidation = [
  check('username').isLength({ min: 3 }).withMessage('Потребителското име трябва да е поне 3 символа.'),
  check('email').isEmail().withMessage('Невалиден имейл.'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Паролата трябва да е поне 8 символа.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/)
    .withMessage('Паролата трябва да съдържа: главна, малка, цифра и символ (@$!%*?&.,)'),
];

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Твърде много опити. Опитайте по-късно.',
});

router.post('/register', registerLimiter, registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Потребителят вече съществува.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role: 'user' });
    await newUser.save();

    res.status(201).json({ message: 'Успешна регистрация!' });
  } catch (error) {
    console.error('Грешка при регистрация:', error);
    res.status(500).json({ message: 'Сървърна грешка.' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Попълнете всички полета.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Няма потребител с този имейл.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Грешна парола.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    
    res.status(200).json({
      message: 'Успешен вход!',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Грешка при логин:', error);
    res.status(500).json({ message: 'Сървърна грешка.' });
  }
});


router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Успешен изход!' });
});


router.get('/user', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({ user: null });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(200).json({ user: null });
    }

    
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.warn('Невалиден токен при /user:', error.message);
    res.status(200).json({ user: null });
  }
});


router.get('/status', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      isAuthenticated: true,
      user: {
        id: decoded.id,
        role: decoded.role,
      },
    });
  } catch (error) {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;