const { Router } = require("express");
const countriesRouter = require("./countriesRouter");
const activitiesRouter = require("./activitiesRouter");

const router = Router();

router.use("/activities", activitiesRouter);
router.use("/countries", countriesRouter);

module.exports = router;
