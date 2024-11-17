const axios = require('axios');

const getSportsData = async () => {
  try {
    const response = await axios.get('https://api.sportscore.io', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'sportscore.io'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка SportScore API:', error);
    return { events: [] };
  }
};

module.exports = { getSportsData };
