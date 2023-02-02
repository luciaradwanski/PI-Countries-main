import React, { useState, useEffect } from "react";
import { createActivity,getAllCountries} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const DivForm = styled.div`
    background-image: url(https://images.pexels.com/photos/2748018/pexels-photo-2748018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
    background-size: cover;
    background-position: center;
    height: 100vh;
    background-repeat: no-repeat;
    font-family:'Raleway';
    display: flex;
    flex-direction:column;   
    justify-content:space-evenly;
    h1{
        font-size: 40px;
        color: white;
    }
`

export const Form = styled.form`
    color: white;
    background-color: black;
    opacity: 80%;
    height: 200px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 60px;
`

export const DivSelect = styled.div`


   
`

export const ButtonUno = styled.div`
    color: red;
    background-color: white;
    opacity: 80%;
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transform: translateX(600px);
    border-radius: 40px;
    &:hover{
        background-color: darksalmon;
    }
`


export const ButtonDos = styled.div`
    color: red;
    background-color: white;
    opacity: 80%;
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transform: translateX(100px);
    transform: translateY(20px);
    border-radius: 40px;
    &:hover{
        background-color: darksalmon;
    }
`
export const Label = styled.label`
    padding-right: 10px;
    text-align: right;
    width: 30%;
    margin-right: 1rem;
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
    
    const deleteHandle = (e) => {
        setInput({...input, countries: []});
    }
    return(
        <DivForm>
            <Link to='/home'><button>Back to Home</button></Link>
            <br />
            <h1>Crear Actividad Turística</h1>
            
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <Label>Nombre</Label>
                    <input type='text' value={input.name} name='name' onChange={e=>handleChange(e)}></input>                            
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                        
                <div>
                    <Label>Dificultad</Label>
                    <input type='number' value={input.difficulty} name = 'difficulty' min='1' max='5' onChange={e=>handleChange(e)}></input>                            
                    {errors.difficulty && (<p>{errors.difficulty}</p>)}
                </div>

                <div>
                    <Label>Duracion</Label>
                    <input type='text' value={input.duration} name = 'duration' onChange={e=>handleChange(e)}></input>                            
                    {errors.duration && (<p>{errors.duration}</p>)}
                </div>
                        
                <div>
                    <Label>Temporada</Label>
                    <select name="seasson" onChange={e => handleChange(e)}>
                        <option value={"Summer"}>Verano</option>
                        <option value={"Autumn"}>Otoño</option>
                        <option value={"Winter"}>Invierno</option>
                        <option value={"Spring"}>Primavera</option>
                    </select>
                    {errors.seasson && (<p>{errors.seasson}</p>)}
                </div>
                <DivSelect>
                    <Label>Countries</Label>
                    <select onClick={() => setOpen(!open)} onChange={(e)=>handleSelect(e)} name="countries">
                    {!open && <option>Elegir pais</option>}
                        {activities.map((c)=>(
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>       
                    <ButtonDos type="button" onClick={e => deleteHandle(e)}>Clean</ButtonDos>
                </DivSelect>                         
                {input.countries.length === 0 && (<p>{errors.countries}</p>)}

                {input.countries.length !== 0 && 
                    <div>
                        <ul><li>{input.countries.map((c) => c + ", ")}</li></ul>
                    </div>}       
                <ButtonUno type="submit">Crear Actividad</ButtonUno>                        
                    
            </Form>
            
        </DivForm>
    )
}