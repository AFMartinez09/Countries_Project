const { Country, Activity } = require('../../db.js');
const { Op } =require('sequelize');
const axios = require('axios');
const API_URL = 'http://localhost:5000/countries';

// Get API data and then save data to database, in this way
// Is more efficient becasuse we don't need to call it again 
const saveApiToDb = ( api ) => {
  api.map((country) =>{
    return{
      id: country.cca3,
      name: country.name.common,
      flag: country.flags[1],
      continent: country.region,
      capital: country.capital ? country.capital[0] : 'Info not found',
      continent: country.continents ? country.continents : 'Info not found',
      subregion: country.subregion ? country.subregion : 'Info not found',
      area: country.area,
      population: country.population,
    }
  })
}

const getAllCountries = async() => {
  const dbCountries = await Country.findAll({
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'duration', 'season'],
      through: {attributes: []}
    }
  });
  
  if( !dbCountries.length ) {
    const apiData = (await axios.get(`${API_URL}`)).data;

    const foundCountries = saveApiToDb(apiData);
    // Uploading data api to database
    await Country.bulkCreate(foundCountries); 
    return foundCountries;
  }
  return dbCountries;
}

const countryByName = async (name) =>
    await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            }
        },
        include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: { attributes: [] }
        }
    });


module.exports = { getAllCountries, countryByName };