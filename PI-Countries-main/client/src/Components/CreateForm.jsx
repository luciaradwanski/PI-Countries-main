import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, getActivities, postActivity } from '../Redux/Actions/Actions';


export default function CreateForm (){
    
    const countries = useSelector((state) => state.countriesReducer.countries);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        difficulty: "1",
        duration: "",
        season: "Select here...",
        paises: [],
    });
    const [error, setError] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        paises: "",
    });

    const handleChange = (e) => {
        try {
            handleInputs(e, setInputs, inputs);
            formValidator(e, error, setError, inputs.paises.length);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTags = (e) => {
        setInputs({
            ...inputs,
            paises: inputs.paises.filter((c) => c !== e.target.name),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        function required() {
            if (!inputs.name) {
                setError({ ...error, name: "This field cannot be empty" });
            } else if (!inputs.duration) {
                setError({ ...error, duration: "This field cannot be empty" });
            } else if (inputs.season === "Select here...") {
                setError({ ...error, season: "Please select one season" });
            } else if (!inputs.paises.length) {
                setError({
                    ...error,
                    paises: "Please select one or more countries",
                });
            } else {
                return true;
            }
            return false;
        }

        if (
        !error.name &&
        !error.difficulty &&
        !error.duration &&
        !error.season &&
        !error.paises &&
        required()
        ) {
            try {
                await dispatch(postActivity(inputs));
                alert("Activity created succesfully");
                setInputs({
                    name: "",
                    difficulty: "1",
                    duration: "",
                    season: "",
                    paises: [],
                });
                document.getElementById("paises").value = "Select here...";
                document.getElementById("name").select();
            }  catch (error) {
                alert(error);
                document.getElementById("name").select();
            }
        }
    };

    useEffect(() => {
        return async () => {
            await dispatch(getAllCountries());
            await dispatch(getActivities());
        };
    }, [dispatch]);
    
    
    return(
        

        <DivForm>
            <Link to='/home'><button>Back to Home</button></Link>
            <br />
            <h1>Crear Actividad Turística</h1>
            
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <Label>Nombre</Label>
                    <input type='text' value={inputs.name} name='name' onChange={e=>handleChange(e)}></input>                            
                    {error.name && (<p>{error.name}</p>)}
                </div>
                        
                <div>
                    <Label>Dificultad</Label>
                    <input type='number' value={inputs.difficulty} name = 'difficulty' min='1' max='5' onChange={e=>handleChange(e)}></input>                            
                    {error.difficulty && (<p>{error.difficulty}</p>)}
                </div>

                <div>
                    <Label>Duracion</Label>
                    <input type='text' value={inputs.duration} name = 'duration' onChange={e=>handleChange(e)}></input>                            
                    {error.duration && (<p>{error.duration}</p>)}
                </div>
                        
                <div>
                    <Label>Temporada</Label>
                    <select name="season" onChange={e => handleChange(e)}>
                        <option value={"Verano"}>Verano</option>
                        <option value={"Otoño"}>Otoño</option>
                        <option value={"Invierno"}>Invierno</option>
                        <option value={"Primavera"}>Primavera</option>
                    </select>
                    {error.season && (<p>{error.season}</p>)}
                </div>
                <DivSelect>
                    <Label>paises</Label>
                    <select onClick={() => setOpen(!open)} onChange={(e)=>handleSelect(e)} name="paises">
                    {!open && <option>Elegir pais</option>}
                        {countries.map((c)=>(
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>       
                    <ButtonDos type="button" onClick={e => deleteHandle(e)}>Clean</ButtonDos>
                </DivSelect>                         
                {inputs.paises.length === 0 && (<p>{error.paises}</p>)}

                {inputs.paises.length !== 0 && 
                    <div>
                        <ul><li>{inputs.paises.map((c) => c + ", ")}</li></ul>
                    </div>
                }

                {/* {inputs.countries?.map((c) => (
              <Button
                key={c}
                name={c}
                color="red"
                margin="0 10px 10px 0"
                onClick={handleTags}
                bground={`url("${
                  countries?.find((country) => country.id === c)?.flags
                }") no-repeat center/100%`}
              >
                
              </Button>
            ))}        */}
                <ButtonUno type="submit">Crear Actividad</ButtonUno>                        
                    
            </Form>
            
        </DivForm>
    )
}