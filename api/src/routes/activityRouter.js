/* Creamos un Router */
const { Router } = require('express'); 

const {
    
    getActivitiesHandler, 
    getActDetailsHandler,
    createActivitiesHandler, 
    deleteActivityHeadler } = require('../Handlers/ActivitiesHandler')



//Ejemplo --> const router = Router();

const activityRouter = Router(); /* Igual a la instancia de rutas */

/* countryRouter.get('/activities', (req, res) => {
    res.status(200).send('Estoy en activities')
}) */


const validate = (req, res, next) => {
    const {name,difficulty,duration,seasson} = req.body;
    if(!name ) return res.status(400).json({error: 'Missing name'});
    if(!difficulty) return res.status(400).json({error: 'Missing difficulty'});
    if(!duration) return res.status(400).json({error: 'Missing duration'});
    if(!seasson) return res.status(400).json({error: 'Missing seasson'});
    next();
}
/* Tengo un endpoint en donde mi servidor tiene una petición tipo get a '/' nada, la ruta carga todas las actividades */

activityRouter.get('/activities', getActivitiesHandler);

activityRouter.get('/activities/:id', getActDetailsHandler)

activityRouter.post('/activity', validate, createActivitiesHandler); 



activityRouter.delete('/activity/:id', deleteActivityHeadler);




    







module.exports = {activityRouter};
 /* Hacemos esto para que pueda requerir y una vez que lo requiere ----> en index.js */