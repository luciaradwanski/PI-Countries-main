import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivityDetails, getDetail } from "../../redux/actions";
import Activity from "./Activity";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../Components/Loading/Loading";

export const DivDetail = styled.div`
    margin-top: 120px;
`

const Detail = () => {

  

    const {id} = useParams();
    const myCountry = useSelector((state) => state.detail);
    const dispatch = useDispatch();
    
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        dispatch(getDetail(id));
        
        setLoader(true);
        const timer = setTimeout(() => {
            setLoader(false);
        }, 1000);
      
        return () => clearTimeout(timer);

    }, [dispatch, id]);

    return (
        <DivDetail>
      
            <Link to='/home'><button>Back to home</button></Link>
            <div>
                <div>
                    <div>
                        <h1>{myCountry.name}</h1>
                        <img src={myCountry.flags} alt="" />
                        <div>
                            <p>Country ID: {myCountry.id}</p>
                        </div>
                        <div>
                            <p>Capital: {myCountry.capital}</p>
                        </div>
                        <div>
                            <p>Continent: {myCountry.continent}</p>
                        </div>
                        <div>
                            <p>Area: {myCountry.area?.toLocaleString()} km2</p>
                        </div>
                        <div>
                            <p>Subregion: {myCountry.subregion}</p>
                        </div>
                        <div>
                            <p>Population: {myCountry.population?.toLocaleString()}</p>
                        </div>
                    </div>
                    <div>
                    {
                      myCountry.activities && myCountry.activities.length > 0 ? myCountry.activities.map(a =>
                        <Activity 
                          name={a.name}
                          season={a.seasson}
                          duration={a.duration}
                          difficulty={a.difficulty}
                          countryId={a.countryId}
                      />
                    )
                        : <p>No hay actividades registradas</p>
                    }
                    </div>
                </div>
            </div> 
            <Link to='/home'><button>Back to home</button></Link>
        </DivDetail>
    )
}

export default Detail;