import React from 'react';
import { primerMayuscula } from '../helper';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFFFFF;
    margin-top: 1rem;
`;

const Resumen = ({ datos }) => {

    if( datos.marca === '' || datos.year === '' || datos.plan === '' ) {
        return null;
    }

    return ( 
        <ContenedorResumen>
            <h2>Resumen de Cotizacion</h2>
            <ul>
                <li>Marca: { primerMayuscula(datos.marca) }</li>
                <li>Plan: { primerMayuscula(datos.plan) }</li>
                <li>Año del Auto: { datos.year }</li>
            </ul>
        </ContenedorResumen>
        
     );
}
 
Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}

export default Resumen;