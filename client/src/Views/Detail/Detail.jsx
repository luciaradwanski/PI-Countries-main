import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCountryDetail, getActivityDetail, getCountryById } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import ActivityCard from "./ActivityCard";
import styled from "styled-components";



export const DivDetail = styled.div`
    margin-top: 120px;
`

const Detail = () => {

    const {id} = useParams();
    const myCountry = useSelector((state) => state.detail);
    let activ = useSelector((state) => state.activities)
    const dispatch = useDispatch();
    const [country, setCountry] = useState({})
    const [set, setSet] = useState(true)
    useEffect(() => {
        dispatch(getCountryById(id));
        return () => {
            setSet(id)
        }
    }, [dispatch, id]);

    
    const actividad = activ.filter(e => e.countries[0].ID === id)

    return (
        <DivDetail>
            <Link to='/home'><button>Back to home</button></Link>
                
            <div>
                <h1>Country Details:</h1>
                    <div>
                        <h1>Country</h1>
                        <p>{myCountry.name}</p>
                        <img src={myCountry.flags} alt={myCountry.flags}/>
                        <h1>Country ID</h1>
                        <p>{myCountry.id}</p>
                        <h3>Capital</h3>
                        <p>{myCountry.capital}</p>
                        
                    </div>
                    <div>
                        <h3>Continent</h3>
                        <p>{myCountry.continent}</p>
                        <p>Area: {myCountry.area?.toLocaleString()} km2</p>
                        <p>Subregion: {myCountry.subregion}</p>
                        <p>Population: {myCountry.population?.toLocaleString()} Habitants</p>

                        {/* {actividad.activities?.length ? (
                            <div>
                                <h2>Activities</h2>
                                {actividad.activities?.map((a) => (
                                    <p style={{ paddingBottom: "10px" }} key={Math.random(0, 10)}>
                                        {a.name}.
                                    </p>
                                ))}
                            </div>
                        ) : ("")}  */}
                    </div>
                    <div><h2>Actividades</h2></div>
                    {/* <div>
                    {
                        actividad.activities && actividad.activities.length > 0 ? actividad.activities.map(a =>
                            <ActivityCard 
                                name={a.name}
                                seasson={a.seasson}
                                duration={a.duration}
                                difficulty={a.difficulty}
                                countries={a.countries}
                            />
                                                                              )
                        : <p>No hay actividades registradas</p>
                    }
                    </div> */}
                    
            </div>
        
        </DivDetail>
    )
}

export default Detail;

