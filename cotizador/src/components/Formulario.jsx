import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #E1E1E1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Button = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #FFFFFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover{
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({ guardarResumen, guardarCargando }) => {

    // Crear States
    const [ datos, guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [ error, guardarError ] = useState(false);

    // Leer los datos del formulario y guardarlos en el State
    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario presiona el submit
    const cotizarSeguro = e => {
        e.preventDefault();

        if(datos.marca.trim() === '' || datos.year.trim === '' || datos.plan.trim === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        // Base de 2000
        let resultado = 2000;

        // Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear( datos.year );
        
        // Por cada año hay que restar el 3%
        resultado -= ((diferencia*3) * resultado) / 100;

        // Americano aumenta 15%
        // Asiatico aumenta 5%
        // Europeo aumenta 30%
        resultado = calcularMarca( datos.marca ) * resultado;

        // Basico aumenta 20%
        // Completo aumenta 50%
        resultado = parseFloat( obtenerPlan( datos.plan ) * resultado ).toFixed(2);

        // Total
        guardarCargando(true);

        setTimeout(() => {
            // Elimina el Spinner
            guardarCargando(false);
            
            // Pasa la informacion al componente principal
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
        }, 2000);

    }

    return ( 
        <form 
            onSubmit={cotizarSeguro}
        >

            { error ? <Error>Todos los campos son obligatorios</Error> : null }

            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={datos.marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={datos.year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={datos.plan === "basico"}
                    onChange={obtenerInformacion}
                /> Basico

                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={datos.plan === "completo"}
                    onChange={obtenerInformacion}
                /> Completo
            </Campo>

            <Button type="submit">Cotizar</Button>
        </form>
    );
}

Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

export default Formulario;