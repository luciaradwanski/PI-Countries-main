import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCountries, getCountriesByName } from '../../redux/actions';
import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    align-items: center;
    padding: 0.3rem 0.5rem;
    margin: 1rem 0;
    font-size: 1.2em;
    height: 2.5rem;
    border-radius: 15px;
`;

export const Input = styled.input`
    border: none;
    outline: none;
    margin-right: 0.5rem;
    border-radius: 15px;
    padding: 7px 10px;
    font-size: 1rem;
    font-family: "Quicksand", sans-serif;
    background-color: whitesmoke;
`


const SearchBar = () => {
    
    const dispatch = useDispatch();
    const [name, setName] = useState(""); /* seteo un string vacio*/

    const handleInputChange = (e) => {
        const value = e.target.value;
        e.preventDefault();
        dispatch(getAllCountries(value));
        setName(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getCountriesByName(name))
        if (!name) {
            alert("Ingresar nombre del País");
        } else {
            dispatch(getAllCountries(name));
            setName("");
        }
    };

    return (
        <div>
            <Form >
                <Input 
                    type="text" 
                    placeholder="Search Name" 
                    onChange={(e) => handleInputChange(e)} 
                    value={name} 
                    autoComplete="off"
                />
                <button type="submit"onSubmit={handleSubmit}>Buscar-Fetch</button>
            </Form>
        </div>
    );
}

export default SearchBar;