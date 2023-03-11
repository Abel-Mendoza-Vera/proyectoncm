import { useNavigate } from "react-router-dom"
import { BiLinkExternal } from "react-icons/bi"
import { useObtenerLeccionesPorCurso } from "../../hooks/useLeccion"
import Cargando from "../../pages/Cargando"

const ListaLecciones = ({ curso }) => {
    const navigation = useNavigate()
    const { data: leccionesCurso, isLoading: isLoadingLeccionesCurso } = useObtenerLeccionesPorCurso(curso.idCurso)

    const irLeccion = (leccionId) => {
        navigation(`/cliente/curso/leccion/${curso.idCurso}/${curso.nombre}/${leccionId}`)
    }

    if ( isLoadingLeccionesCurso) return <Cargando />

    return (
        <div className="row p-5">
            <h3 className="text-center display-3 mb-5" style={{ color: "#ffa100" }} >Lecciones del curso</h3>

            <div className="list-group">

                {
                    leccionesCurso.length == 0 ?
                        <div className="list-group-item" >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">El curso no cuenta con lecciones</h5>
                            </div>
                        </div>
                        :
                        leccionesCurso.map((leccion, index) => {

                            return <div key={leccion.idLeccion} className="list-group-item" >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">Lección {index + 1}: {leccion.nombre}</h5>
                                    <button className="btn btn-outline-primary btn-sm" onClick={() => irLeccion(leccion.idLeccion)} ><BiLinkExternal size="1.5rem" /></button>
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