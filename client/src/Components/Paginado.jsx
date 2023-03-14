import React from "react";
import style from '../Comp Styles/Paginado.module.css'

export default function Paginado({charactersPerPage, allCountries, paginado}){
    
    const pageNumbers = []

    for(let i = 1; i<=Math.ceil(allCountries/charactersPerPage);i++) {
        pageNumbers.push(i)
    }

    return(
        <nav class={style.container}>
            <ul class={style.paginado}>
                {pageNumbers && pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}