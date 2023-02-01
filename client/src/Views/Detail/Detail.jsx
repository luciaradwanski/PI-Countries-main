import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, getCountryById } from "../../redux/actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import ActivityCard from "./ActivityCard";
import styled from "styled-components";

import CountryDetail from "./CountryDetail";


export const DivDetail = styled.div`
    margin-top: 120px;
`

const Detail = (props) => {

    const {id} = useParams();
    const myCountry = useSelector((state) => state.detail);
    // let activ = useSelector((state) => state.activities)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // const [country, setCountry] = useState({})
    // const [set, setSet] = useState(true)

    useEffect(() => {
        dispatch(getCountryById(id));
       
    }, [dispatch, id]);

    
    // const actividad = activ.filter(e => e.countries[0].ID === id)

    const clickHandle = (id) => {
        dispatch(deleteActivity(id))
        alert('la actividad fue eliminada')
        navigate('/countries')
    }

    return (
        <DivDetail>
            <Link to='/home'><button>Back to home</button></Link>
                
            <div>
                <h1>Country Details:</h1>
                    <div>
                        <CountryDetail
                            flags = {myCountry.flags}
                            name = {myCountry.name}
                            id = {myCountry.id}
                            continent = {myCountry.continent}
                            subregion ={myCountry.subregion}
                            capital = {myCountry.capital}
                            area = {myCountry.area}
                            population = {myCountry.population}
                        /> 
                    </div>
                    <div>
                        <h2>Actividades</h2></div>
                        {myCountry.activities && myCountry.activities.length > 0 ?myCountry.activities.map((a) => {
                            return (
                                <div>
                                    <ActivityCard
                                        name={a.name}
                                        duration={a.duration}
                                        difficulty={a.difficulty}
                                        seasson={a.seasson}
                                        id={a.id}
                                        key={a.id}
                                    />
                                    <button onClick={() => clickHandle(a.id)}>Delete activity</button>
                                </div>
                            )
                        }): <h3>No hay registros</h3>}
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

