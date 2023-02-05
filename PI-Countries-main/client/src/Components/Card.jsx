import React from "react";
import style from '../Comp Styles/Card.module.css'


export default function Card({name, image, continent, subregion, capital, area, population}){
    return(
        <div class={style.card}>
            <img src={image} alt="img not found" width="300px" height="200px"/>
            <h2>{name}</h2>
            <h3>{continent}</h3>
            
        </div>
    )
}