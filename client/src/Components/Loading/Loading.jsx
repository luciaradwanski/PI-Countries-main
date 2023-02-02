import React from "react";
import styled, {keyframes} from "styled-components";
// import NavBar from "../NavBar/NavBar";

export const DivLoad = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const DivSpinner = styled.div`
    background-color: rgba(17, 25, 40, 0.75);
  border: 0.5rem solid transparent;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border-left-color: var(--secondary);
  animation: ${spin} 1s linear infinite;
  margin: 2rem;
`



const Loading = () => {
    return (
        <DivLoad>
            
            <img src="https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <h2>{error || "Loading..."}</h2>
        </DivLoad>
    );
}

export default Loading;