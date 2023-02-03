const {Router} = require('express');

const {getAllCountries, getCountryID} = require('../Controllers/CountryControllers')

const router = Router();

router.get('/countries', async (req, res) => {
    const {name} = req.query;
    if(name) {
        const countries = await getAllCountries(name);
        return countries.length 
        ? res.send(countries)
        : res.send({error: error.message});
    }
    const countries = await getAllCountries();
    return countries ? res.send(countries) : res.send({message: 'No results'})

})

router.get('/countries/:id', async(req, res) => {
    const {id} = req.params;
    const country = await getCountryID(id);
    return country ? res.send(country) : res.send({message: 'Country not found'})
})

module.exports = router;