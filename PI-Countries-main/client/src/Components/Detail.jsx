import React from 'react';
import { useEffect,  } from 'react';
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams, } from 'react-router-dom';
import { deleteActivity, getCountryDetail } from '../Actions';
import CountryDetail from './CountryDetail';



export default function Detail(props){
    const dispatch = useDispatch()
    const detail = useSelector((state) => state.detail)
    const [paises, setPaises] = useState({}); 

   
    useEffect(() => {
        dispatch(getCountryDetail(props.match.params.id))
    },[dispatch, props.match.params.id])

    const handleDelete = (e) => {
        dispatch(deleteActivity(id))
    }

    return (
        <div>
            
            {detail.length > 0 ? 
                <div>
                    <div>
                        <CountryDetail
                            image={detail.image}
                            name={detail.name}
                            id={detail.id}
                            continent={detail.continent}
                            subregion={detail.subregion}
                            capital={detail.capital}
                            area={detail.area}
                            population={detail.population}
                        />
                    </div>
                    <div>
                        <img src={detail.image} alt="imagen" />
                        <h1>Tourist Activities</h1>
                        {detail.activities && detail.activities.length > 0 ? detail.activities.map((el, index) => {
                            return (
                                <div>
                                    <Activity
                                        id={el.id}
                                        name={el.name}
                                        difficulty={el.difficulty}
                                        duration={el.duration}
                                        season={el.season}
                                        key={index}
                                    />
                                    <button>Delete Activity</button>
                                </div>
                            )
                        })}
                    </div>

                </div>
            }
            
        </div>
    )
}

