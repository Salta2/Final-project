const axios = require('axios');

const getWorldNews = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: { apiKey: process.env.WORLDNEWSAPI_KEY, country: 'us' },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Ошибка World News API:', error);
    return [];
  }
};

module.exports = { getWorldNews };
