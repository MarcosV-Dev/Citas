import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

//State de citas
const Formulario = ({crearCita}) => {
    const [cita, actualizarCita] = useState({
        mascota: '',
        dueño: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [error, actualizarError] = useState(false)    
    const actualizarState = e =>{
        
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }
    const {mascota, dueño, fecha, hora, sintomas} = cita;
    const submitCita = e => {
        e.preventDefault();

        //Validar

        if(mascota.trim() === '' || dueño.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }
        // Eliminar mensaje previo
        actualizarError(false);

        // Asignar ID

        cita.id = uuid();

        //Crear cita

        crearCita(cita)

        //Reiniciar form

        actualizarCita({
            mascota: '',
            dueño: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }
    return( 
        <Fragment>
            <h2>Crear cita</h2>
            <form onSubmit={submitCita}>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
                <label htmlFor="mascota">Nombre Mascota</label>
                <input type="text" name="mascota" className="u-full-width" placeholder="Nombre mascota" onChange={actualizarState} value={mascota}/>

                <label htmlFor="dueño">Nombre Dueño de Mascota</label>
                <input type="text" name="dueño" className="u-full-width" placeholder="Nombre dueño" onChange={actualizarState} value={dueño}/>

                <label htmlFor="fecha">Fecha</label>
                <input type="date" name="fecha" className="u-full-width" onChange={actualizarState} value={fecha}/>

                <label htmlFor="hora">Hora</label>
                <input type="time" name="hora" className="u-full-width" onChange={actualizarState} value={hora}/>

                <label >Síntomas</label>
                <textarea name="sintomas" className="u-full-width" placeholder="Síntomas" onChange={actualizarState} value={sintomas}></textarea>

                <button type="submit" className="u-full-witdh button-primary">Agregar cita</button>
            </form>
        </Fragment>
    );
}
Formulario.propTypes = {
    crearCitas: PropTypes.func.isRequired
}
export default Formulario;