const { Activity } = require('../../db.js');

const getActivities = async () => await Activity.findAll({
  include: {
    model: Country,
    attributes: ['id'],
    through: { attributes: [] }
  }
});

module.exports = { getActivities };