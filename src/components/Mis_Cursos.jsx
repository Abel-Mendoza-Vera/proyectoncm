import { useNavigate } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import { Link } from "react-router-dom"

import Cargando from "../../src/pages/Cargando"
import Tarjeta from "../components/curso/TarjetaMisCursos"
import { useObtenerCursosCliente } from "../hooks/useCursoCliente"
import { useObtenerArchivos } from "../hooks/useArchivo"
import { useState } from "react"

import { useAccesoStore } from "../store/accesoStore"

const Mis_Cursos = () => {

    const navigate = useNavigate()
    const { token, usuario } = useAccesoStore((state) => ({ token: state.token, usuario: state.usuario }))
    const { data: cursos, isLoading: isLoadingCursos } = useObtenerCursosCliente(token, usuario.idUsuario)
    const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos();
    const [buscadorCurso, setBuscadorCurso] = useState("")

    if (isLoadingCursos || isLoadingArchivos) return < Cargando />

    const onChangeBuscadorCurso = (e) => {
        setBuscadorCurso(e.target.value)
    }

    let listaCursos = cursos

    if (!buscadorCurso) {
        listaCursos = cursos
    }
    else {
        listaCursos = cursos.filter((curso) => curso.nombre.toLowerCase().includes(buscadorCurso.toLowerCase()))
    }

    const MisCursos = () => {
        return navigate(`/cliente/mis_cursos`)
    }

    const Certificaciones = () => {
        return navigate(`/cliente/certificaciones`)
    }

    return (
        <div className="mb-5">
            <div className="row mt-3 justify-content-end mb-5">
                <div className='col-6'>
                </div>
                <ul className="nav nav-tabs">

                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" onClick={MisCursos}>Mis Cursos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={Certificaciones}>Cursos Terminados</a>
                    </li>
                </ul>
            </div>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Instrucciones</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Proceso de Pago</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                <div className="container">
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <div className="row gutters">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <h4 className="mb-2 text-primary text-center">Instrucciones</h4>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                                                            <div>
                                                                <h6 className="mb-2 text-primary">Paso 1</h6>
                                                                <p> Para realizar el pago es necesario realizar una transferencia al siguiente número de cuenta:</p>
                                                                <h6>Nombre: NOVUMTEC, S.C.</h6>
                                                                <h6>Número de Cuenta BBVA: 0161929372</h6>
                                                                <h6>Sucursal: 5018</h6>
                                                                <h6>Cuenta CLABE: 012225001619293724</h6><br />
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-2 text-primary">Paso 2</h6>
                                                                <p>Una vez realizado el pago es necesario enviar un correo solicitando los codigos de acceso a el/los cursos que adquiriste adjuntando la foto del comprobante y tu numero de cliente al siguiente correo:</p>


                                                                <a href="mailto:hola@novatec-consultores.com?" target="_blank" className='text-primary'>hola@novatec-consultores.com</a>
                                                            </div><br />
                                                            <div>
                                                                <h6 className="mb-2 text-primary">Paso 3</h6>
                                                                <p>Una vez que se te envien el/los codigos de acceso dirigete a la seccion "Mis cursos" donde podras habilitar el/los cursos.</p>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" id="cerrarModal" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid" >
                <div className="row mt-3 justify-content-end">
                    <div className='col-6'>
                        <div className="input-group">
                            <input value={buscadorCurso} onChange={(e) => onChangeBuscadorCurso(e)} className='form-control' placeholder='Buscar' type="search" name="buscadorUsuario" />
                            <span className='input-group-text'><BiSearch size="2em" /></span>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mt-3 justify-content-center">
                    <div className='row mt-3 row-cols-auto g-3 mx-auto justify-content-start' >
                        {
                            listaCursos.length ?
                                listaCursos.map((curso) => {
                                    let archivo = archivos.find((item) => item.idArchivo == curso.idMiniatura)
                                    return <Tarjeta key={curso.idCurso} curso={curso} archivo={archivo} />
                                })
                                :
                                <div className="border rounded text-center mb-3 alert alert-info" role="alert">
                                <h3 className="my-4">No Se Ha Encontrado Dicho Curso </h3>
                                <p>Consulta Nuestros Catálogo de Cursos <Link to="/catalogo_cursos">aqui</Link>.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Mis_Cursos