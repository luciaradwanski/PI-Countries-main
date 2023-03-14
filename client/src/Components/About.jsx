import React from 'react';
import NavBar from './NavBar'
import style from '../Comp Styles/About.module.css'

function About() {
  return (
    <>
      <NavBar />
      <div className={style.container}>
        <h1 className={style.title}>Lucia Daniela Radwanski</h1>
        <div className={style.p}>
            <p>Tengo 31 años, vivo en San Nicolás de los Arroyos, Buenos Aires.</p>
            
                
            <p>Countries App es una SPA (Single Page Application) con la temática <br />
              de países, que fue desarrollada durante el Bootcamp de Herny. <br />
              La App esta disponible en el {" "} <a href="https://github.com/luciaradwanski/PI-Countries-main">GitHub{" "}</a>
            </p>
        </div>
      </div>
    </>
  )
}

export default About;