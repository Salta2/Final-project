const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Регистрация
router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
  try {
    const { username, password, firstName, lastName, age, gender } = req.body;
    const user = new User({ username, password, firstName, lastName, age, gender });
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: username,
      subject: `Welcome to ${process.env.APP_NAME}`,
      text: 'Спасибо за регистрацию!',
    });

    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка регистрации пользователя');
  }
});

// Логин
router.get('/login', (req, res) => res.render('login'));
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect('/portfolio');
  } else {
    res.status(401).send('Неверные учетные данные');
  }
});

module.exports = router;



