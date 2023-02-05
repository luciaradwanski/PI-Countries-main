// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getAllCountries, getAllActivities, postActivity } from '../Redux/actions/actions'
// import {handleInputs} from '../Utils/handleInputs';
// import {formValidator} from '../Utils/formValidation'


// export default function ActivityCreate (){
    
//     const countries = useSelector((state) => state.countriesReducer.countries);
//     const dispatch = useDispatch();
//     const [inputs, setInputs] = useState({
//         name: "",
//         difficulty: "1",
//         duration: "",
//         season: "Select here...",
//         paises: [],
//     });
//     const [error, setError] = useState({
//         name: "",
//         difficulty: "",
//         duration: "",
//         season: "",
//         paises: "",
//     });

//     const handleChange = (e) => {
//         try {
//             handleInputs(e, setInputs, inputs);
//             formValidator(e, error, setError, inputs.paises.length);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleSelect = (e) => {
//         setInputs({
//             ...inputs,
//             paises: inputs.paises.filter((c) => c !== e.target.name),
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         function required() {
//             if (!inputs.name) {
//                 setError({ ...error, name: "This field cannot be empty" });
//             } else if (!inputs.duration) {
//                 setError({ ...error, duration: "This field cannot be empty" });
//             } else if (inputs.season === "Select here...") {
//                 setError({ ...error, season: "Please select one season" });
//             } else if (!inputs.paises.length) {
//                 setError({
//                     ...error,
//                     paises: "Please select one or more countries",
//                 });
//             } else {
//                 return true;
//             }
//             return false;
//         }

//         if (
//         !error.name &&
//         !error.difficulty &&
//         !error.duration &&
//         !error.season &&
//         !error.paises &&
//         required()
//         ) {
//             try {
//                 await dispatch(postActivity(inputs));
//                 alert("Activity created succesfully");
//                 setInputs({
//                     name: "",
//                     difficulty: "1",
//                     duration: "",
//                     season: "",
//                     paises: [],
//                 });
//                 document.getElementById("paises").value = "Select here...";
//                 document.getElementById("name").select();
//             }  catch (error) {
//                 alert(error);
//                 document.getElementById("name").select();
//             }
//         }
//     };

//     useEffect(() => {
//         dispatch(getAllCountries());
//         dispatch(getAllActivities());
//     }, [dispatch]);
    
    
//     return(
        

//         <div>
//             <Link to='/home'><button>Back to Home</button></Link>
//             <br />
//             <h1>Crear Actividad Turística</h1>
            
//             <form onSubmit={(e)=>handleSubmit(e)}>
//                 <div>
//                     <label>Nombre</label>
//                     <input type='text' value={inputs.name} name='name' onChange={e=>handleChange(e)}></input>                            
//                     {error.name && (<p>{error.name}</p>)}
//                 </div>
                        
//                 <div>
//                     <label>Dificultad</label>
//                     <input type='number' value={inputs.difficulty} name = 'difficulty' min='1' max='5' onChange={e=>handleChange(e)}></input>                            
//                     {error.difficulty && (<p>{error.difficulty}</p>)}
//                 </div>

//                 <div>
//                     <label>Duracion</label>
//                     <input type='text' value={inputs.duration} name = 'duration' onChange={e=>handleChange(e)}></input>                            
//                     {error.duration && (<p>{error.duration}</p>)}
//                 </div>
                        
//                 <div>
//                     <label>Temporada</label>
//                     <select name="season" onChange={e => handleChange(e)}>
//                         <option value={"Verano"}>Verano</option>
//                         <option value={"Otoño"}>Otoño</option>
//                         <option value={"Invierno"}>Invierno</option>
//                         <option value={"Primavera"}>Primavera</option>
//                     </select>
//                     {error.season && (<p>{error.season}</p>)}
//                 </div>
//                 <div>
//                     <label>paises</label>
//                     <select onChange={(e)=>handleSelect(e)} name="paises">
//                         {countries.map((c)=>(
//                             <option key={c.id} value={c.name}>{c.name}</option>
//                         ))}
//                     </select>       
//                 </div>                         
//                 {inputs.paises.length === 0 && (<p>{error.paises}</p>)}

//                 {inputs.paises.length !== 0 && 
//                     <div>
//                         <ul><li>{inputs.paises.map((c) => c + ", ")}</li></ul>
//                     </div>
//                 }

//                 {/* {inputs.countries?.map((c) => (
//               <Button
//                 key={c}
//                 name={c}
//                 color="red"
//                 margin="0 10px 10px 0"
//                 onClick={handleTags}
//                 bground={`url("${
//                   countries?.find((country) => country.id === c)?.flags
//                 }") no-repeat center/100%`}
//               >
                
//               </Button>
//             ))}        */}
//                 <button type="submit">Crear Actividad</button>                        
                    
//             </form>
            
//         </div>
//     )
// }