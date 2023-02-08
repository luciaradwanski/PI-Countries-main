import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postActivity, getCountries } from '../Actions/index';
import style from '../Comp Styles/ActivityCreate.module.css'
import NavBar from './NavBar';

const validate = (input) => {
    let error = {};
    if(!/[A-Za-z0-9]/.test(input.name)){
        error.name = 'El nombre admite solo letras, numeros y espacios'     
    }if(!input.name){
        error.name = 'Debe ingresar un nombre'
    }if(!input.difficulty){
        error.difficulty = 'Debe ingresar un valor entre 1 y 5'
    }if(input.difficulty<1 || input.difficulty>5){
            error.difficulty = 'Debe ingresar un valor entre 1 y 5'
    }if(!input.duration){
        error.duration = 'Debe ingresar la duración en horas'
    }if(input.duration<0 || input.duration>24){
        error.duration = 'La duración debe ser de 1 a 24 horas'
    }if(!input.season){
        error.season = 'Debe seleccionar una temporada'
    }if(input.paises.length === 0){
        error.paises = 'Debe seleccionar al menos un país'    
    }
    return error;
}

export default function ActivityCreate(){

    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state) => state.countries)
    const [error, setError] = useState({});

    const [input, setInput] = useState({
        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        paises: [],
    })


    const handleChange = (e) => {
        setError(validate({
            ...input, 
            [e.target.name]: e.target.value
        }));
        setInput({
            ...input, 
            [e.target.name] : e.target.value
        });
        console.log(input)
    }

    const handleSelect = (e) => {
        setInput({ ...input, paises: [...input.paises, e.target.value]})
        setError(validate({ ...input, paises: [...input.paises, e.target.value]}))  
    }

    const handleSubmit = (e) => {

        if(input.name==='' && input.difficulty==='' & input.duration===''&& input.season==='' && input.paises.length<1) {
            alert('Check the data entered')
        } else {

            e.preventDefault()
            console.log(input)
            setError(validate({...input, [e.target.name]: e.target.value}));
            dispatch(postActivity(input))
            alert('Created Activity')
                            
            setInput({
                name:"",
                difficulty: 0,
                duration: 0,
                season:"",
                paises: []
            })
            history.push('/home')                     
        }
           
                  
    }

    const handleDelete = (e) => {
        setInput({ ...input, paises: input.paises.filter(c => c!==e)})
        
    }

    useEffect(() => {
        dispatch(getCountries())
    },[dispatch])

    return(
        
            <div className={style.container}>
                <NavBar/>
                <div className={style.containerBtn}>
                    <Link to='/home'><button>Back</button></Link>
                </div>
                <h1 className={style.title}>Create you Activity</h1>
                
                <div className={style.containerForm}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={style.name}>
                            <label className={style.nameLabel}>Name</label>
                            <input className={style.inputName} type='text' value={input.name} name='name' onChange={(e) => handleChange(e)}></input>                            
                            {error.name && (<p className={style.spanError}>{error.name}</p>)}
                        </div>
                        
                                
                        <div className={style.name}>
                            <label className={style.nameLabel}>Difficulty</label>
                            <input className={style.inputName} type='text' value={input.difficulty} name = 'difficulty' min='1' max='5' onChange={(e) => handleChange(e)}></input>                            
                            {error.difficulty && (<p className={style.spanError}>{error.difficulty}</p>)}
                        </div>
                        

                        <div className={style.name}>
                            <label className={style.nameLabel}>Duration</label>
                            <input className={style.inputName} type='number' value={input.duration} name = 'duration' onChange={(e) => handleChange(e)}></input>                            
                            {error.duration && (<p className={style.spanError}>{error.duration}</p>)}
                        </div>
                            
                                
                        <div className={style.name}>
                            <label className={style.nameLabel}>Season</label>
                            <select className={style.selectName} name='season' onChange={(e) => handleChange(e)}>
                                <option value={"Verano"}>Verano</option>
                                <option value={"Otoño"}>Otoño</option>
                                <option value={"Invierno"}>Invierno</option>
                                <option value={"Primavera"}>Primavera</option>
                            </select>
                            {error.season && (<p className={style.spanError}>{error.season}</p>)}
                        </div>
                        
                        
                        <div className={style.name}>

                            <label className={style.nameLabel}>Countries</label>
                            <select className={style.selectName} name='paises' onChange={e=>handleSelect(e)}>
                                
                                {countries.map((c, index)=>( 
                                    <option key={index} value={c.id}>{c.name}</option>  //ordenar por orden alfabetico
                                ))}
                            </select>    
                            {error.paises && (<p className={style.spanError}>{error.paises}</p>)}
                        </div>

                        {input.paises.length === 0 && 
                            <div className={style.name}>
                                <ul className={style.ulCenter}><li className={style.liCenter}>{input.paises.map(el => el + " ,")}</li></ul>                        
                            </div>
                        }
                        
                        <br />
                        <button className={style.buttonCrear} type="submit">Crear Actividad</button>                        
                            
                    </form>
                </div>
                
                <div class={style.countrySelected}>
                    {input.paises.map((e) => (
                        <ul className={style.ulCenter}><h4>{e}</h4><button className={style.buttonX} onClick={()=>handleDelete(e)}>X</button></ul>                          
                    ))}               
                </div>
            </div>

            
    )
}

