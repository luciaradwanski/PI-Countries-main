const {Country, Activity} = require('../db');

const {postActivity, getActivities} = require('../Controllers/ActivityControllers')

const getActivitiesHandler = async (req, res) => {

    const { name } = req.query;
    let allActivities ;
    try {
        if (name) { 
            const allActivities = await getActivities(name);
            res.status(200).json({allActivities});

        } else {
            allActivities = await getActivities();
            res.status(200).json({allActivities});
        }
    } catch (error) {
    res.status(400).json({error:error.message});
  }    
    // try{
    //     const allActivities = await getActivities();

    //     res.send(allActivities);

    // }catch(error){
    //     res.status(404).json('No se pueden mostrar las actividades')
    // }

}

const getActDetailsHandler = async (req, res) => {
    let {id} = req.params; 
    id = parseInt(id); 
    try {
        const activity = await Activity.findByPk(id, );
        res.status(200).json(activity);
    } catch (error) {
        res.status(404).json({message: 'Actividad no encontrada'})
    }
}

const createActivitiesHandler = async (req, res) => {
    try {
        const create = await postActivity(req.body);
        res.send(200).json(create);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};


const deleteActivityHeadler = async (req, res) => {
    
    const { id } = req.params
    
    try{

        let filaBorrada = await deleteAct(id)
        if(filaBorrada === 1){
            res.status(200).json('La actividad fue eliminada')  
        }                    

    }catch(error){
        
        res.status(404).json("La actividad no se pudo eliminar")

    }     
};

module.exports = {
    getActivitiesHandler,
    getActDetailsHandler,
    createActivitiesHandler,
    deleteActivityHeadler,
};
