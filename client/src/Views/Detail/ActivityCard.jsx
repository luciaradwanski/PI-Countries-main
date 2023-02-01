import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, getActivityDetails } from "../../redux/actions";



const ActivityCard = ({activity}) => {
    const {id, name, difficulty, seasson, duration} = activity;
    const dispach = useDispatch()

    const deleteHandle = (id) => {
        dispach(deleteActivity(id));
        window.location.reload();
    }
    
    return (
        <div>
            <h3>{name}</h3>
            <div>
                <p>{`Season: ${seasson}`}</p>
                <p>{`Duration: ${duration}`}</p>
                <p>{`Difficulty: ${difficulty}`}</p>
                <button onClick={() => deleteHandle(id)}>Delete</button>
            </div>
        </div>
    )
}

export default ActivityCard;