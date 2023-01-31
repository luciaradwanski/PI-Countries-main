import React from "react";



const Activity = ({ name, difficulty, duration, seasson, countryId }) => {

    
    return (
        <div>
            <h2>Name: {name}</h2>
            <div>
                <span>Difficulty: </span> {difficulty}
            </div>
            <div>
                <span>Duration: </span> {duration} Days
            </div>
            <div>
                <span>Seasson: </span>{seasson}
            </div>
            <div>
                <span>countries: </span>{countries}
            </div>
        </div>
    )
}

export default Activity;