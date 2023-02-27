import { Link, useNavigate, useParams } from "react-router-dom"
import { useObtenerCursoPorId } from "../../hooks/useCurso"
import { useObtenerArchivos } from "../../hooks/useArchivo"
import { useObtenerLeccionesPorCurso } from "../../hooks/useLeccion"
import imgDefault from '../../assets/curso.jpg'

import Cargando from '../../pages/Cargando'
import { BiLinkExternal } from "react-icons/bi"

import { useAccesoStore } from '../../store/accesoStore'
import AgregarAlCarrito from "../../components/carrito/AgregarAlCarrito"

const U_Curso = () => {

    const { idCurso } = useParams()
    const navigation = useNavigate()
    const acceso = useAccesoStore((state) => state.acceso)

    const { data: curso, isLoading: isLoadingCurso } = useObtenerCursoPorId(idCurso)
    const { data: leccionesCurso, isLoading: isLoadingLeccionesCurso } = useObtenerLeccionesPorCurso(idCurso)
    const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos()

    if (isLoadingCurso || isLoadingLeccionesCurso || isLoadingArchivos) return <Cargando />

    let archivoVideo = archivos.find((archivo) => archivo.idArchivo == curso.idVideo)
    let archivoMiniatura = archivos.find((archivo) => archivo.idArchivo == curso.idMiniatura)

    const irLeccion = (leccionId) => {
        navigation(`/curso/leccion/${idCurso}/${curso.nombre}/${leccionId}`)
    }


    return (
        <div className="container-fluid">

            {/** Detalle del curso */}
            <div className="row row-2 text-white py-5 px-5" style={{ backgroundColor: "#274a93", /*height: "35vh" */ }}>

                <h3 className="text-center display-3 mb-5"><strong>{curso.nombre}</strong></h3>

                <div className="col-12 col-md-6" style={{ fontSize: "1.3rem" }}>
                    <div className="row">
                        <div className="col-6">
                            <p><strong>Duración:</strong></p>
                            <p>{curso.duracion} horas</p>
                        </div>
                        <div className="col-6">
                            <p><strong>Precio:</strong></p>
                            <p>$ {curso.precio} MXN</p>
                        </div>
                    </div>

                    <p><strong>Objetivo:</strong></p>
                    <p>{curso.objetivos}</p>

                    <p><strong>Descripción:</strong></p>
                    <p>{curso.descripcion}</p>

                    <div className="d-flex justify-content-end">
                        <AgregarAlCarrito idCurso={idCurso} blanco />
                    </div>

                </div>

                <div className="col-12 col-md-6 d-flex justify-content-center align-content-center">
                    {/**/}
                    {
                        archivoVideo ?
                            <video controls >
                                <source src={archivoVideo.url} type={archivoVideo.extencion} />
                            </video>
                            :
                            archivoMiniatura ?
                                <img className="img-fluid" width="500" src={archivoMiniatura.url} alt
                                    ={archivoMiniatura.nombre} />
                                :
                                <img className="img-fluid" width="500" src={imgDefault} alt={curso.nombre} />
                    }
                </div>

            </div>
            {/** Lecciones del curso */}
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
                                        {
                                            index > 0 && !acceso ?
                                                <button className="btn btn-outline-dark btn-sm" disabled ><BiLinkExternal size="1.5rem" /></button>
                                                :
                                                <button className="btn btn-outline-primary btn-sm" onClick={() => irLeccion(leccion.idLeccion)} ><BiLinkExternal size="1.5rem" /></button>
                                        }
                                    </div>
                                    <p className="mb-1 mt-1">{leccion.informacion}</p>
                                </div>

                            })
                    }

                </div>
            </div>
        </div>
    )
}

export default U_Curso