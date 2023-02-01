import React, { useState, useEffect } from "react";
import { createActivity, getActivities, getAllCountries} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import trash from '../../Assets/delete.png'
import styled from "styled-components";



export const Form = styled.form`
    margin-top: 120px;
    display: flex;
    flex-direction: column;
`

/* Cuando yo escriba esta información que quiero que suceda con esa informacion
quiero guardarla en un Estado, un estado que va a ser un objeto que diga que tenga una 
propiedad name, duration, difficulty, seasson, Cuando yo escriba en name-->(nombre de act)
se va a escribir en el objeto. El formulario sea el reflejo de mi estado y que el estado 
sea un reflejo del formulario. Estado y formulario tienen que tener en todo momento
la misma cosa escrita en uno que en otro. Estado--> estado interno del componente*/



function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Debe ingresar un nombre'
    }if(!/[A-Za-z0-9]/.test(input.name)){
        errors.name = 'El nombre admite solo letras, numeros y espacios'     
    }if(!input.difficulty){
        errors.difficulty = 'Debe ingresar un valor entre 1 y 5'
    }if(input.difficulty<1 || input.difficulty>5){
            errors.difficulty = 'Debe ingresar un valor entre 1 y 5'
    }if(!input.duration){
        errors.duration = 'Debe ingresar la duración en horas'
    }if(input.duration<0 || input.duration>24){
        errors.duration = 'La duración debe ser de 1 a 24 horas'
    }if(!input.seasson){
        errors.seasson = 'Debe seleccionar una temporada'
    }if(input.countries.length === 0){
        errors.countries = 'Debe seleccionar al menos un país'    
    }
    return errors;
}


export default function ActivityCreate(){

    const dispatch = useDispatch()
    const history = useNavigate()

    const countries = useSelector((state)=> state.allCountries)
    const alertas = useSelector((state)=> state.alertas)

    const [errors, setErrors] = useState({})

    const [input,setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        seasson:"",
        countries: []
    })

    useEffect(()=>{
        dispatch(getAllCountries())
    },[dispatch])

    function handleChange(e){

        if(e.target.value !=='Elegir Temporada'){

            setInput({
                ...input,
                [e.target.name]: e.target.value
            })       
    
             setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }  
    }

    function handleSelect(e){
        if(e.target.value!=='Elegir País'){

            setInput({
                ...input,
                countries: [...input.countries, e.target.value]
            })
    
            setErrors(validate({
                ...input,
                countries: [...input.countries, e.target.value]
            }))  
          }               
    }

    

    function handleSubmit(e){
        e.preventDefault()

        if(JSON.stringify(errors) !== '{}' || (input.name==='' && input.difficulty==='' & input.duration===''&& input.seasson==='' && input.countries.length<1)){
            alert('Verifique los datos ingresados')
        
        }else if(JSON.stringify(errors) === '{}'){

            dispatch(createActivity(input))

            console.log(alertas)
                        
            setInput({
                name:"",
                difficulty:"",
                duration:"",
                seasson:"",
                countries: []
            })

            setTimeout(() => {
                history('/countries')
            }, 1000);                       
           
        }             
    }

    function handleDelete(e){
        
        setInput({
            ...input, 
            countries: input.countries.filter(c => c!==e)
        })

        setErrors(validate({
            ...input,
            countries: input.countries.filter(c => c!==e)
        }))      

    }
    

    return(
        <div>
            
            <div>

                <div>
                    <h2>Crear Actividad Turística</h2>
                </div>

                <div>

                    <form onSubmit={(e)=>handleSubmit(e)}>

                        <div>
                            <h3>Nombre:</h3>
                            <input 
                                type='text' 
                                value={input.name} 
                                name = 'name'
                                onChange={e=>handleChange(e)}>
                            </input>                            
                        </div>
                        <div>
                            {errors.name && (<p>{errors.name}</p>)}
                        </div>

                        <div>
                            <h3>Dificultad:</h3>
                            <input 
                                type='number' 
                                value={input.difficulty} 
                                name = 'difficulty' 
                                min='1' max='5'
                                onChange={e=>handleChange(e)}>
                            </input>                            
                        </div>
                        <div>
                             {errors.difficulty && (<p>{errors.difficulty}</p>)}
                        </div>

                        <div>
                            <h3>Duración:</h3>
                            <input 
                                type='text' 
                                value={input.duration} 
                                name = 'duration'
                                onChange={e=>handleChange(e)}>
                            </input>                            
                        </div>
                        <div>
                            {errors.duration && (<p>{errors.duration}</p>)}
                        </div>

                        <div >
                            <h3>Temporada:</h3>
                            <select value={input.seasson} name='seasson' onChange={e=>handleChange(e)}>
                                <option value="Elegir Temporada">Elegir Temporada</option>
                                <option value='Summer'>Verano</option>
                                <option value='Autumn'>Otoño</option>
                                <option value='Winter'>Invierno</option>
                                <option value='Spring'>Primavera</option>
                            </select>                            
                        </div>
                        <div>
                            {errors.seasson && (<p>{errors.seasson}</p>)}
                        </div>
                        <div>
                            <h3>Paises:</h3>
                            <select onChange={e=>handleSelect(e)}>
                            <option value="Elegir País">Elegir País</option>{/* <option disabled selected>Elegir País</option> */}
                                {countries.map((c)=>{
                                    return <option key={c.id} value={c.name}>{c.name}</option>  //ordenar por orden alfabetico
                                })}
                            </select>                            
                        </div>
                        <div>
                            {input.countries.length === 0 && (<p>{errors.countries}</p>)}
                        </div>
                        
                        <div>
                            <button>Crear Actividad</button>                                          
                        </div>                        
                    </form>
                </div>               
                
                

            </div>

            <div>
                    {input.countries.map((e) => (
                        <ul>
                            <h4>{e}</h4>  {/* li */}
                            <button key={e.id} onClick={()=>handleDelete(e)}>{e}</button>
                        </ul>                          
                        ))}               
                </div>
            
        </div>
    )
}