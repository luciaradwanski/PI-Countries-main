import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postActivity, getCountries } from '../Actions/index';



function validate(input){
    let errors = {};
    if (!input.name) { errors.name = 'Debe ingresar un nombre'} 
    if (!/[A-Za-z0-9]/.test(input.name)) { errors.name = 'El nombre admite solo letras, numeros y espacios'}
    if(!input.difficulty){ errors.difficulty = 'Debe ingresar un valor entre 1 y 5'}
    if(input.difficulty<1 || input.difficulty>5){errors.difficulty = 'Debe ingresar un valor entre 1 y 5' }
    if(!input.duration){ errors.duration = 'Debe ingresar la duración en horas' }
    if(input.duration<0 || input.duration>24){ errors.duration = 'La duración debe ser de 1 a 24 horas' }
    if(!input.season){ errors.season = 'Debe seleccionar una temporada'}
    if(input.paises.length === 0){ errors.paises = 'Debe seleccionar al menos un país'}
    return errors;
}

export default function ActivityCreate(){

    const countries = useSelector((state) => state.countries)
    const alertas = useSelector((state) => state.alertas)

    const dispatch = useDispatch()
    const history = useHistory()
    

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        paises: []
    })

    
    const [error, setError] = useState({});


    useEffect(() => {
        dispatch(getCountries())
    },[dispatch])

    const handleChange = (e) => {
        console.log(input.paises.length)
        setInput({...input, [e.target.name] : e.target.value})
        console.log(input)
        setError(validate({...input, [e.target.name]: e.target.value}))
    }

    const handleCheck = (e) => {
        if(e.target.checked){
            setInput({ ...input, status: e.target.value })
            setError(validate({...input, status: e.target.value}))
        }
    }

    const handleSelect = (e) => {
        if(e.target.value!=='Elegir País'){
            setInput({ ...input, paises: [...input.paises, e.target.value]})
            setError(validate({ ...input, paises: [...input.paises, e.target.value]}))  
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(JSON.stringify(error) !== '{}' || (input.name==='' && input.difficulty==='' & input.duration===''&& input.season==='' && input.paises.length<1)){
            alert('Verifique los datos ingresados')
        
        }else if(JSON.stringify(error) === '{}'){

            dispatch(postActivity(input))
            console.log(alertas)
                        
            setInput({
                name:"",
                difficulty:"",
                duration:"",
                season:"",
                paises: []
            })

            setTimeout(() => {
                history.push('/countries')
            }, 1000);                       
           
        }            
    }

    const handleDelete = (e) => {
        setInput({ ...input, paises: input.paises.filter(c => c!==e)})
        setError(validate({ ...input, paises: input.paises.filter(c => c!==e) }))   
    }


    return(
        <div>
            <div>
                <Link to='/home'><button>Volver</button></Link>
                <h1>Crea tu Actividad Turística</h1>
                
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Name</label>
                        <input onChange={(e) => handleChange(e)} type='text' value={input.name} name='name'></input>                            
                        {error.name && (<p>{error.name}</p>)}
                    </div>
                            
                    <div>
                        <label>Difficulty</label>
                        <input onChange={(e) => handleChange(e)} type='number' value={input.difficulty} name = 'difficulty' min='1' max='5'></input>                            
                        {error.difficulty && (<p>{error.difficulty}</p>)}
                    </div>

                    <div>
                        <label>Duration</label>
                        <input onChange={(e) => handleChange(e)} type='text' value={input.duration} name = 'duration'></input>                            
                        {error.duration && (<p>{error.duration}</p>)}
                    </div>
                            
                    <div>
                        <label>Season</label>
                        <select name="Temporada" onChange={e => handleChange(e)}>
                            <option value="Verano">Verano</option>
                            <option value="Otoño">Otoño</option>
                            <option value="Invierno">Invierno</option>
                            <option value="Primavera">Primavera</option>
                        </select>
                        {/* <label><input onChange={(e) => handleCheck(e)} type="checkbox" name='Verano' value='Verano'/>Summer</label>
                        <label><input onChange={(e) => handleCheck(e)} type="checkbox" name='Primavera' value='Primavera'/>Spring</label>
                        <label><input onChange={(e) => handleCheck(e)} type="checkbox" name='Otoño' value='Otoño'/>Autumn</label>
                        <label><input onChange={(e) => handleCheck(e)} type="checkbox" name='Invierno' value='Invierno'/>Winter</label> */}
                        {error.season && (<p>{error.season}</p>)}
                    </div>
                    
                    <h3>Paises:</h3>
                    <select onChange={e=>handleSelect(e)}>
                        <option value="Elegir País">Elegir País</option>{/* <option disabled selected>Elegir País</option> */}
                        {countries.map((c)=>{
                            return <option key={c.id} value={c.name}>{c.name}</option>  //ordenar por orden alfabetico
                        })}
                    </select>    
                    <ul><li>{input.paises.map(el => el + " ,")}</li></ul>                        

                    <button type="submit">Crear Actividad</button>                        
                        
                </form>
                
            </div>

            <div>
                {input.paises.map((e) => (
                    <ul>
                        <h4>{e}</h4>
                        <button onClick={()=>handleDelete(e)}>X</button>
                    </ul>                          
                ))}  
            </div>
        </div>
    )
}