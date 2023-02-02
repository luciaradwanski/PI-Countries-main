const { Country, Activity } = require("../db");


const getActivities = async () => {
  
    const actList = await Activity.findAll({ 
      include: {
        model: Country,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        }
      }
    });  
  
    return actList;
    
};

const postActivity = async (
  { name, difficulty, duration, seasson, countries }
) => {
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

const deleteAct = async (id) => {
  const activity = await Activity.findByPk(id);
  await activity.destroy();
  return { message: "Actividad eliminada con éxito" };
}

module.exports = { postActivity, getActivities, deleteAct };