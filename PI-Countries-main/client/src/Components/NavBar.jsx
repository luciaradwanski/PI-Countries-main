// import React from "react";
// import style from '../CompStyle/NavBar.module.css'
// import { Link } from "react-router-dom";

// export default function NavBar (){

//     return(
//         <div class={style.container}>
//             <h3>Explore the World!</h3>
//             <Link to= '/countries'><button class={style.btnHome}>Home</button></Link>
//             <Link to= '/activity'><button class={style.btnActividad}>Nueva Actividad</button></Link>
//         </div>
//     )
// }

import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";



export default function NavBar(){
    return(
        <div>
            <SearchBar/>
            <Link to='/home'>HOME</Link>
            <Link to='/home/detail/:id'>DETAIL COUNRTY</Link>
            <Link to='activity'>CREATE ACTIVITY</Link>
        </div>
    )
}