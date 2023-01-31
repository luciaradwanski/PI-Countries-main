import React, {useState} from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Loading from "../../Components/Loading/Loading";
import image from '../../Images/camera.jpg'
export const DivContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    margin: 2.5rem;
    font-family: 'Raleway';
    background-color: rgb(3, 155, 116);
    
`
export const Image = styled.img`
    width: 400px;
    margin-left: 640px;
    margin-top: 85px;
`

export const DivText = styled.div`
    line-height: 0.9;
    letter-spacing: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    border: none;
    position: absolute;
    top: 15%;
    right: 60%;
    font-size: 20px;
    &:hover{
      transform: translateY(10px) scale(1.2);
   }
`

export const A = styled.a`
    color: white;
    &:hover{
        color: red;
    }
`
export const Button = styled.button`
    color: white;
    border: none;
    border-radius: 20px;
    font-weight: 500;
    font-size: 20px;
    width: 150px;
    text-align: center;
    margin-top: 60px;
    margin-bottom: 60px;
    background: rgb(9,24,121);
    
    padding: 10px;
    &:hover{
        background: linear-gradient(90deg, rgba(9,24,121,0.9136904761904762) 0%, rgba(4,57,244,1) 46%, rgba(0,226,244,1) 100%);
    }
`

const LandingPage = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1000);

    if (loading) return <Loading />;

    return (
        <DivContainer>
            <Image className="img-1" src={image} alt="ss" />
            <DivText>
                <h2>HENRY PI</h2>
                <h1>THE WORLD</h1>
                <h5>EXPLORING</h5>
                
            </DivText>
            <p>The world is a big place, conformed by countries with such
                incredible cultures and full of activities that make them unique
                in every way. Let's get together and see what it's got to show
                us.
            </p>
            
            <p>Countries App es una SPA (Single Page Application) con la temática
                de países, que fue desarrollada durante el Bootcamp de Herny. La App esta disponible en el {" "}
                <A href="https://github.com/luciaradwanski/PI-Countries-main">GitHub{" "}</A>
            </p>
            
            
            <Link to="/home">
                <Button>START</Button>
            </Link>
        </DivContainer>
    )
}
export default LandingPage;
