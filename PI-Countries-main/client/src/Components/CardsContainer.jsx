import React from 'react';
import CardCountry from './CardCountry';
import style from './'

export default function CardsContainer({modifiedCountries}) {
    return(
        <div className={style.container}>
            <h2 className={style.h2}>Results: </h2>
            {!Array.isArray(modifiedCountries) ? <h2>{modifiedCountries.error}</h2> : modifiedCountries.map((c) => (
                <CardCountry key={c.id} country={c} />
            ))}
        </div>
    )
}