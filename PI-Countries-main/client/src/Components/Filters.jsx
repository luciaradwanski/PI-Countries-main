import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterContinent, filterByActivity, orderCountries } from "../Redux/Actions/Actions";
import Search from "./Search";
import style from './Filters.modules.css'
export default function Filters(){

    const continents = useSelector((state) => state.countriesReducer.continents);
    const activities = useSelector((state) => state.activitiesReducer.activities);
    const dispatch = useDispatch();

    const handleFilter = (e) => {
        e.target.name === "continents"
        ? dispatch(filterContinent(e.target.value))
        : dispatch(filterByActivity(e.target.value));
    };

    const handleSort = (e) => {
        dispatch(orderCountries(e.target.value));
    };

    return(
        <div className={style.container}>
            <Search/>
            <div className={style.container}>
                <label htmlFor="sort">Order-Sort</label>
                <select name="alphabetic" id="sort" onChange={handleSort}>
                    <option value="alphabetic">Alphabetic</option>
                    <option value="ascendant">A-Z</option>
                    <option value="descendant">Z-A</option>
                </select>
                <select name="population" onChange={handleSort}>
                    <option value="sort">Population</option>
                    <option value="major">Max - Min</option>
                    <option value="minor">Min - Max</option>
                </select>
            </div>
            <div className={style.container}>
                <label htmlFor="continents">Filter</label>
                <select name="continents" id="continents" onChange={handleFilter}>
                    <option value="continents">Continents</option>
                        {continents.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                </select>
                <select name="activities" id="activities" onChange={handleFilter}>
                    <option value="activities">Activities</option>
                    {activities.map((a) => (
                        <option key={a.id} value={a.name}>{a.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}