import { useParams, Navigate, useNavigate } from "react-router-dom"
import { BsCartPlusFill } from 'react-icons/bs'
import AgregarAlCarrito from "../../components/carrito/AgregarAlCarrito"
import { useObtenerCursoPorId } from "../../hooks/useCurso"
import { useObtenerLeccion } from "../../hooks/useLeccion"
import { useObtenerArchivos, useObtenerArchivoPorLeccion } from "../../hooks/useArchivo"
import { useObtenerLeccionesPorCurso } from "../../hooks/useLeccion"
import { useAccesoStore } from '../../store/accesoStore'

import Cargando from '../../pages/Cargando'

const U_Leccion = () => {

    const { idCurso, nombreCurso, idLeccion } = useParams()
    const acceso = useAccesoStore((state) => state.acceso)
    const navigation = useNavigate()
    const { data: curso, isLoading: isLoadingCurso } = useObtenerCursoPorId(idCurso)
    const { data: leccion, isLoading: isLoadingLeccion } = useObtenerLeccion(idLeccion)
    const { data: leccionesCurso, isLoading: isLoadingLeccionesCurso } = useObtenerLeccionesPorCurso(idCurso)
    const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos()
    const { data: archivosLecciones, isLoading: isLoadingArchivosLecciones } = useObtenerArchivoPorLeccion(idLeccion)

    if (isLoadingCurso || isLoadingLeccion || isLoadingLeccionesCurso || isLoadingArchivos || isLoadingArchivosLecciones) return <Cargando />

    if (leccionesCurso[0].idLeccion != idLeccion && !acceso) return <Navigate to={`/curso/${idCurso}`} />

    const videoLeccion = archivos.find((archivo) => archivo.idArchivo == leccion.idVideo)

    const irLeccion = (leccionId) => {
        navigation(`/curso/leccion/${idCurso}/${nombreCurso}/${leccionId}`)
    }

    return (
        <div className="container-fluid py-5">

            <h2 className="text-center display-2 mb-5">{curso.nombre}</h2>

            <div className="row">
                <div className="col-12 col-md-8">
                    <div className="row">
                        <video controls>
                            <source src={videoLeccion.url} />
                        </video>
                        
                    </div>
                    <h4 className="mt-3" >{leccion.nombre}</h4>


                    <div className="row">
                        <p>
                            {leccion.informacion}
                        </p>
                    </div>
                </div>


                <div className="col-12 col-md-4">
                    <h4 className="text-center mb-3">Lecciones del curso</h4>


                    <div className="alert alert-info" role="alert">
                        <p>
                            Compra el curso "{curso.nombre}" para seguir disfrutando de su contenido.
                        </p>
                        <AgregarAlCarrito idCurso={idCurso} />
                    </div>


                    <div className="list-group overflow-y-auto" style={{ height: "500px" }}>
                        { /** Cuando tengan el mismo id se asigna la clase active */}
                        {
                            leccionesCurso.map((leccion, index) => {
                                if (index > 0) return <button key={leccion.idLeccion} type="button" className="list-group-item list-group-item-action" disabled >Lección {index + 1}: {leccion.nombre}</button>

                                return <button key={leccion.idLeccion} type="button" onClick={() => irLeccion(leccion.idLeccion)} className={leccion.idLeccion == idLeccion ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} >Lección {index + 1}: {leccion.nombre}</button>

                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default U_Leccion