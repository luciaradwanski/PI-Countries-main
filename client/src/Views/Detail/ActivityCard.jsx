import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteActivity, getActivityDetails } from "../../redux/actions";



// const ActivityCard = ({activity}) => {
//     const {id, name, difficulty, seasson, duration} = activity;
//     const dispach = useDispatch()

//     const deleteHandle = (id) => {
//         dispach(deleteActivity(id));
//         window.location.reload();
//     }
    
//     return (
//         <div>
//             <h3>{name}</h3>
//             <div>
//                 <p>{`Season: ${seasson}`}</p>
//                 <p>{`Duration: ${duration}`}</p>
//                 <p>{`Difficulty: ${difficulty}`}</p>
//                 <button onClick={() => deleteHandle(id)}>Delete</button>
//             </div>
//         </div>
//     )
// }

// export default ActivityCard;

export default function Activity({name, difficulty, duration, seasson}){
    return(
        <div>
            <h3>Actividad: {name}</h3> 
            <div>
                <h4>Dificultad: {difficulty}</h4>
                <h4>Duración: {duration} hs</h4>
                <h4>Temporada: {seasson}</h4>
            </div>     
            
        </div>
    );
}