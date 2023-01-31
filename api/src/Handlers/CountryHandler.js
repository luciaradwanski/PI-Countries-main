const { Country, Activity} = require('../db')

const {getCountryByName, getAllCountries, getCountryById} = require('../Controllers/CountryController')



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
  const country = await getCountryById(id);
  return country ? res.send(country) : res.send("Country not found");
};


module.exports = {
    getCountriesHandler,
    getCountryHandler,
}