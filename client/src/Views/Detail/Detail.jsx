import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCountryDetail, getCountryById } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";



export const DivDetail = styled.div`
    margin-top: 120px;
`

const Detail = () => {

    const params = useParams();
    const myCountry = useSelector((state) => state.detail);
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getCountryById(params.id));
        return () => {
            dispatch(emptyCountryDetail())
        }

    }, [dispatch, params.id]);

    return (
        <DivDetail>
      
            <Link to='/home'><button>Back to home</button></Link>
                <div>
                    <div>
                        <h1>Country Details:</h1>
                        <div>
                            <h1>{myCountry.name}</h1>
                            <img src={myCountry.flags} alt={myCountry.flags}/>
                            <div><p>Country ID: {myCountry.id}</p></div>
                            <div><p>Capital: {myCountry.capital}</p></div>
                            <div><p>Continent: {myCountry.continent}</p></div>
                            <div><p>Area: {myCountry.area?.toLocaleString()} km2</p></div>
                            <div><p>Subregion: {myCountry.subregion}</p></div>
                            <div><p>Population: {myCountry.population?.toLocaleString()} Habitants</p></div>
                        </div>
                        
                        <div>
                            {myCountry.activities?.length ? (
                                <div>
                                <h2>Activities</h2>
                                {myCountry.activities?.map((a) => (
                                <p key={Math.random(0, 10)}>
                                    {a.name}.
                                </p>
                            ))}
                        </div> ) : ("")}
                    </div>
                </div>
            </div> 
        </DivDetail>
    )
}

export default Detail;