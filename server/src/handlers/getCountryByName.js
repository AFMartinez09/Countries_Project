const { countryByName } = require('../controllers/Country/getCountries');

const handlerGetCountryByName = async( req, res ) => {
  try {
    const { name } = req.query;
    const response = await countryByName(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 

module.exports = { handlerGetCountryByName };