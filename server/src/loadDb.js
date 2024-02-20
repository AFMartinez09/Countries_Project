const urlApi = "http://localhost:5000/countries";
const { Country } = require("../db");

const dataApi = async (api) => {
  const countries = await api.map((c) => {
    return {
      id: c.cca3,
      name: c.name.official,
      image: c.flags.png,
      continents: c.continents,
      subregion: c.subregion
        ? c.subregion
        : "No hay informacion sobre este dato",
      area: c.area,
      population: c.population,
    };
  });
  return countries;
};

const loadDb = async () => {
  try {
    const response = await fetch(urlApi);
    const data = await response.json();
    const countryData = await dataApi(data);
    const countryDbTrue = await Country.findAll();
    if (countryDbTrue.length === 0) {
      await Country.bulkCreate(countryData);
      return "Datos cargados a la base de datos";
    } else {
      return "Los datos ya estan cargados";
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

module.exports = loadDb;