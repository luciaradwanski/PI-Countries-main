import React from "react";
import style from './Loading.module.css'

export default function Loading(){
    return(
        <div className={style.container}>
            <h1 className={style.title}>APP COUNTRIES</h1>
            <h2 className={style.title}>Explore the World...</h2>
            <button className={style.btn}>LET'S GO</button>
        </div>
    )
}