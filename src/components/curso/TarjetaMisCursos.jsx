import imgCurso from '../../assets/curso.jpg'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import Swal from 'sweetalert2';
import ModalActivarCurso from './ModalActivarCurso';

import { useAccesoStore } from '../../store/accesoStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modificarCursoCliente } from '../../hooks/useCursoCliente';

import { useObtenerCalificacionesClientePorCurso } from '../../hooks/useCalificacion';
import { useObtenerLeccionesPorCurso } from '../../hooks/useLeccion';

const TarjetaMisCursos = ({ curso, archivo }) => {

    let new_date = new Date()
    let dia = new_date.getDate()
    let mes = new_date.getMonth() + 1
    let anio = new_date.getFullYear()

    let date1 = `${anio}-${mes < 10 ? `0${mes}` : mes}-${dia < 10 ? `0${dia}` : dia}`

    let arrayFechaConexion = curso.ultimaConexion.split("/")
    let date2 = `${arrayFechaConexion[2]}-${arrayFechaConexion[1]}-${arrayFechaConexion[0]}`

    let fechaActual = moment(date1)
    let fechaConexion = moment(date2)
    let diferencia = fechaActual.diff(fechaConexion, "days")

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { token, usuario } = useAccesoStore((state) => ({
        token: state.token,
        usuario: state.usuario
    }))

    const { data, isLoading } = useObtenerCalificacionesClientePorCurso(token, usuario.idUsuario, curso.idCurso)
    const { data: lecciones, isLoading: isLoadingLecciones } = useObtenerLeccionesPorCurso(curso.idCurso)

    const useModificarCursoCliente = useMutation({
        mutationFn: modificarCursoCliente,
        onSuccess: () => {
            queryClient.invalidateQueries("getCursosCliente")
        }
    })

    if (isLoading || isLoadingLecciones) return < div className='col' >
        <div className="card" style={{ width: "18rem" }}>
            <img src={imgCurso} height="190px" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Curso</h5>

                <p className='card-text'><small>Ultima conexión hace 0 dias</small></p>

                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: "0%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                </div>

            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-end">

                    <button className='btn btn-primary btn-sm'>Cargando...</button>

                </div>
            </div>
        </div>
    </div >

    let numTotalCalif = 0
    let listaLecciones = lecciones.filter((leccion) => leccion.estatus == 1)
    let numTotalLec = listaLecciones.length

    for (let i = 0; i < data.length; i++) {
        let calif = data[i]

        if (calif.calificacion >= 8) {
            numTotalCalif += 1
        }
        else {
            numTotalCalif += 0.5
        }
    }
    let progreso = (numTotalCalif / numTotalLec) * 100
    progreso = progreso.toFixed(0)

    const mouseOver = () => {
        let divSeleccionado = document.getElementById(`curso${curso.idCurso}`)
        divSeleccionado.setAttribute("class", "col shadow-lg p-1 bg-primary bg-opacity-75 rounded")
    }

    const mouseOut = () => {
        let divSeleccionado = document.getElementById(`curso${curso.idCurso}`)
        divSeleccionado.removeAttribute("class")
        divSeleccionado.setAttribute("class", "col")
    }

    const irAlCurso = () => {
        let idRelacion = curso.idRelacion

        let arrayDate1 = date1.split("-")
        let fechaArmada = `${arrayDate1[2]}/${arrayDate1[1]}/${arrayDate1[0]}`

        let objCurso = { ultimaConexion: fechaArmada }

        useModificarCursoCliente.mutate({ token, idRelacion, curso: objCurso })
        return navigate(`/cliente/curso/${curso.idCurso}`)
    }

    const alertaNoActivacion = (nombreCurso) => {
        return Swal.fire({
            title: `Accediendo al curso ${nombreCurso}`,
            text: "Para ingresar al curso primero es necesario activarlo.",
            icon: "info",
            iconColor: "orange"
        })
    }



    return (
        <>
            < div id={`curso${curso.idCurso}`} onMouseOver={mouseOver} onMouseOut={mouseOut} className='col' >
                <div className="card" style={{ width: "18rem" }}>
                    <img src={curso.idMiniatura != 0 ? archivo.url : imgCurso} onClick={curso.autorizado ? () => irAlCurso() : () => alertaNoActivacion(curso.nombre)} style={{ cursor: "pointer" }} height="190px" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{curso.nombre}</h5>

                        {
                            !curso.autorizado ?
                                <></>
                                :
                                <>
                                    <p className='card-text'><small>Ultima conexión hace {diferencia} dias</small></p>
                                    <div className="progress">
                                        <div className={progreso == 100 ? "progress-bar bg-success" : "progress-bar"} role="progressbar" style={{ width: `${progreso}%` }} aria-valuenow={`${progreso}`} aria-valuemin="0" aria-valuemax="100">{progreso}%</div>
                                    </div>
                                </>
                        }

                    </div>


                    <div className="card-footer">
                        <div className="d-flex justify-content-end">
                            {
                                !curso.autorizado ?
                                    <ModalActivarCurso curso={curso} />
                                    :
                                    <button className='btn btn-primary btn-sm' onClick={irAlCurso}>Continuar</button>

                            }

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default TarjetaMisCursos