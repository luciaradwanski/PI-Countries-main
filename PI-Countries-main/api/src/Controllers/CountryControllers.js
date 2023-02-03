const axios = require('axios');

const {Op} = require('sequelize');

const {Country, Activity} = require('../db');

const getAllCountries = async(query) => {
    try {
        const api = (await axios.get("https://restcountries.com/v3.1/all")).data;
        api.map(async(c) => {
            await Country.findOrCreate({
                where: {
                    id: c.cca3,
                    name: c.name.official,
                    flags: c.flags.png,
                    continents: c.continents,
                    capital: c.capital || ["none"],
                    subregion: c.subregion || "none",
                    area: c.area,
                    population: c.population,
                }
            })
        })

        console.log('Countries loaded in DB succesfully');
        if(query) {
            const api = await Country.findAll({
                where: {name: {
                    [Op.iLike]: `%${query}%`
                }},
            });

            return api && api;
        }

        const countriesDB = await Country.findAll({
            include: {
                model: Activity,
                attributes: [ "name", "difficulty", "duration", "season"],
                through: { attributes: [] },
            },
        });

        return countriesDB && countriesDB;

    } catch (error) {
        console.log(error);
    }
}


const getCountryByID = async(id) => {
    try {
        const countryid = await Country.findByPk(id, {
            include: {
                model: Activity,
                attributes: [ "name", "difficulty", "duration", "season"],
                through: { attributes: []},
            },
        });

        return countryid && countryid; 

    } catch (error) {
        console.log(error);
    };
};

module.exports = { getAllCountries, getCountryByID,}