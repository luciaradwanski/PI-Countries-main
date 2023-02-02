import React from 'react';
import { useSelector } from 'react-redux';
import { getCountriesByName } from '../../redux/actions';
import CardCountry from '../CardCountry/CardCountry';
import styled from 'styled-components';

export const DivCards = styled.div`
   

`

export default function CardsContainer (){
    const countries = useSelector((state) => state.allCountries)
    return(
        <DivCards>
            {countries.map((c) => {
                return (
                    <CardCountry
                        flags={c.flags}
                        id={c.id}
                        name={c.name}
                        continent={c.continent}
                        subregion={c.subregion}
                        capital={c.capital}
                        area={c.area}
                        poblacion={c.poblacion}
                    
                    />
                )
            })}
        </DivCards>
    )
}