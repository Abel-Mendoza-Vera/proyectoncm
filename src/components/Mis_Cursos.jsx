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