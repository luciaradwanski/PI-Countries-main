/* Creamos un Router */
const { Router } = require('express');
const { useInflection } = require('sequelize');


const {getCountriesHandler, getCountryHandler} = require('../Handlers/CountryHandler')


const countryRouter = Router(); /* Igual a la instancia de rutas */

/* countryRouter.get('/countries', (req, res) => {
    res.status(200).send('Estoy en countries')
}) */



/* Tengo un endpoint en donde mi servidor tiene una petición tipo get a '/' nada, la ruta carga todos los Countries */

countryRouter.get('/countries', getCountriesHandler);
countryRouter.get('/countries/:id', getCountryHandler);




module.exports = { countryRouter}; 
/* Hacemos esto para que pueda requerir y una vez que lo requiere ----> en index.js */
