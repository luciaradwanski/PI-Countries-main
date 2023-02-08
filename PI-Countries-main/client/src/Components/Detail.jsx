import React, { useState } from 'react';
import { useEffect,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { getDetail} from '../Actions';
import styles from '../Comp Styles/Detail.module.css'
import Activity from './Activity';
import CountryDetail from './CountryDetail';

export default function Detail(props){
    
    
    
    const dispatch = useDispatch()
    const detail = useSelector((state) => state.detail)
    
    const [set, setSet] = useState(true)
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
        
    }, [dispatch, props.match.params.id]);
    

    
    return (
        <div className={styles.container}>
            <div className={styles.ContainerDetails}>
                <div className={styles.ContainerButton}>
                    <Link to="/home">
                        <button className={styles.atras}>Back</button>
                    </Link>
                    <Link to="/activity">
                        <button className={styles.button}>Create</button>
                    </Link>
                </div>
                <div className={styles.ContainerData}>
                    <div className={styles.data1}>
                        <div className={styles.ContainerImage}>
                            <img src={detail.image} alt="" />
                        </div>
                        <h1> {detail.id}</h1>
                    </div>

                    {set ? <div className={styles.data2}>
                    <div>
                        <CountryDetail
                            name={detail.name}
                            continent={detail.continent}
                            capital={detail.capital}
                            area={detail.area}
                            subregion={detail.subregion}
                            population={detail.population}
                        />
                        {/* <h2>Nombre: {detail.name} </h2>
                        <h2>Continente: {detail.continent}</h2>
                        <h3>Capital: {detail.capital}</h3>
                        <h3>Area: {detail.area} </h3>
                        <h3>Subregion: {detail.subregion}</h3>
                        <h3>Poblacion: {detail.population}</h3> */}
                    </div>
            
                    </div> 
                    : <div className={styles.data2}>
                        {detail.activities && detail.activities.length>0 ?detail.activities.map((el, index)=>{
                            return(
                                <div style={{"display": "flex", "justifyContent" : "flex-start"}} key={index}>                                                                                               
                                    <Activity
                                        id = {el.id}
                                        name = {el.name}
                                        difficulty = {el.difficulty}
                                        duration = {el.duration}
                                        season = {el.season}
                                        key = {el.id}
                                    />
                                </div>   
                            )
                        }) : <h4>No hay actividades registradas</h4> } 
                    </div> }

                </div>
                <div className={styles.ShowActivity}>
                    { set ? <button onClick={()=> setSet(!set)}>Mostrar Activades</button> : <button onClick={()=> setSet(!set)}>Mostras informacion</button>}
                </div>
                
            </div>
        </div >
    )
}

