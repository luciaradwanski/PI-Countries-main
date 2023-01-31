const { Op } = require("sequelize");
const { Country, Activity } = require('../db');
const axios = require("axios");

const getApiInfo = async () => {
    try {
      let countries = (await axios.get("https://restcountries.com/v3/all")).data;
      // let name = countries[0].name;
      countries = await Promise.all(
        countries.map((country) => {
          Country.findOrCreate({
            where: {
              id: country.cca3,
              name: country.name.common,
              flags: country.flags[1],
              continent: country.continents[0],
              capital: country.capital ? country.capital[0] : "Not found",
              subregion: country.subregion ? country.subregion : "Not found",
              area: country.area,
              population: country.population,
              // Activities: country.activity.map(country => country)
            },
          });
        })
      );
      // console.log(name);
      return "¡ Database loaded ! =)";
    } catch (error) {
      return error;
    }
  };
  
  const getAllCountries = async () => {
    const countries = await Country.findAll({
      attributes: [
        "id",
        "name",
        "flags",
        "continent",
        "population",
        "capital",
        "subregion",
        "area",
      ],
      include: [{model: Activity, attributes: ["name"],}]
    });
    //[countries] || []
    return countries;
  };
  
  const getCountryByName = async (name) => {
    const country = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: ["id", "name", "flags", "continent", "capital", "population"],
      include: [{model: Activity, attributes: ["name"],}]
    });
  
    return country;
  };

  module.exports = {
    getApiInfo,
    getAllCountries,
    getCountryByName,
};