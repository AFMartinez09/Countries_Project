const { Activity, Country } = require('../db');

const createActivity = async (name, difficulty, duration, season, countries) => {
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
        });
        countries.forEach(async(nation) => {
            let selectCountry = await Country.findByPk(nation);
            await newActivity.addCountries(selectCountry);
        });    
        return newActivity;


};

const getActivitiesDb = async () => {
        const activitiesDb = await Activity.findAll({
            include: { model: Country },
        });

        return activitiesDb;
};

module.exports = { createActivity, getActivitiesDb };