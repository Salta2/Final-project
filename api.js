const express = require('express');
const { getSportsData } = require('../services/sportscore');
const { getWorldNews } = require('../services/worldnews');
const router = express.Router();

router.get('/sports', async (req, res) => {
  const data = await getSportsData();
  res.render('sports', { data });
});

router.get('/news', async (req, res) => {
  const articles = await getWorldNews();
  res.render('news', { articles });
});

module.exports = router;
