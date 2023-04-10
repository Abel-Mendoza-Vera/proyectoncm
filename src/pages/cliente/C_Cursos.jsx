import { useParams } from "react-router-dom"
import { useObtenerCursoCliente } from "../../hooks/useCursoCliente"
import { useObtenerArchivos } from "../../hooks/useArchivo"
import imgDefault from '../../assets/curso.jpg'

import Cargando from '../../pages/Cargando'

import { useAccesoStore } from '../../store/accesoStore'
import ListaLecciones from "../../components/clienteLeccion/ListaLecciones"

const C_Curso = () => {

    const { idCurso } = useParams()
    
    const { token, usuario } = useAccesoStore((state) => ({
        token: state.token,
        usuario: state.usuario
    }))

    const { data: curso, isLoading: isLoadingCurso } = useObtenerCursoCliente(token, usuario.idUsuario, idCurso)
    const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos()

    if (isLoadingCurso || isLoadingArchivos) return <Cargando />

    let archivoVideo = archivos.find((archivo) => archivo.idArchivo == curso.idVideo)
    let archivoMiniatura = archivos.find((archivo) => archivo.idArchivo == curso.idMiniatura)


    return (
        <div className="container-fluid">

            {/** Detalle del curso */}
            <div className="row row-2 text-white py-5 px-5" style={{ backgroundColor: "#274a93", /*height: "35vh" */ }}>

                <h3 className="text-center display-3 mb-5"><strong>{curso.nombre}</strong></h3>

                <div className="col-12 col-md-6" style={{ fontSize: "1.3rem" }}>
                    <div className="row">
                            <p><strong>Duración:</strong> {curso.duracion} horas</p>
                    </div>

                    <p><strong>Objetivo:</strong></p>
                    <p>{curso.objetivos}</p>

                    <p><strong>Descripción:</strong></p>
                    <p>{curso.descripcion}</p>

                </div>

                <div className="col-12 col-md-6 d-flex justify-content-center align-content-center">
                    {
                        archivoVideo ?
                            <video controls width="500">
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
            <ListaLecciones curso = { curso } />
        </div>
    )
}

export default C_Curso