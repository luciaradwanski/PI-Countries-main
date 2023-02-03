import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from './NavBar.module.css'
export default function NavBar (){

    const navigate = useNavigate();

    return(
        <div class={style.container}>
            <h3>Explore the World!</h3>
            <Link to= '/countries'><button class={style.btnHome}>Home</button></Link>
            <Link to= '/activity'><button class={style.btnActividad}onClick={() => navigate("/create")}>Nueva Actividad</button></Link>
        </div>
    )
}