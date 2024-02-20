const { Router } = require('express');
const routerActivities  = require('./routerActivity');
const routerCountries  = require('./routerCountry');
const router = Router();

router.use('/countries', routerCountries);
router.use('/activities', routerActivities);

module.exports = router;

