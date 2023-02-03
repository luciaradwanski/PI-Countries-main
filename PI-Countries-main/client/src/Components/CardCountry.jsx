import React from "react";
import { Link } from "react-router-dom";
import CardsContainer from "./CardsContainer";
import style from './CardCountry.modules.css';


export default function CardCountry({country}){
    return (
        <div>
            <Link to={`/home/Country/${country.id}`}>
                <div className={style.container}>
                    <CardsContainer/>
                    <div className={style.container}>
                        <h2>{country.name}</h2>
                        {country.continents.map((c) => (
                            <h2 key={Math.random(0, 10)}>
                                <span>Continent:{" "}</span>{c}
                            </h2>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    )
}