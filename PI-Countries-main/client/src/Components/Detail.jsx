// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from 'react-router-dom';
// import {getCountryDetail, } from '../Redux/actions/actions'
// import style from '../CompStyle/Detail.module.css';

// export default function Detail (){

//     const country = useSelector((state) => state.countriesReducer.countryDetail);
//     const dispatch = useDispatch();
//     const params = useParams()

//     useEffect(() => {
//         dispatch(getCountryDetail(params.id));
//         // return () => {
//         // dispatch(clearCountryDetail());
//         // };
//     }, [dispatch, params.id]);

//     return(
//         <div className={style.form}>
//             <div className={style.form}>
//                 <h2 className={style.h2}>Country Details</h2>
//                 <div>
//                     <img className={style.img} src={country.image} alt={country.id}/>
//                 </div>
//                 <div>
//                     <div className={style.container}>
//                         <h2 className={style.h2}>Country Code: </h2>
//                         <p>{country.id}</p>
//                         <h2 className={style.h2}>Country Name: </h2>
//                         <p>{country.name}</p>
//                         <h2 className={style.h2}>Capital: </h2>
//                         <p>{country.capital}</p>
//                         <h2 className={style.h2}>Subregion: </h2>
//                         <p>{country.subregion}</p>
//                         <h2 className={style.h2}>Population: </h2>
//                         <p>{country.population} habitants</p>
//                         <h2 className={style.h2}>Area: </h2>
//                         <p >{country.area}km <sup>2</sup></p>
//                         <h2 className={style.h2}>Continent:</h2>
//                         <p>{country.continent}</p>
//                         {country.activities?.length ? (
//                             <div>
//                                 <h2 className={style.h2}>Activities</h2>
//                                 {country.activities?.map((a) => (
//                                     <p style={{ paddingBottom: "10px" }} key={Math.random(0, 10)}>
//                                         {a.name}.
//                                     </p>
//                                 ))}
//                             </div>
//                         ) : ("")}

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default function Detail(){
    return(
        <div>
            <h1>ESTOY EN DETAIL</h1>
            <h2>Estoy en Detail</h2>
            <h2>Estoy en Detail</h2>
            <h2>Estoy en Detail</h2>
            <h2>Estoy en Detail</h2>
            <h2>Estoy en Detail</h2>
            <h2>Estoy en Detail</h2>
            <h2>Estoy en Detail</h2>
            <h2>Estoy en Detail</h2>
            <h2>Estoy en Detail</h2>
            <h2>Estoy en Detail</h2>
            <h2>Estoy en Detail</h2>
        </div>
    )
}