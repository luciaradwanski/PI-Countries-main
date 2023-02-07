import React from 'react';
import NavBar from './NavBar'

function About() {
  return (
    <>
      <NavBar />
      <div className={styles.About}>
        <h1>Lucia Daniela Radwanski</h1>
        <p>Tengo 31 años, vivo en San Nicolás de los Arroyos, Buenos Aires.</p>
      </div>
    </>
  )
}

export default About;