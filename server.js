require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

// Роуты
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const apiRoutes = require('./routes/api');

const app = express();

// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware для глобальных переменных
app.use((req, res, next) => {
  res.locals.appName = process.env.APP_NAME || 'DefaultAppName';
  res.locals.env = process.env.NODE_ENV || 'development';
  next();
});

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Подключено к MongoDB'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Настройка сессий
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Роуты
app.use('/auth', authRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/api', apiRoutes);

// Главная страница
app.get('/', (req, res) => {
  res.render('index');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


