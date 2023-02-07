import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameCountry } from '../Actions/index';
import style from '../Comp Styles/SearchBar.module.css'


export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getNameCountry(name))
    }

    return(
        <div className={style.container}>
            <input className={style.input} type="text" placeholder='Buscar...' onChange={(e) => handleInputChange(e)}/>
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}