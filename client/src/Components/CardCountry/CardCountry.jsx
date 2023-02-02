import React from "react";
import styled from "styled-components";

export const DivCard = styled.div`
    
    background-color: rgba(0, 0, 0, 0.562);
    border-radius: 5px;
    width: 220px;  
    height: 170px; 
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: 300px;
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
                <h3>Name: {props.name}</h3>
                <h5>Continent: {props.continent}</h5>
            </div>
            
        </DivCard>
    )
}

export default CardCountry;
