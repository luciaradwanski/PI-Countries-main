import React, { useState, useEffect } from "react";
import { createActivity,getAllCountries} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
    const regexName = /^([a-zA-Z ]+)$/i;
    const regexNumber = /^[0-9]*$/i

    if (input.name && !regexName.test(input.name)) {
        errors.name = "The name can't include special characters or numbers";
    }
    if (!input.name) {
        errors.name = "Name is required";
    }
    if (input.name.length > 12) {
        errors.name = "Max 12 caracteres";
    }
    if (input.name.length < 3) {
        errors.name = "Min 3 caracteres";
    }
    if (input.duration && !regexNumber.test(input.duration)) {
        errors.duration = "Solo numeros"
    }
    if (!input.duration) {
        errors.duration = "Completar el campo de duracion por favor";
    }
    if(input.duration<0 || input.duration>24){
        errors.duration = 'La duración debe ser de 1 a 24 horas'
    }

    if (!input.countries.length) {
        errors.countries = "Country is required";
    }
    if (!input.difficulty<1 || input.difficulty>5) {
        errors.difficulty = "Difficulty is required";
    }
    if (!input.seasson) {
        errors.seasson = "Season is required";
    }
    return errors;
}


export default function ActivityCreate(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const activities = useSelector((state)=> state.allCountries) //duda si va con activities

    
    const [input,setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        seasson:"",
        countries: []
    })
    
    const [errors, setErrors] = useState({
        name:"",
        difficulty:"",
        duration:"",
        seasson:"",
        countries: []
    })

    useEffect(()=>{
        dispatch(getAllCountries())
    },[])

    const handleChange = (e) => {
        setInput({...input, [e.target.name]:e.target.value,})
        setErrors(validate({...input, [e.target.name]:e.target.value}))
        console.log(input)
    }
    const checkHandle = (e) => {
        if(e.target.checked) {
            setInput({...input, status: e.target.value})
            setErrors(validate({...input,status: e.target.value}))
        }
    }
    const handleSelect = (e) => {
        setInput({...input, countries: [...input.countries, e.target.value]})
        setErrors(validate({...input, countries:[...input.countries, e.target.value]}))
    }

    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.name && errors.difficulty && errors.duration && errors.countries && errors.seasson || input.name === "") {
            return alert("Completar los campos por favor")
        } else {
            const data = {
                name: "",
                difficulty: "",
                seasson: "",
                duration: "",
                countries: [],
            };
            data.name = input.name
            data.duration = input.duration
            data.difficulty = input.difficulty !== "" ? input.difficulty: ""
            data.seasson = input.seasson !== "" ? input.seasson : ""
            data.countries = input.countries.length === 0 ? [] : input.countries
            if (input.difficulty === "") {
                data.difficulty = "1"
            }
            if (input.seasson=== "") {
                data.seasson = "Summer"
            }
            if (input.countries.length === 0) {
                data.countries = ["PAN"]
            }
        
            if (input.difficulty === "" || input.seasson === "" || input.countries.length === 0) {
                dispatch(createActivity(data))
                alert("Activity Created");
                setInput({
                    name: "",
                    difficulty: "",
                    seasson: "",
                    duration: "",
                    countries: [],
                })
            } else {
                dispatch(createActivity(input));
                alert("Activity Created");
                setInput({
                    name: "",
                    difficulty: "",
                    seasson: "",
                    duration: "",
                    countries: [],
                });
            }
            
    
        }
    }

    const [open, setOpen] = useState(false);
    // function controller() {
    //   if (open === false && input.Country === "") {
    //     setOpen(false)
    //   } else {
    //     setOpen(true)
    //   }
    // }
    
    const deleteHandle = (e) => {
        setInput({...input, countries: []});
    }
    return(
        <div>
            <Link to='/home'><button>Back to Home</button></Link>
            <br />
            <h1>Crear Actividad Turística</h1>
            
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type='text' value={input.name} name='name' onChange={e=>handleChange(e)}></input>                            
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                        
                <div>
                    <label>Dificultad</label>
                    <input type='number' value={input.difficulty} name = 'difficulty' min='1' max='5' onChange={e=>handleChange(e)}></input>                            
                    {errors.difficulty && (<p>{errors.difficulty}</p>)}
                </div>

                <div>
                    <label>Duracion</label>
                    <input type='text' value={input.duration} name = 'duration' onChange={e=>handleChange(e)}></input>                            
                    {errors.duration && (<p>{errors.duration}</p>)}
                </div>
                        
                <div>
                    <label>Temporada</label>
                    <select name="seasson" onChange={e => handleChange(e)}>
                        <option value={"Summer"}>Verano</option>
                        <option value={"Autumn"}>Otoño</option>
                        <option value={"Winter"}>Invierno</option>
                        <option value={"Spring"}>Primavera</option>
                    </select>
                    {errors.seasson && (<p>{errors.seasson}</p>)}
                </div>
                <div>
                    <label>Countries</label>
                    <select onChange={(e)=>handleSelect(e)} name="countries">
                        {activities.map((c)=>(
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>       
                    
                </div>                         
                {input.countries.length === 0 && (<p>{errors.countries}</p>)}

                {input.countries.length !== 0 && 
                    <div>
                        <ul><li>{input.countries.map((c) => c + ", ")}</li></ul>
                    </div>}       
                <button type="submit">Crear Actividad</button>                        
                    
            </form>
            
        </div>
    )
}