const { Country, Activity} = require('../db')

const {getCountryByName, getAllCountries, getCountryById, get} = require('../Controllers/CountryControllers')



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
    const country = await getCountryById(id);
    res.status(200).json(country)
  } catch (error) {
    res.status(400).json({message: "Country not found"})
    
  }
};


module.exports = {
    getCountriesHandler,
    getCountryHandler,
}