import React, { useState } from "react";
import {useEffect } from "react"; //useState
import { useDispatch, useSelector } from "react-redux";
import {filterByContinent, filterByPopulation, getCountries, orderByName } from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import style from '../Comp Styles/Home.module.css'
import SearchBar from "./SearchBar";

export default function Home(){

    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    const [, setOrden] = useState('') //orden
    const [, setPopulation] = useState('') //population
    

    const [currentPage, setCurrentPage] = useState(1)
    const [charactersPerPage, ] = useState(9) //setCharactersPerPage
    const indexOfLastCharacter = currentPage * charactersPerPage
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
    const currentCountries = allCountries.slice(indexOfFirstCharacter, indexOfLastCharacter)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getCountries());
    }

    const handleFilterContinent = (e) => {
        dispatch(filterByContinent(e.target.value))
    }

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleFilterPopulation = (e) => {
        dispatch(filterByPopulation(e.target.value));
        setCurrentPage(1);
        setPopulation(`Filtrado ${e.target.value}`)
    }

    
    return(
        <div>
            <Link to='/activity'>Crear actividades</Link>
            <h1>APP OF THE COUNTRIES</h1>
            <button onClick={(e) => handleClick(e)}>Volver a cargar todos los paises</button>
            <div >
                <div class={style.filtrado}>

                <select onChange={(e) => handleSort(e)}>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select onChange={(e) => handleFilterContinent(e)}>
                    <option value="All">Todos</option>
                    <option value="Europe">Europe</option>
                    <option value="South America">South America</option>
                    <option value="Asia">Asia</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Africa">Africa</option>
                    <option value="North America">North America</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <select onChange={(e) => handleFilterPopulation(e)}> 
                    <option value="ASC">Population Max</option>
                    <option value="DES">Population Min</option>
                </select>
                </div>

                <Paginado
                    charactersPerPage={charactersPerPage}
                    allCountries={allCountries.length}
                    paginado={paginado}

                />
                <SearchBar/>
                <div class={style.cards}>

                    {currentCountries.map( el => {
                        return (
                            <fragment>
                                <Link to={"/home" + el.id}>
                                    <Card name={el.name} continent={el.continent} image={el.image}/>
                                </Link>
                            </fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}