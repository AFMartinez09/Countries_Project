const { Activity, Country } = require('../db');

const createActivity = async (name, difficulty, duration, season, countries) => {
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