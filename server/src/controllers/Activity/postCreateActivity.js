const { Activity, Country } = require('../../db.js');

const createActivity = async ( name, difficulty, duration, season, countries ) => {

  // Checking if the activity was created before in our db (same name and same attibutes) 
  const existActivity =  await Activity.findOne({
    where: {
      name
    }
  });
  if ( existActivity ) {
    throw new Error ('This activity was created before (same name and attributes), please try again');
  }

  const newActivity = await Activity.create({
    name, 
    difficulty, 
    duration, 
    season, 
    countries
  });

  // Restriction to send empty request (search)
  if( countries && countries.length > 0 ) {
    const countryNames = countries.map((country) => country.toUpperCase());

    const foundCountry = await Country.findAll({
      where: {
        id: countryNames
      }
    });
    
    if( foundCountry ) {

      await newActivity.addCountries(foundCountry);
    }
  }

 return newActivity;
}

module.exports = { createActivity };