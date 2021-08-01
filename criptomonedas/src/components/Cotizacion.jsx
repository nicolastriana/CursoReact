import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Resultado = styled.div`
    color: #FFFFFF;
    font-family: Arial, Helvetica, sans-serif;
    span{
        font-weight: bold;
    }
`;

const Info = styled.p`
    font-size: 18px;
`;

const Precio = styled.p`
    font-size: 30px;
`;

const Cotizacion = ({ resultado }) => {

    if(Object.keys(resultado).length === 0) return null;

    return ( 
        <Resultado>
            <Precio>El precio es: <span>{ resultado.PRICE }</span></Precio>
            <Info>Precio más alto del día: <span>{ resultado.HIGHDAY }</span></Info>
            <Info>Precio más bajo del día: <span>{ resultado.LOWDAY }</span></Info>
            <Info>Variación últimas 24 horas: <span>{ resultado.CHANGEPCT24HOUR }</span></Info>
            <Info>Última Actualización: <span>{ resultado.LASTUPDATE }</span></Info>
        </Resultado>
    );
}

Cotizacion.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Cotizacion;