import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import axios from 'axios';
import PropTypes from 'prop-types';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFFFFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {

    // State del listado de Criptomonedas
    const [ listaCripto, guardarCriptomonedas ] = useState([]);
    const [ error, guardarError ] = useState(false);

    const monedas = [
        { codigo: 'USD', nombre: 'Dolar Estadounidense' },
        { codigo: 'COP', nombre: 'Peso Colombiano' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ]

    // useMoneda
    const [ moneda, SelectMoneda ] = useMoneda('Elige tu Moneda', '', monedas);

    // useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto);

    // Ejecutar el llamado de la API
    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();

        // Validar si ambos campos estan llenos
        if( moneda === '' || criptomoneda === '' ){
            guardarError(true);
            return;
        }

        // Pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={ cotizarMoneda }
        >
            { error ? <Error mensaje="Todos los campos son obligatorios" /> : null }

            <SelectMoneda/>
            <SelectCripto/>
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
Formulario.propTypes = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCriptomoneda: PropTypes.func.isRequired
}

export default Formulario;