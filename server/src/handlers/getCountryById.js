const {countryById } = require('../controllers/Country/getCountryById');

const handlerGetCountryById = async( req, res ) => {
  const { id } =req.params;
  try {
    const response = await countryById( id );
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = { handlerGetCountryById };