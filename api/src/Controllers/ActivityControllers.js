const { Country, Activity } = require("../db");

const getActivities = async () => {
  const activities = await Activity.findAll({ 
    attributes: [
        'name', 'difficulty','duration', 'seasson', 'countries'
    ],
    include: [{model: Country, attributes: ['name']}]
});   
  return activities;
};

const postActivity = async ({ name, difficulty, duration, seasson, countries }) => {
  try {
    for (let i = 0; i < countries.length; i++) {
      const [newActivity] = await Activity.findOrCreate({
        where: { name },
        defaults: {
          name,
          difficulty,
          duration,
          seasson,
        },
      });

      const country = await Country.findByPk(countries[i]);
      country.addActivity(newActivity);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postActivity, getActivities };