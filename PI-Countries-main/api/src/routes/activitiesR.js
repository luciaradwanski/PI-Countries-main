const {Router} = require('express');

const {getAllActivities, postActivity} = require('../Controllers/ActivityControllers')

const router = Router();

router.get('/activities', async(req, res) => {
    const allActivities = await getAllActivities();
    res.status(200).json(allActivities);
})

router.post('/activity', async(req, res) => {
    await postActivity(req.body);
    res.send(200).send({message: 'Activity created  succesfully'});
})


modulle.exports = router;