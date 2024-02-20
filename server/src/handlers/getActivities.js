const { getActivities } = require('../controllers/Activity/getAllActivities');

//get all the activies 
const handlerGetActivities = async(req, res) => {
  try {
    const allActivities = await getActivities();
    res.status(200).json(allActivities);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = { handlerGetActivities };