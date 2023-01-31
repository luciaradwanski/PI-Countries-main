const {Country, Activity} = require('../db');


const getActivitiesHandler = async (req, res) => {
    
    try{

        const allActivities = await Activity.findAll({ 
            attributes: [
                'name', 'difficulty','duration', 'seasson', 'id'
            ],
            include: [{model: Country, attributes: ['name']}]
        });   
        
        if(allActivities.length>0){
            res.status(200).send(allActivities)
        }  
        else{
            res.status(404).json('No existen actividades')
        }  
        
        

    }catch(error){
        res.status(404).json('No se pueden mostrar las actividades')
    }

}

const getActDetailsHandler = async (req, res) => {
    let {id} = req.params; 
    id = parseInt(id); 
    try {
        const activity = await Activity.findByPk(id);
        res.status(200).json(activity);
    } catch (error) {
        res.status(404).json({message: 'Actividad no encontrada'})
    }
}

const createActivitiesHandler = async (req, res) => {

    const { name, difficulty, duration, seasson, countryId } = req.body;
    
    try{

        const validateAct = await Activity.findOne({
            where: {
              name: name,
            },
        });

        if(!validateAct) {
            const addAct = await Activity.create({
                name: name,
                difficulty: difficulty,
                duration: duration,
                seasson: seasson,
                countryId: countryId,
            });
            const countrymatch = await Country.findAll({
                where: {
                  id: countryId,
                },
            });
            const resact = await addAct.addCountries(countrymatch);

            return res.send(resact);
        }
        const countrymatch = await Country.findAll({
            where: {
              id: countryId,
            },
        });
          
        
        const resact = await validateAct.addCountries(countrymatch);
        
        res.send(resact);
        

    } catch(error){
        res.status(404).json({message: 'Error, no se pudo crear actividad'})
    }
};

const modifyActivityHeadler = async (req, res) => {
   
    const {id} = req.params;
    const {name, difficulty, duration, seasson} = req.body;

    parseInt(difficulty);
    /* Convierte un argumento de tipo cadena y 
    devuelve un entero de la base especificada. */

    try{

        let detailAct = await Activity.findByPk(id);
        detailAct = await Activity.update(
            {name, difficulty, duration, seasson}, 
            {where: {id: id,}}
        );
       
        res.status(201).json({message: 'La actividad se ha modificado exitosamente!'}) 
              

    } catch (error) {
        res.status(404).json({message: 'La actividad no se ha podido crear'})
    }
    
};

const deleteActivityHeadler = async (req, res) => {
    
    const { id } = req.params
    
    try{

        let filaBorrada = await Activity.destroy({
            where:{id: id},
            truncate: {cascade: true}
        });
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
    modifyActivityHeadler,
    deleteActivityHeadler,
};
