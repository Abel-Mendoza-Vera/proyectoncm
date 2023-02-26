import { useParams, Navigate, useNavigate } from "react-router-dom"

import { useObtenerLeccion } from "../../hooks/useLeccion"
import { useObtenerArchivos, useObtenerArchivoPorLeccion } from "../../hooks/useArchivo"
import { useObtenerLeccionesPorCurso } from "../../hooks/useLeccion"
import { useAccesoStore } from '../../store/accesoStore'

import Cargando from '../../pages/Cargando'

const U_Leccion = () => {

    const { idCurso, nombreCurso, idLeccion } = useParams()
    const acceso = useAccesoStore((state) => state.acceso)
    const navigation = useNavigate()
    const { data: leccion, isLoading: isLoadingLeccion } = useObtenerLeccion(idLeccion)
    const { data: leccionesCurso, isLoading: isLoadingLeccionesCurso } = useObtenerLeccionesPorCurso(idCurso)
    const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos()
    const { data: archivosLecciones, isLoading: isLoadingArchivosLecciones } = useObtenerArchivoPorLeccion(idLeccion)

    if (isLoadingLeccion || isLoadingLeccionesCurso || isLoadingArchivos || isLoadingArchivosLecciones) return <Cargando />

    if( leccionesCurso[0].idLeccion != idLeccion && !acceso ) return <Navigate to={`/curso/${idCurso}`} />

    const videoLeccion = archivos.find((archivo) => archivo.idArchivo == leccion.idVideo)

    const irLeccion = (leccionId) => {
        navigation(`/curso/leccion/${idCurso}/${nombreCurso}/${leccionId}`)
    }

    return (
        <div className="container-fluid py-5">

            <h2 className="text-center display-2 mb-5">{nombreCurso}</h2>

            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <video controls>
                            <source src={videoLeccion.url} />
                        </video>
                        <h4 className="mt-3" >{leccion.nombre}</h4>
                    </div>


                    <div className="row">
                        <div className="d-flex justify-content-end mb-2">
                            {
                                archivosLecciones.length == 0 ?
                                    <></>
                                    :
                                    <div className="dropdown">
                                        <button className="btn btn-primary btn-sm dropdown-toggle me-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Archivos
                                        </button>
                                        <ul className="dropdown-menu">
                                            {
                                                archivosLecciones.map((a) => <li><a className="dropdown-item" href={a.url} target="_blank" >{a.nombre}</a></li>)
                                            }
                                        </ul>
                                    </div>
                            }

                            <button className="btn btn-primary btn-sm">Cuestionario</button>
                        </div>

                        <p>
                            {leccion.informacion}
                        </p>
                    </div>
                </div>


                <div className="col-4">
                    <h4 className="text-center mb-3">Lecciones del curso</h4>
                    <div className="list-group overflow-y-auto" style={{ height: "500px" }}>
                        { /** Cuando tengan el mismo id se asigna la clase active */}
                        {
                            leccionesCurso.map((leccion, index) => {
                                if (index > 0 && !acceso) return <button type="button" className="list-group-item list-group-item-action" disabled >{leccion.nombre}</button>

                                return <button type="button" onClick={() => irLeccion(leccion.idLeccion)} className={leccion.idLeccion == idLeccion ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} >{leccion.nombre}</button>

                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default U_Leccion