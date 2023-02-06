import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postActivity, getCountries } from '../Actions/index';



// function validate(input){
//     let errors = {};
//     if (!input.name) { errors.name = 'Debe ingresar un nombre'} 
//     if (!/[A-Za-z0-9]/.test(input.name)) { errors.name = 'El nombre admite solo letras, numeros y espacios'}
//     if(!input.difficulty){ errors.difficulty = 'Debe ingresar un valor entre 1 y 5'}
//     if(input.difficulty<1 || input.difficulty>5){errors.difficulty = 'Debe ingresar un valor entre 1 y 5' }
//     if(!input.duration){ errors.duration = 'Debe ingresar la duración en horas' }
//     if(input.duration<0 || input.duration>24){ errors.duration = 'La duración debe ser de 1 a 24 horas' }
//     if(!input.season){ errors.season = 'Debe seleccionar una temporada'}
//     if(!input.paises.length){ errors.paises = 'Debe seleccionar al menos un país'}
//     return errors;
// }

export default function ActivityCreate(){

    const countries = useSelector((state) => state.countries)

    const dispatch = useDispatch()
    const history = useHistory()
    

    const [input, setInput] = useState({
        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        paises: []
    })

    
    // const [error, setError] = useState({});


    useEffect(() => {
        dispatch(getCountries())
    },[])

    const handleChange = (e) => {
        setInput({...input, [e.target.name] : e.target.value})
        console.log(input)
        // setError(validate({...input, [e.target.name]: e.target.value}))
    }

    const handleSelect = (e) => {
        setInput({ ...input, paises: [...input.paises, e.target.value]})
        // setError(validate({ ...input, paises: [...input.paises, e.target.value]}))  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
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

    // const handleDelete = (e) => {
    //     setInput({ ...input, paises: input.paises.filter(c => c!==e)})
    //     setError(validate({ ...input, paises: input.paises.filter(c => c!==e) }))   
    // }


    return(
        
            <div>
                <Link to='/home'><button>Volver</button></Link>
                <h1>Crea tu Actividad Turística</h1>
                
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Name</label>
                        <input onChange={(e) => handleChange(e)} type='text' value={input.name} name='name'></input>                            
                        {/* {error.name && (<p>{error.name}</p>)} */}
                    </div>
                            
                    <div>
                        <label>Difficulty</label>
                        <input onChange={(e) => handleChange(e)} type='number' value={input.difficulty} name = 'difficulty' min='1' max='5'></input>                            
                        {/* {error.difficulty && (<p>{error.difficulty}</p>)} */}
                    </div>

                    <div>
                        <label>Duration</label>
                        <input onChange={(e) => handleChange(e)} type='number' value={input.duration} name = 'duration'></input>                            
                        {/* {error.duration && (<p>{error.duration}</p>)} */}
                    </div>
                            
                    <div>
                        <label>Season</label>
                        <select onChange={e => handleChange(e)} name='season'>
                            <option value={"Verano"}>Verano</option>
                            <option value={"Otoño"}>Otoño</option>
                            <option value={"Invierno"}>Invierno</option>
                            <option value={"Primavera"}>Primavera</option>
                        </select>
                    </div>
                    
                    <h3>Paises:</h3>
                    <select onChange={e=>handleSelect(e)} name='paises'>
                        
                        {countries.map((c, index)=>( 
                            <option key={index} value={c.id}>{c.name}</option>  //ordenar por orden alfabetico
                        ))}
                    </select>    
                    <ul><li>{input.paises.map(el => el + " ,")}</li></ul>                        

                    <button type="submit">Crear Actividad</button>                        
                        
                </form>
                
            </div>

            
    )
}

