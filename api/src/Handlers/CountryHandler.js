const { Country, Activity} = require('../db')

const {getCountryByName, getAllCountries} = require('../Controllers/CountryController')



const getCountriesHandler = async(req, res) => { //async
  const { name } = req.query;
  let data;
  try {
    if (name) {
      data = await getCountryByName(name);
      res.send(data);
    } else {
      data = await getAllCountries();
      data.length > 0
        ? res.send(data)
        : res.status(404).send({ message: "Country not found" });
    }
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const getCountryHandler = async(req, res) => { 
  const { id } = req.params;
  try {
    let countryId = await Country.findByPk(id, {
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: { attributes: []},
      }
    });
    countryId
      ? res.send(countryId)
      : res.status(404).send({ message: "País no encontrado" });
  } catch (error) {
    res.send(error);
  }
};


module.exports = {
    getCountriesHandler,
    getCountryHandler,
}