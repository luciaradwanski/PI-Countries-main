import React from "react";
import styled from "styled-components";

export const NavPag = styled.nav`
    text-align: center;
    padding-top: 10px; 
`
export const Ul = styled.ul`
    display: inline-block;
    padding: 0;
    margin: 0;
`
export const Li = styled.li`
    display: inline;
`
export const ButtonP = styled.button`
    background-color: black;
    opacity: 60%;
    color: white;
`
const Paginado = ({countriesPerPage, allCountries, paginado}) => {
    
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <NavPag>
            <Ul>
                {pageNumbers && pageNumbers.map((number) => (
                    <Li key={number}>
                        <ButtonP onClick={() => paginado(number)}>{number}</ButtonP>
                    </Li>
                ))}
            </Ul>
        </NavPag>
        
    );
   
}
  
  export default Paginado;