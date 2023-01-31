import React, { useState, useEffect } from "react";
import { createActivity, getActivities, getAllCountries, orderCountries, } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    } else if(/[$&+,:;=?@#|'<>.^*()%!-\s]/.test(input.name)){
        errors.name = "El nombre de la actividad no puede tener caracteres especiales"
    }

    if(!input.difficulty) {
        errors.difficulty = "Escoja la dificultad de la actividad"
    }

    if(!input.duration) {
        errors.duration = "Debes especificar la duración de la actividad" 
    }else if(!/[0-9]+[^]+[(^|, )(hora|dia|semana|año|mes)]/.test(input.duration)){
        errors.duration = 'Debe ser un numero seguido de un indicador de periodo (horas, dias, semanas, meses, años). Ejemplo: "1 dia"';
    }

    if(!input.seasson) {
        errors.seasson = "Especifica en que temporada se realiza dicha actividad"
    }

    if(input.countries.length === 0) {
        errors.countryId = "Debe seleccionar 1 o varios paises de la lista"
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
        difficulty: "",
        seasson: "",
        countryId: [],
    })

    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        dispatch(getAllCountries())
        dispatch(getActivities())
        const timer = setTimeout(() => {
            dispatch(orderCountries('ASC'))
        }, 1000);
        return () => clearTimeout(timer);

    },[dispatch])

    /* Array de actividades por nombre para validar que no se repitan */
    const arrayAct = allActivity.map((a) => a.name);

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]:e.target.value })
        setErrors(validate({ ...form, [e.target.name]:e.target.value }))
    }
    
    const handleSelect = (e) => {
        if(form.allCountries.includes(e.target.value)) {
            alert('El pais ya esta seleccionado')
        } else {
            setForm({ ...form, countryId : [...form.countryId, e.target.value]})
            setErrors(validate({...form, countryId:[...form.countryId, e.target.value],}, arrayAct));
        }
    }

    const handleCheck = (e) => {
        if(e.target.checked) { /* si esta seleccionado lo agrega al array */
            setForm({ ...form,  [e.target.name] : e.target.value, });
        }
        setErrors(validate({...form, [e.target.name] : e.target.value, }, arrayAct));
        /* si no esta, lo elimina del array y array que valida que no se repitan */
    }


    

    const handleDelete = (country) => {
        setForm({...form, countryId: form.countryId.filter((c) => c !== country),});
        setErrors(validate({...form, countryId: form.countryId.filter((c) => c !== country),}, arrayAct));
    };

    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        /* Si no hay errores en ninguno */
        if(form.name && form.difficulty && form.duration && form.seasson && form.countryId.length && !Object.keys(errors).length) {
            dispatch(createActivity(form))
            alert('Actividad creada')
            setForm({
                name: "",
                duration: "",
                difficulty: "",
                seasson: "",
                countryId: [],
            });
            
        } else {
            alert('Por favor, complete los campos o revise los errores')
        }
    }

    
    

    return (
        
        <Form onSubmit={submitHandler}>
            <Link to='/home'><button>Back Home</button></Link>
            <div>
                <h1>Actividad Turística</h1>
                <div>
                    <label>
                        <p>Select Countries....</p>
                        <select name="countryId" id="countryId" onChange={handleSelect}>
                            <option>Select here....</option>
                            {countries?.map((c, index) => {
                                return (
                                    <option key={index} value={c.id}>{c.name}</option>
                                )
                            })}
                        </select>
                        {errors.countryId && <span>{errors.countryId}</span>}
                        <div>
                            {form.countryId?.map((c, index) => (
                                <div key={index} onClick={handleDelete}>{c}<img src={trash} alt="trash" onClick={() => handleDelete(c)}/></div>
                        
                            ))}
                        </div>
                    </label>
                </div>
            </div>
                
            <div>
                <label>
                    <p>Nombre de Actividad...</p>
                    <input type="text" value={form.name} autoComplete="off" placeholder="Name of Activity" onChange={changeHandler} name="name" />
                    {errors.name && <span>{errors.name}</span>}
                </label>
            </div>
            <div>
                <label>
                    <p>Activity Difficulty...</p>
                    <div>
                        <div><input type="radio" name="difficulty" value="1" onChange={handleCheck}/>Muy bajo</div>
                        <div><input type="radio" name="difficulty" value="2" onChange={handleCheck}/>bajo</div>
                        <div><input type="radio" name="difficulty" value="3" onChange={handleCheck}/>Medio</div>
                        <div><input type="radio" name="difficulty" value="4" onChange={handleCheck}/>Alto</div>
                        <div><input type="radio" name="difficulty" value="5" onChange={handleCheck}/>Muy Alto</div>
                    </div>
                    {/* <input type="range" min="1" max="5" value={form.difficulty} autoComplete="off" placeholder="Duration" onChange={changeHandler} name="difficulty" /> */}
                    {errors.difficulty && <span>{errors.difficulty}</span>}
                </label>
            </div>
            <div>
                <label>
                    <p>Duración...</p>
                    <input type="number" value={form.duration} autoComplete="off" placeholder="Duración en días" onChange={changeHandler} name="duration" />
                    {errors.duration && <span>{errors.duration}</span>}
                </label>
            </div>
            <div>
                <label>
                    <p>Seasson:</p>
                    <div>
                        <div><input type="checkbox" name="seasson" value="Summer" onChange={(e) => handleCheck(e)}/>Summer</div>
                        <div><input type="checkbox" name="seasson" value="Spring" onChange={(e) => handleCheck(e)}/>Spring</div>
                        <div><input type="checkbox" name="seasson" value="Autumn" onChange={(e) => handleCheck(e)}/>Autumn</div>
                        <div><input type="checkbox" name="seasson" value="winter" onChange={(e) => handleCheck(e)}/>winter</div>
                    </div>
                    
                    {errors.seasson && <span>{errors.seasson}</span>}
                </label>
            </div>
                
            <button type="submit">Create Activity</button>
        </Form>

            
    )
}

export default ActivityCreate;