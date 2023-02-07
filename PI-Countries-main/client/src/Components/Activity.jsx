import React from 'react';
import { useSelector } from 'react-redux';
import style from '../Comp Styles/Activity.module.css'




export default function Activity({name, difficulty, duration, season}){

    return(
        <div class={style.container}>
            <h3>Activities: {name}</h3> 
            <div class={style.datos}>
                <h4 style={{"fontSize": "12px"}}>Dificultad: {difficulty}</h4>
                <h4 style={{"fontSize": "12px"}}>Duración: {duration} hs</h4>
                <h4 style={{"fontSize": "12px"}}>Temporada: {season}</h4>
            </div>     
            
        </div>
    );
}