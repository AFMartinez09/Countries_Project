const { getAllCountries } = require('../controllers/Country/getCountries');

const handlerGetCountries = async(req, res) => {
    try {
        const response = await getAllCountries();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}




module.exports = {
    handlerGetCountries
}