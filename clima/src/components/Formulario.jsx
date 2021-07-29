import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({ busqueda, guardarBusqueda, guardarConsulta }) => {

    const [ error, guardarError ] = useState(false);

    // Funcion que coloca los elementos en el state
    const handleChange = e => {
        // Actualizar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    // Cuando el usuario da Submit al Form
    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if(busqueda.ciudad.trim() === '' || busqueda.pais.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        // Pasar la informacion al componente principal
        guardarConsulta(true);
    }

    return ( 
        <form
            onSubmit={ handleSubmit }
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ busqueda.ciudad }
                    onChange={ handleChange }
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={ busqueda.pais }
                    onChange={ handleChange }
                >
                    <option value="">--Seleccione un Pais--</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">Pais: </label>
            </div>
            <div className="input-field col s12">
                <button
                    type="submit"
                    className="black-text waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
                >Buscar Clima</button>
            </div>
        </form>
     );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsulta: PropTypes.func.isRequired
}  
 
export default Formulario;
