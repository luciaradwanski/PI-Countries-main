import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, getActivities, filterByPopulation, filterByArea, filterBySeasson, filterByDifficulty, filterByActivity, filterByContinent, filterByName} from '../../redux/actions';
import { Link } from 'react-router-dom';
import CardCountry from '../../Components/CardCountry/CardCountry';
import Paginado from '../../Components/Paginado/Paginado';
import styled from 'styled-components';

/* Styles de mi Home */
export const DivContainerHome = styled.div`
  margin-top: 120px;
  
  
`
export const DivFiltros = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    border-radius: 20px;
    margin-bottom: 40px;
    margin-top: 40px;
    background-color: black;
    opacity: 80%;
    padding: 20px;
   
`

export const Select = styled.select`
    background-color: whitesmoke;
    border: none;
    color: black;
    &:hover{
        color: blue;
    }
`

const Home = () => {

    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.allCountries)
    const allActivities = useSelector(state => state.activities);
     
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, ] = useState(9) //setCountriesPerPage
    
    const indexOfLastCountry = currentPage * countriesPerPage; /* 1 por 10 = 10 */
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; /* 10 menos 10 = 0 */
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry );
    /* Pag 1 ----> 0 al 10-----> entran 9 countries */
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
     
     

    useEffect(() => {
        setLoading(true);
        dispatch(getAllCountries());
        dispatch(getActivities());
        setLoading(false);
    }, [dispatch]);

    /* Handler que devuelve todos los countries--> ALL vuelve a cargarnos todos los paises*/
    const handleClick = (e) => {
        e.preventDefault(); //se pone para que no se rompa la pag
        dispatch(getAllCountries());
    }

    
    /*Filtro por Nombre ASC y DESC */
    const [, setSort] = useState(""); 
    /* Estado local vacio. Para cuando yo seteo la pag setCurrentPage(1) me modifique el estado local y se renderice setSort(value)  */
    const handleFilterByName = (e) => {
        const value = e.target.value;
        if (allCountries.length > 0) {
            dispatch(filterByName(value));
            setSort(value);
            setCurrentPage(1);
        }
    };
    
    /* Handler que devuelve por continente */

    const handleFilterByContinent = (e) => {
        const value = e.target.value;
        dispatch(filterByContinent(value));
        setCurrentPage(1);
    };

    /*Filtro por Población MIN MAX */

    const [, setPopulation] = useState(""); //population
  
    const handleFilterByPopulation = (e) => {
        const value = e.target.value;
        dispatch(filterByPopulation(value));
        setPopulation(value);
        setCurrentPage(1);
    };

    /*Filtro por Area KM */

    const [, setArea] = useState("") //area
  
    const handlerFilterArea = (e) => {
        const value = e.target.value;
        dispatch(filterByArea(value));
        setArea(value);
        setCurrentPage(1)
    }

     /*Filtro por Temporadas */
  
    const handleFilterBySeasson = (e) => {
        const value = e.target.value;
        dispatch(filterBySeasson(value));
        setCurrentPage(1);
    };

    /*Filtro por Dificultad de Tarea */

    const [, setDifficultyFilter] = useState(""); //difficultyFilter
  
    const handleFilterByDifficulty = (e) => {
        const value = e.target.value;
        dispatch(filterByDifficulty(value));
        setDifficultyFilter(value);
        setCurrentPage(1);
    };

    /* Filtro por Actividad*/

    const handleFilterByActivity = (e) => {
        const value = e.target.value;
        dispatch(filterByActivity(value));
        setCurrentPage(1);
    };
  
    const [, setLoading] = useState(false); //loading
    

    


    
    return(        
            <DivContainerHome >
                <button onClick={(e) => handleClick(e)}>Cargar todos</button>
                <DivFiltros>
                    <Select name='alfabeticFilter' onChange = {(e) => handleFilterByName(e)}>
                        <option value="Elegir Orden" disabled selected >Elegir Orden</option>
                        <option value="ASC" label="Name (A-Z)">Ascendente</option>
                        <option value="DES" label="Name (Z-A)">Descendente</option>
                    </Select>
                    <Select onChange = {e => handleFilterByContinent(e)}>
                        <option value="Elegir Continente" disabled selected>Elegir Continente</option>
                        <option value="All">Todos</option>
                        <option value="South America">South America</option>
                        <option value="North America">North America</option>
                        <option value="Europe">Europe</option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antarctica</option>
                    </Select>
                    <Select name='attributeFilter' onChange = {(e) => handleFilterByPopulation(e)}>
                        <option value="Elegir Tipo" disabled selected>Elegir Tipo</option>
                        <option value= 'ASC' label="Population (Asc)" >Population Min</option>
                        <option value= 'DES' label="Population (Desc)">Population Max</option>
                    </Select>
                    <Select name="areaSort" onChange={(e) => handlerFilterArea(e)}>
                        <option value="ASC" label="Area (Asc)">Area ascendente</option>
                        <option value="DES" label="Area (Desc)">Area descendente</option>
                    </Select>
                    <Select name="seasson" onChange={(e) => handleFilterBySeasson(e)}>
                        <option value="Spring" label="Spring">Spring</option>
                        <option value="Summer" label="Summer">Summer</option>
                        <option value="Autumn" label="Autumn">Autumn</option>
                        <option value="Winter" label="Winter">Winter</option>
                    </Select>
                    <Select name="difficulty" onChange={(e) => handleFilterByDifficulty(e)}>
                        <option value="1" label="1">1</option>
                        <option value="2" label="2">2</option>
                        <option value="3" label="3">3</option>
                        <option value="4" label="4">4</option>
                        <option value="5" label="5">5</option>
                    </Select>
                    <Select name="activities" onChange={(e) => handleFilterByActivity(e)}>
                        <option value="Cycling" label="Cycling">Cycling</option>
                        <option value="Mountain biking" label="Mountain biking">Mountain biking</option>
                        <option value="Walking" label="Walking">Walking</option>
                        <option value="Hiking" label="Hiking">Hiking</option>
                        <option value="Fishing" label="Fishing">Fishing</option>
                        <option value="Canoeing and water sports" label="Canoeing and water sports">Canoeing and water sports</option>
                        <option value="Camping" label="Camping">Camping</option>
                        <option value="Safari" label="Safari">Safari</option>
                        <option value="Swimming" label="Swimming">Swimming</option>
                        <option value="Sailing" label="Sailing">Sailing</option>
                        <option value="Windsurfing" label="Windsurfing">Windsurfing</option>
                        <option value="Kayaking" label="Kayaking">Kayaking</option>
                        <option value="Water polo" label="Water polo">Water polo</option>
                        <option value="Snowboarding" label="Snowboarding">Snowboarding</option>
                        {allActivities && allActivities.map((act) => {
                            return <option value= {act.name}>{act.name}</option>
                        })}   
                    </Select>
                    
                </DivFiltros>
                
                <div>
                    {currentCountries?.map((el) =>{
                        return(
                            <div>
                                <Link to = {`/countries/countries/${el.id}`}>
                                    <CardCountry
                                        name = {el.name}
                                        flags = {el.flags}
                                        continent = {el.continent}
                                        key = {el.id}
                                    />                                
                                </Link>                                
                            </div>
                        );                        
                    })}
                    <Paginado
                        countriesPerPage={countriesPerPage}
                        allCountries={allCountries.length}
                        paginado={paginado}
                    />
                </div>   

                

                
                 
                
            </DivContainerHome>  
    )
}



export default Home;
