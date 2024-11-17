const Portfolio = require('../models/Portfolio');

// Отображение портфолио
exports.getPortfolio = async (req, res) => {
  try {
    const portfolioItems = await Portfolio.find();
    res.render('portfolio', { portfolioItems });
  } catch (error) {
    console.error('Ошибка при загрузке портфолио:', error);
    res.status(500).send('Ошибка сервера');
  }
};

// Создание нового элемента
exports.createPortfolioItem = async (req, res) => {
  try {
    const { title, description, image1, image2, image3 } = req.body;
    const newItem = new Portfolio({ title, description, image1, image2, image3 });
    await newItem.save();
    res.redirect('/portfolio');
  } catch (error) {
    console.error('Ошибка при создании элемента:', error);
    res.status(500).send('Ошибка сервера');
  }
};

// Удаление элемента
exports.deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Portfolio.findByIdAndDelete(id);
    res.redirect('/portfolio');
  } catch (error) {
    console.error('Ошибка при удалении элемента:', error);
    res.status(500).send('Ошибка сервера');
  }
};
