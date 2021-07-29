import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Frase from './components/Frase';

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
`;

const Boton = styled.button`
  background: -webkit-linear-gradient(top left, #0F574E 0%, #0F574E 40%, #007D35 100%);
  background-size: 305px;
  font-family: Arial, Helvetica, sans-serif;
  color: #FFFFFF;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  transition: background-size .8s ease;

  :hover {
    cursor: pointer;
    background-size: 400px;
  }

`;

function App() {

  // State de Frases
  const [ frase, guardarFrase ] = useState({});

  const consultarAPI = async () => {
    
    // Llamar la api sin Async Await
    // const api = fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    // const frase = api.then( respuesta => respuesta.json() );
    // frase.then( resultado => console.log(resultado) );

    const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    const frase = await api.json();
    guardarFrase(frase[0]);
  }

  // Cargar una frase
  useEffect( () => {
    consultarAPI();
  }, []);

  return (
    <Contenedor>
      <Frase
        frase={frase}
      />
      <Boton
        onClick={consultarAPI}
      >
        Obtener Frase
      </Boton>
    </Contenedor>
  );
}

export default App;
