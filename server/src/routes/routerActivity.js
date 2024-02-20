const { Router } = require('express');
const { hanlderCreateActivity } = require('../handlers/postActivity');
const { handlerGetActivities } = require('../handlers/getActivities');


const routerActivities = Router();

routerActivities.post('/', hanlderCreateActivity);
routerActivities.get('/', handlerGetActivities)

module.exports = routerActivities;