import React from "react";
import styled from "styled-components";

export const DivCard = styled.div`
    display: flex;
    flex-direction: row;
    
    background-color: rgba(0, 0, 0, 0.562);
    border-radius: 5px;
    width: 220px;  
    height: 170px; 
    padding: 40px;
    width: 100%;
    height: 300px;
    box-shadow: 22px 29px 34px -10px rgba(75, 74, 74, 0.75);
    transition: 1s;
    transition: transform 0.5s ease-out;

    h3{
        font-weight: 600;
        padding: 2px;
    }
    h5{
        padding: 0 1rem;
        font-size: 16px;
        font-weight: 300;
    }
`

const CardCountry = (props) => {
    return (
        <DivCard>
            <div>
                <img src={props.flags} alt="Imagen"/>

            </div>
            <div>
                <h3>Name: {props.name}</h3>
                <h5>Continent: {props.continent}</h5>
            </div>
            
        </DivCard>
    )
}

export default CardCountry;
