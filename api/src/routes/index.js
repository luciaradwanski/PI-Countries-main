/*
Modularizar estas rutas...Las responsabilidades de definir rutas las vamos a enviar a otro mudulo
Entonces cuando la req llegue
*/
const { Router } = require('express');
// Importar todos los routers ---> Ejemplo: const authRouter = require('./auth.js');
/*
Enviar las rutas de country a un router que se especialice en rutas de country
Enviar las rutas de activity a un router que se especialize en rutas de activity
Hay que tener las rutas divididas en dos tipo de router
*/
const {countryRouter} = require('./countryRouter.js'); // va con {}
const {activityRouter} = require('./activityRouter');

/*
Enrutador---> router, va a definir las rutas
va a tener la responsabilidad de definir las rutas
*/
const router = Router();

// Configurar los routers ----> Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countryRouter);
router.use('/activities', activityRouter);


module.exports = router;
