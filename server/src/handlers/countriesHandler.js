const { getCountryById, getAllCountries, searchCountryName } = require("../controllers/countriesController.js");

const getCountries = async (req, res) => {
    try {
        const { name } = req.query;
        if(name) {
            let countryName;
            try {
                countryName = await searchCountryName(name);
            } catch (error) {
                console.log(error);
            }

            if(!countryName.length) {
                return res.status(404).send("Country not found");
            } else {
                countryName = countryName.map((c) => {
                    return {
                        id: c.dataValues.id,
                        name: c.dataValues.name,
                        flag: c.dataValues.flag,
                        continent: c.dataValues.continent,
                        capital: c.dataValues.capital,
                        area: c.dataValues.area,
                        subregion: c.dataValues.subregion,
                        population: c.dataValues.population,
                        activities: c.dataValues.activities,
                    };
                });

                return res.status(200).json(countryName);
            }
        }
        try {
            
            const countries = await getAllCountries()
           return res.status(200).send(countries);
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCountriesId = async (req,res) => {
    try {
        const { id } = req.params;
        const countryId = await getCountryById(id);

        if(!countryId) {
            return res.status(404).send("ID not found");
        }

        res.status(200).json(countryId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCountries, getCountriesId };