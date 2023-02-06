import React, { useState } from 'react';
import { useEffect,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetail } from '../Actions';
import styles from '../Comp Styles/Detail.module.css'
import Activity from './Activity';

export default function Detail(props){
    
    const {id} = useParams()
    const [set, setSet] = useState(true)

    const dispatch = useDispatch()
    const detail = useSelector((state) => state.detail)
    const activities = useSelector((state) => state.activities)
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch, props.match.params.id]);
    const activity = activities.filter((e) => e.paises[0].id === id)

    // const handleDelete = (e) => {
    //     dispatch(deleteActivity(id))
    //     alert('The activity was deleted')
    //     history.pushState('/countries')
    // }

    return (
        <div className={styles.supreme}>
            <div className={styles.ContainerDetails}>
                <div className={styles.ContainerData}>
                    <div className={styles.data1}>
                        <div className={styles.ContainerImage}>
                            <img src={detail.image} alt="" />
                        </div>
                        <h1> {detail.id}</h1>
                    </div>

                    {set ? <div className={styles.data2}>
                    <div>
                        <h2>Nombre {detail.name} </h2>
                        <h2>Continente {detail.continent}</h2>
                        <h3>Capital {detail.capital}</h3>
                        <h3>Area {detail.area} </h3>
                        <h3>Subregion {detail.subregion}</h3>
                        <h3>Poblacion {detail.population}</h3>
                    </div>
            
                    </div> 
                    : <div className={styles.data2}>
                        {detail.activities && detail.activities.length>0 ?detail.activities.map(el=>{
                            return(
                                <div >                                                                                               
                                    <Activity
                                        id = {el.id}
                                        name = {el.name}
                                        difficulty = {el.difficulty}
                                        duration = {el.duration}
                                        season = {el.season}
                                        key = {el.id}
                                    />
                                    {/* <button onClick={()=>handleClick(el.id)}>Eliminar Actividad</button> */}
                                </div>   
                            )
                        }      
                        ): <h4>No hay actividades registradas</h4>} 
                    </div>}

                </div>
                <div className={styles.ShowActivity}>
                    { set ? <button onClick={()=> setSet(!set)}>Mostrar Activades</button> : <button onClick={()=> setSet(!set)}>Mostras informacion</button>}
                </div>
                <div></div>
            </div>
        </div >
    )
}

