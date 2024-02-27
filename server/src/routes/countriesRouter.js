const { Router } = require("express");
const countriesRouter = Router();

const { getCountriesId, getCountries } = require("../handlers/countriesHandler");

countriesRouter.get("/:id", getCountriesId);
countriesRouter.get("/", getCountries);

module.exports = countriesRouter;