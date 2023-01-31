import React, { useState, useEffect } from "react";
import { createActivity, getActivities, getAllCountries} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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



function validate(input) {


    let errors = {};
    if(!input.name){
        errors.name = "La actividad debe tener un nombre"
    } else if(/^[a-zA-ZA-y\s]{3,80}$/.test(input.name)){
        errors.name = "Don't type numbers or special characters"
    }

    if(!input.difficulty) {
        errors.difficulty = "Please select a difficulty value between 1 and 5"
    }

    if(!input.duration) {
        errors.duration = "Please only type numbers" 
    }else if(!/[0-9]+[^]+[(^|, )(hora|dia|semana|año|mes)]/.test(input.duration)){
        errors.duration = 'Debe ser un numero seguido de un indicador de periodo (horas, dias, semanas, meses, años). Ejemplo: "1 dia"';
    }

    if(!input.seasson) {
        errors.seasson = "Please select a season"
    }

    if(input.countries.length === 0) {
        errors.countries = "Please select one or more countries"
    }

    return errors;
}

const ActivityCreate = () => {

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.allCountries)
    const allActivity = useSelector((state) => state.activities)
    
      
    const [form, setForm] = useState({
        name: "",
        duration: "",
        difficulty: "1",
        seasson: "Select here",
        countries: [],
    })

    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        duration: "",
        seasson: "",
        countries: "",
    });

    useEffect(() => {
        dispatch(getAllCountries())
        dispatch(getActivities())
    }, [dispatch])

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]:e.target.value })
        setErrors(validate({ ...form, [e.target.name]:e.target.value }))
    }
    
    const handleSelect = (e) => {
        setForm({ ...form, countries: form.countries.filter((c) => c.target.name)})
        // setErrors(validate({...form, countries:[...form.countries, e.target.value],}));
        
    }

    

    

    const submitHandler = (event) => {
        event.preventDefault();
        /* Si no hay errores en ninguno */
        function required() {
            if (!form.name) {
              setErrors({ ...errors, name: "This field cannot be empty" });
            } else if (!form.duration) {
              setErrors({ ...errors, duration: "This field cannot be empty" });
            } else if (form.seasson === "Select here...") {
              setErrors({ ...errors, season: "Please select one season" });
            } else if (!form.countries.length) {
              setErrors({
                ...errors,
                countries: "Please select one or more countries",
              });
            } else {
              return true;
            }
            return false;
        }

        if(!errors.name &&
            !errors.difficulty &&
            !errors.duration &&
            !errors.seasson &&
            !errors.countries &&
            required()) {
                try {
                    dispatch(createActivity(form));
                    alert("Activity created succesfully");
                    setInputs({
                      name: "",
                      difficulty: "1",
                      duration: "",
                      season: "",
                      countries: [],
                    });
                    document.getElementById("countries").value = "Select here...";
                    document.getElementById("name").select();
                } catch (error) {
                    alert(error);
                    document.getElementById("name").select();
                }
            }
    }

    
    

    return (
        
        <div>
            <Link to='/home'><button>Back Home</button></Link>
            <Form onSubmit={submitHandler}>
            
                <div>
                    <h2>Nombre de Actividad</h2>
                    <input type="text" id="name" value={form.name} autoComplete="off" placeholder="Name of Activity" onChange={changeHandler} name="name" />
                    {errors.name && (<span>{errors.name}</span>)}
                </div>
                <div>
                    <h2>Activity Difficulty</h2>
                    <Input name="difficulty" value={form.difficulty} type="range" min="1" max="5" width="95%" onChange={changeHandler}/>
                    <Span color="chocolate" fWeight="bold">
                        {inputs.difficulty}
                    </Span>
                        
                    {errors.difficulty && (<span>{errors.difficulty}</span>)}
                </div>
                <div>
                    <h2>Duración</h2>
                    <input type="text" value={form.duration} autoComplete="off" placeholder="Duración en días" onChange={changeHandler} name="duration" />
                    {errors.duration && (<span>{errors.duration}</span>)}
                </div>
                <div>
                    <Select name="season" id="season" onChange={changeHandler} value={form.seasson}>
                        <Option>Select here...</Option>
                        <Option value="Autumn">Autumn</Option>
                        <Option value="Winter">Winter</Option>
                        <Option value="Spring">Spring</Option>
                        <Option value="Summer">Summer</Option>
                    </Select>
                    {errors.seasson && (<span>{errors.seasson}</span>)}
                    
                </div>
                <div>
                    <h2>Countries</h2>
                    <select name="countries" id="countries" onChange={changeHandler}>
                        <option>Select here...</option>
                        {countries.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                    {errors.countries && (<span>{errors.countries}</span>)}
                    <div>
                        {form.countries?.map((c) => (
                            <button key={c} name={c} onClick={handleSelect} bground={`url("${
                                countries?.find((country) => country.id === c)?.flags
                              }") no-repeat center/100%`}>
                                
                              </button>
                        ))}
                    </div>
                </div>
                    
                <button type="submit">Create Activity</button>
        </Form>

        </div>
            
    )
}

export default ActivityCreate;