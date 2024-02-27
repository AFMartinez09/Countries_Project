const { createActivity, getActivitiesDb } = require("../controllers/activitiesController");

const createActivityHandler = async (req, res) => {
    try {
        const {name, difficulty, duration, season, countries} = req.body;

        if(!name || !difficulty || !duration || !season || !countries) {
            return res.status(400).send("Enter all the data!");
        }

        const newActivity = await createActivity(name, difficulty, duration, season, countries);

        res.status(201).send(newActivity && "Activity created!");
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
};

const getActivitiesHandler = async (req, res) => {
    try {
        const response = await getActivitiesDb();

        if(!response) {
            return res.status(204).send("Activities not found!");
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createActivityHandler, getActivitiesHandler };