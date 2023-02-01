import React from "react";
import { useSelector } from "react-redux";



const ActivityCard = () => {

    const activity = useSelector((state) => state.activities)
    
    return (
        <div>
            <h2>Name: {activity.name}</h2>
            <div>
                <span>Difficulty: </span> {activity.difficulty}
            </div>
            <div>
                <span>Duration: </span> {activity.duration} Days
            </div>
            <div>
                <span>Seasson: </span>{activity.seasson}
            </div>
            <div>
                <span>countries: </span>{activity.countries}
            </div>
        </div>
    )
}

export default ActivityCard;