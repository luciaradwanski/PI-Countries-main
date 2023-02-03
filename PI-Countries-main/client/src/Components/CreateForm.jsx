import React from 'react';

export default function CreateForm (){
    
    const countries = useSelector((state) => state.countriesReducer.countries);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        difficulty: "1",
        duration: "",
        season: "Select here...",
        countries: [],
    });
    const [error, setError] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: "",
    });

    const handleChange = (e) => {
        try {
            handleInputs(e, setInputs, inputs);
            formValidator(e, error, setError, inputs.countries.length);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTags = (e) => {
        setInputs({
            ...inputs,
            countries: inputs.countries.filter((c) => c !== e.target.name),
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
            } else if (!inputs.countries.length) {
                setError({
                    ...error,
                    countries: "Please select one or more countries",
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
        !error.countries &&
        required()
        ) {
            try {
                await dispatch(setActivities(inputs));
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
            }  catch (error) {
                alert(error);
                document.getElementById("name").select();
            }
        }
    };

    useEffect(() => {
        return async () => {
            await dispatch(getCountries());
            await dispatch(getActivities());
        };
    }, [dispatch]);
    
    
    return(
        // <div>
        //     <div>
        //         <h2>Create your activity: </h2>
        //         <form action="">
        //             <h2>Name: </h2>
        //         </form>
        //     </div>
        // </div>

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
                    <select name="seasson" onChange={e => handleChange(e)}>
                        <option value={"Summer"}>Verano</option>
                        <option value={"Autumn"}>Otoño</option>
                        <option value={"Winter"}>Invierno</option>
                        <option value={"Spring"}>Primavera</option>
                    </select>
                    {error.seasson && (<p>{error.seasson}</p>)}
                </div>
                <DivSelect>
                    <Label>Countries</Label>
                    <select onClick={() => setOpen(!open)} onChange={(e)=>handleSelect(e)} name="countries">
                    {!open && <option>Elegir pais</option>}
                        {countries.map((c)=>(
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>       
                    <ButtonDos type="button" onClick={e => deleteHandle(e)}>Clean</ButtonDos>
                </DivSelect>                         
                {inputs.countries.length === 0 && (<p>{errors.countries}</p>)}

                {inputs.countries.length !== 0 && 
                    <div>
                        <ul><li>{inputs.countries.map((c) => c + ", ")}</li></ul>
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