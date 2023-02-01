const { Country, Activity } = require("../db");

const getActivities = async () => {
  try {
    actList = await Activity.findAll({ 
      attributes: ['name', 'ID'],
    });  
  } catch (error) {
    console.log(error);
  } 
  return actList;
};

const postActivity = async ({ name, difficulty, duration, seasson, countries }) => {
  // try {
  //   for (let i = 0; i < countries.length; i++) {
  //     const [newActivity] = await Activity.findOrCreate({
  //       where: { name },
  //       defaults: {
  //         name,
  //         difficulty,
  //         duration,
  //         seasson,
  //       },
  //     });

  //     const country = await Country.findByPk(countries[i]);
  //     country.addActivity(newActivity);
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  if (!name || !difficulty || !duration || !seasson || !countries)
    throw Error("Faltan datos para la creación de la actividad");
  const newActivity = await Activity.findOrcreate({
    name,
    difficulty,
    duration,
    seasson,
  });
  await newActivity.setCountries(countries);
  return newActivity;
};

const deleteAct = async (id) => {
  const activity = await Activity.findByPk(id);
  await activity.destroy();
  return { message: "Actividad eliminada con éxito" };
}

module.exports = { postActivity, getActivities, deleteAct };