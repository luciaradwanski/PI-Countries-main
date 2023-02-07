import React from "react";
import { Link } from "react-router-dom";
import style from '../Comp Styles/NavBar.module.css'


export default function NavBar(){
    return(
        <div className={style.container}>
            <Link className={style.link} to='/home'>HOME</Link>
            <Link className={style.link} to='/about'>ABOUT</Link>
            <Link className={style.link} to='/activity'>CREATE ACTIVITY</Link>
        </div>
    )
}