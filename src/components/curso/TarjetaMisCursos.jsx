import imgCurso from '../../assets/curso.jpg'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';


const TarjetaMisCursos = ({ curso, archivo }) => {

    const navigate = useNavigate();

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
        return navigate(`/curso/${curso.idCurso}`)
    }

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

    return (
        <>
            < div id={`curso${curso.idCurso}`} onMouseOver={mouseOver} onMouseOut={mouseOut} className='col' >
                <div className="card" style={{ width: "18rem" }}>
                    <img src={curso.idMiniatura != 0 ? archivo.url : imgCurso} onClick={irAlCurso} style={{ cursor: "pointer" }} height="190px" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{curso.nombre}</h5>

                        <p className='card-text'><small>Ultima conexión hace {diferencia} dias</small></p>

                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: "0%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                        </div>

                    </div>

                    <div className="card-footer">
                        <div className="d-flex justify-content-end">
                            {
                                !curso.autorizado ?
                                    <button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target={`#authModal${curso.idRelacion}`} >Activar</button>
                                    :
                                    <button className='btn btn-primary btn-sm' onClick={irAlCurso}>Continuar</button>
                            }
                        </div>
                    </div>
                </div>
            </div >

            <div className="modal fade" id={`authModal${curso.idRelacion}`} tabIndex="-1" aria-labelledby={`authModalLabel${curso.idRelacion}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`authModalLabel${curso.idRelacion}`}>Activar curso</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Para activar el curso: {curso.nombre}</p>
                            <p>Ingrese el codigo de autorización</p>
                            <input type="number" id='inputCodigoAuth' maxLength="6" minLength="6" step="1" className='form-control form-control-lg text-center' placeholder='000000' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-success">Activar curso</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TarjetaMisCursos