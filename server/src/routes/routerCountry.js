const { Router } = require('express');
const { handlerGetCountries } = require('../handlers/getAllCountries');
const { handlerGetCountryById } = require('../handlers/getCountryById');
const { handlerGetCountryByName } = require('../handlers/getCountryByName');

const routerCountries = Router();

routerCountries.get('/', handlerGetCountries );
routerCountries.get('/:id', handlerGetCountryById );
routerCountries.get('/name', handlerGetCountryByName );

module.exports = routerCountries;