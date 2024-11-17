const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Маршруты
router.get('/', portfolioController.getPortfolio);
router.post('/create', portfolioController.createPortfolioItem);
router.post('/delete/:id', portfolioController.deletePortfolioItem);

module.exports = router;

