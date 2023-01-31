import React from "react";
import { Link as This_Link } from "react-router-dom";
import SearchBar from '../SearchBar/SeachBar';
import styled from 'styled-components';


export const Link = styled(This_Link)`
    font-size: 1.5rem;
    text-decoration: none;
    color: white;
    &:hover {
        color: violet;
    }
`
export const DivContainer = styled.div`
    position: fixed;
    width: 100%;
    z-index: 999;
    display: flex;
    flex-direction: row;
    background-color: black;
    padding: 15px;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    top: 0;
    left: 0;
    flex-wrap: nowrap;
   transition: ease-in 0.3s;
`

const NavBar = () => {
    return (
        <DivContainer>
            <SearchBar/>
            <Link to="/home">Home</Link>
            <Link to="/create">Crea una Actividad!!</Link>
        </DivContainer>
    )
}



export default NavBar;