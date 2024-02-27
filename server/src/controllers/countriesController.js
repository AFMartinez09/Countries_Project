const URL = 'http://localhost:5000/countries';
const { Country, Activity } = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');

// funcion para limpiar los datos de la API
const cleanApiCountry = (api) =>
    api.map(country => {
        return {
            id: country.cca3,
            name: country.name.common,
            flag: country.flags.png,
            continent: country.region,
            capital: country.capital ? country.capital[0] : 'Capital undefined',
            subregion: country.subregion ? country.subregion : 'Subregion undefined',
            area: country.area,
            population: country.population,
        }
    });


const getAllCountries = async () => {
    const dbCountries = await Country.findAll({
        include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: { attributes: [] }
        }
    });
    if (dbCountries.length === 0) {
        let countries;
        try {
            const apiCountries = await axios.get(URL);
            countries = cleanApiCountry(apiCountries.data);
        } catch (error) {
            console.log(error);
        }
        try {
            await Country.bulkCreate(countries); // Comando para verificar la tabla de paises en BDD => SET client_encoding = 'UTF8';
        } catch (error) {
            console.log(error);
        }

        return countries;
    }

    return dbCountries;
};

const getCountryById = async (id) => {
    const upperCaseId = id.toUpperCase();
    const findCountry = await Country.findOne({
        where: { id: upperCaseId },
        include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
        }
    });

    return findCountry;
};

const searchCountryName = async (name) =>
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

module.exports = { getCountryById, getAllCountries, searchCountryName };