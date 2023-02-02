const { Op } = require("sequelize");
const { Country, Activity } = require('../db');
const axios = require("axios");

const getApiInfo = async () => {
   
    
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const { data } = response;
      data.map(async (c) => {
        return await Country.findOrCreate({
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
     
  
  };
  
  const getAllCountries = async () => {
    const countries = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "seasson"],
        through: { attributes: [] },
      },
    });
    
    return countries;
  };
  
  const getCountryByName = async (name) => {
    const countries = await Country.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%`,},
      }, include: {
        model: Activity,
        attributes: ["name", "difficulty", "seasson", "duration"],
      }
      
    });
  
    if (countries.length) return countries;
    throw new Error("No se encontraron coincidencias");
  };

  const getCountryById = async (id) => {
    const country = await Country.findByPk(id, {
      include: [
        {
        model: Activity,
        attributes: ["name", "difficulty", "seasson", "duration"],
        through: [],
        },
      ]
    });

    return country
  };

  module.exports = {
    getApiInfo,
    getAllCountries,
    getCountryByName,
    getCountryById,
};