import React, { Fragment, useEffect, useState } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  // State del formulario
  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });
  const [ consulta, guardarConsulta ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});
  const [ error, guardarError ] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      if(consulta) {
        const appId = '6ec25a3617ea5c53b5c19867f032441c';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ busqueda.ciudad },
                    ${ busqueda.pais }&appid=${ appId }&units=metric`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsulta(false);
        
        // Detecta si hubo resultados correctos en la consulta
        if(resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    }
    consultarAPI();
    // eslint-disable-next-line
  }, [ consulta ]);

  let componente;
  if(error) {
    componente = <Error mensaje="No hay Resultados" />
  } else {
    componente = <Clima resultado={ resultado } />
  }

  return (
    <Fragment>
      <Header
        titulo="Clima React App"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={ busqueda }
                guardarBusqueda={ guardarBusqueda }
                guardarConsulta={ guardarConsulta }
              />
            </div>
            <div className="col m6 s12">
              { componente }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
