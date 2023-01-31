import React from "react";
import styled from "styled-components";

export const DivCard = styled.div`
    background-color: rgba(0, 0, 0, 0.562);
    border-radius: 5px;
    width: 320px;
    height: 370px;

    box-shadow: 22px 29px 34px -10px rgba(75, 74, 74, 0.75);
    transition: 1s;
    transition: transform 0.5s ease-out;
`

const CardCountry = (props) => {
    return (
        <DivCard>
            <img src={props.flags} alt="Imagen"/>
            <h3>Name: {props.name}</h3>
            <h5>Continent: {props.continent}</h5>
            {/* <h5>Subregion: {props.subregion}</h5>
            <h5>Capital: {props.capital}</h5>
            <h5>Area: {props.area}</h5>
            <h5>Poblacion: {props.population}</h5> */}
        </DivCard>
    )
}

export default CardCountry;
