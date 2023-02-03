import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../Redux/Actions/Actions";
import { searchValidator } from "../Utils/searchValidator";
import style from './Search.modules.css'


export default function () {

    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValidator(input.trim(), setError)) {
            setInput("");
            dispatch(getCountriesByName(input));
        }
    };

    useEffect(() => {
        searchValidator(input, setError);
    }, [input]);
    
    
    return(
        <div className={style.container}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className={style.input} id="search" name="search" type="text"  width="61%" value={input} onChange={handleInput} placeholder="Search here..."/>
                <button className={style.button} id="btn" disabled type="submit">Search</button>
                {error && (<span className={style.span}>{error}</span>)}
            </form>
        </div>
    )
}