import React from "react";
import style from './Landing.module.css'

export default function Landing() {
    return(
        <div className={style.container}>
            <div className={style.title}>
                <h2>Countries</h2>
            </div>
            <div>
                <button className={style.btn}>Home</button>
            </div>
        </div>
    )
}