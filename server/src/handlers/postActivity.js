const { createActivity } = require('../controllers/Activity/postCreateActivity');

const hanlderCreateActivity = async(req, res) => {
  const{ name, difficulty, duration, season, countries } = req.body;
  try {
    const newActivity = await createActivity(name, difficulty, duration, season, countries);
    res.status(201).json(newActivity)
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = { hanlderCreateActivity };