const { Op } = require("sequelize");
const { Country, Activity } = require('../db');
const axios = require("axios");

const getApiInfo = async () => {
   
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const { data } = response;
      data.map(async (c) => {
        await Country.findOrCreate({
          where: { name: c.name.official },
          defaults: {
            id: c.cca3,
            name: c.name.official,
            flags: c.flags.png,
            continents: c.continents,
            capital: c.capital || ["none"],
            subregion: c.subregion || "none",
            area: c.area,
            population: c.population,
          },
        });
      });
      console.log("Countries loaded in DB succesfully");
  
      if (query) {
        const response = await Country.findAll({
          where: { name: { [Op.iLike]: `%${query}%` } },
        });
        return response && response;
      }
  
      const countriesDB = await Country.findAll({
        include: {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "seasson"],
          through: { attributes: [] },
        },
      });
  
      return countriesDB && countriesDB;
    } catch (error) {
      console.log(error);
    }
  };
  
  const getAllCountries = async () => {
    const countries = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "seasson"],
        through: { attributes: [] },
      },
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
      
      include: Activity
    });
  
    return country;
  };

  module.exports = {
    getApiInfo,
    getAllCountries,
    getCountryByName,
};