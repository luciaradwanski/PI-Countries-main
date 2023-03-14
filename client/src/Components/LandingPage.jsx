import React from "react";
import { Link } from "react-router-dom";
import style from '../Comp Styles/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={style.container}>
            <h1  className={style.title}>Welcome to my Countries App</h1>
            <p className={style.p}>The world is a big place, conformed by countries with such incredible <br />
                cultures and full of activities that make them unique in every way. <br />
                Let's get together and see what it's got to show us.
            </p>
            <Link to='/home'>
                <button className={style.start}>Get Into</button>
            </Link>
        </div>
    )
}