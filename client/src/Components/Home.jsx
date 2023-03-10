import React, { useState } from "react";
import {useEffect } from "react"; //useState
import { useDispatch, useSelector } from "react-redux";
import {filterByActivity, filterByContinent, filterByPopulation, getActivities, getCountries, orderByName } from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import style from '../Comp Styles/Home.module.css'
import SearchBar from "./SearchBar";
import NavBar from './NavBar'

export default function Home(){

    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const allActivities = useSelector((state) => state.activities)
    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    useEffect(() => {
        dispatch(getActivities())
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
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
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

    const handleFilterActivity = (e) => {
        if(e.target.value !=='Elegir Actividad'){
            dispatch(filterByActivity(e.target.value))
            setCurrentPage(1)
        }        
    }

    
    return(

        <div className={style.container}>
            <NavBar/>
            <Link to='/activity'><button className={style.button}>Create Activities</button></Link>
            <h1 className={style.title}>APP OF THE COUNTRIES</h1>
            <button onClick={(e) => handleClick(e)}>Reload all countries</button>
            <div>
                <div className={style.filtrado}>

                    <select className={style.select} onChange={(e) => handleSort(e)}>
                        <option value="asc">Ascendent</option>
                        <option value="desc">Descendent</option>
                    </select>
                    <select className={style.select} onChange={(e) => handleFilterContinent(e)}>
                        <option value="All">All</option>
                        <option value="Europe">Europe</option>
                        <option value="South America">South America</option>
                        <option value="Asia">Asia</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Africa">Africa</option>
                        <option value="North America">North America</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                    <select className={style.select} onChange={(e) => handleFilterPopulation(e)}> 
                        <option value="ASC">Population Max</option>
                        <option value="DES">Population Min</option>
                    </select>
                    <select className={style.select} onChange = {e => handleFilterActivity(e)}>                
                        <option value="Elegir Actividad" disabled selected>Choose Activity</option>
                        {allActivities && allActivities.map((act) => {
                            return <option value= {act.name}>{act.name}</option>
                        })}                
                    </select>
                </div>

                <Paginado
                    charactersPerPage={charactersPerPage}
                    allCountries={allCountries.length}
                    paginado={paginado}

                />
                <SearchBar/>
                <div className={style.cards}>

                    {currentCountries.map( (el) => {
                        return (
                            <div>
                                <Link className={style.link} to = {`/detail/${el.id}`}>
                                    <Card name={el.name} continent={el.continent} image={el.image} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}