import { useNavigate } from "react-router-dom"
import { BiLinkExternal } from "react-icons/bi"
import { useObtenerLeccionesPorCurso } from "../../hooks/useLeccion"
import Cargando from "../../pages/Cargando"
import { useObtenerCalificacionesClientePorCurso } from "../../hooks/useCalificacion"
import { useAccesoStore } from "../../store/accesoStore"

const ListaLecciones = ({ curso }) => {
    const navigation = useNavigate()
    const { token, usuario } = useAccesoStore((state) => ({
        token: state.token,
        usuario: state.usuario
    }))
    const { data: leccionesCurso, isLoading: isLoadingLeccionesCurso } = useObtenerLeccionesPorCurso(curso.idCurso)
    const { data: califCurso, isLoading: isLoadingCalifCurso } = useObtenerCalificacionesClientePorCurso(token, usuario.idUsuario, curso.idCurso)

    const irLeccion = (leccionId) => {
        navigation(`/cliente/curso/leccion/${curso.idCurso}/${leccionId}/${curso.idRelacion}`)
    }

    if (isLoadingLeccionesCurso || isLoadingCalifCurso) return <Cargando />

    const ListaLeccionesCurso = leccionesCurso.filter((leccion) => leccion.estatus == 1)

    return (
        <div className="row p-5">
            <h3 className="text-center display-3 mb-5" style={{ color: "#ffa100" }} >Lecciones del curso</h3>

            <div className="list-group">

                {
                    ListaLeccionesCurso.length == 0 ?
                        <div className="list-group-item" >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">El curso no cuenta con lecciones</h5>
                            </div>
                        </div>
                        :
                        ListaLeccionesCurso.map((leccion, index) => {

                            if (califCurso.length == 0 && index == 0) {
                                return <div key={leccion.idLeccion} className="list-group-item" >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Lección {index + 1}: {leccion.nombre}</h5>
                                        <button className="btn btn-outline-primary btn-sm" onClick={() => irLeccion(leccion.idLeccion)} ><BiLinkExternal size="1.5rem" /></button>
                                    </div>
                                    <p className="mb-1 mt-1">{leccion.informacion}</p>
                                </div>
                            }

                            if (califCurso.length == 0 && index > 0) {
                                return <div key={leccion.idLeccion} className="list-group-item" >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Lección {index + 1}: {leccion.nombre}</h5>
                                        <button className="btn btn-outline-secoundary btn-sm" disabled ><BiLinkExternal size="1.5rem" /></button>
                                    </div>
                                    <p className="mb-1 mt-1">{leccion.informacion}</p>
                                </div>
                            }

                            if (index <= califCurso.length) {

                                if (index != califCurso.length) {
                                    return <div key={leccion.idLeccion} className="list-group-item" >
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Lección {index + 1}: {leccion.nombre}</h5>
                                            <button className="btn btn-outline-primary btn-sm" onClick={() => irLeccion(leccion.idLeccion)} ><BiLinkExternal size="1.5rem" /></button>
                                        </div>
                                        <p className="mb-1 mt-1">{leccion.informacion}</p>
                                    </div>
                                }

                                let c = califCurso[index - 1]
                                if (c.calificacion >= 8) {
                                    return <div key={leccion.idLeccion} className="list-group-item" >
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Lección {index + 1}: {leccion.nombre}</h5>
                                            <button className="btn btn-outline-primary btn-sm" onClick={() => irLeccion(leccion.idLeccion)} ><BiLinkExternal size="1.5rem" /></button>
                                        </div>
                                        <p className="mb-1 mt-1">{leccion.informacion}</p>
                                    </div>
                                }
                                else {
                                    return <div key={leccion.idLeccion} className="list-group-item" >
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Lección {index + 1}: {leccion.nombre}</h5>
                                            <button className="btn btn-outline-secoundary btn-sm" disabled ><BiLinkExternal size="1.5rem" /></button>
                                        </div>
                                        <p className="mb-1 mt-1">{leccion.informacion}</p>
                                    </div>
                                }


                            }
                            return <div key={leccion.idLeccion} className="list-group-item" >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">Lección {index + 1}: {leccion.nombre}</h5>
                                    <button className="btn btn-outline-secoundary btn-sm" disabled ><BiLinkExternal size="1.5rem" /></button>
                                </div>
                                <p className="mb-1 mt-1">{leccion.informacion}</p>
                            </div>


                        })
                }

            </div>
        </div>
    )
}

export default ListaLecciones