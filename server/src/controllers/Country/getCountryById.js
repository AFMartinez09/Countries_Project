const { Country, Activity } = require('../../db.js');

const countryById = async ( id ) => {

  try {
    const upperCaseId = id.toUpperCase();
    const searchCountry = await Country.findOne({
      where: {
        id: upperCaseId
      },
      include: {
       model: Activity,
       attributes: ['name, difficulty', 'duration', 'season'], 
      }
    });
    
    return searchCountry;

  } catch (error) {
    throw new Error('Country not found');
  }
}

module.exports = { countryById }