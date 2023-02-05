import { useCursoStore } from "../../store/cursoStore"
import { useArchivoStore } from "../../store/archivoStore"

import imgDefault from '../../assets/curso.jpg'

import FormularioModificarCurso from "../../components/curso/FormularioModificarCurso"
import FormularioAgregarImagenCurso from "../../components/archivo/FormularioAgregarImagenCurso"
import FormularioAgregarVideoCurso from '../../components/archivo/FormularioAgregarVideoCurso'

const A_DetalleCurso = ({cursoId, cursoNombre}) => {

    let cursos = useCursoStore((state) => state.cursos)
    let archivos = useArchivoStore((state) => state.archivos)

    let curso = cursos.find((item) => item.idCurso == cursoId)
    let imagenCurso = archivos.find((item) => item.idArchivo == curso.idMiniatura && item.extencion.includes("image"))
    let videoCurso = archivos.find((item) => item.idArchivo == curso.idVideo && item.extencion.includes("video"))

    return (
        <>
            <div className='container mt-3'>
                {/** Botón editar curso */}
                <div className="row-1">
                    {/** Abrira modal del fomulario del curso */}
                    <FormularioModificarCurso curso={curso} />
                </div>

                {/** Información del curso */}
                <div className="row row-2 mt-3">
                    <div className="col-12 col-md-8">
                        <h3><strong>{curso.nombre}</strong></h3>
                        <h5 className="text-end text-danger">$ {curso.precio} MXN</h5>
                        <p><strong>Duración:</strong> {curso.duracion} horas</p>
                        <p><strong>Objetivo:</strong></p>
                        <p>{curso.objetivos}</p>
                        <p><strong>Descripción:</strong></p>
                        <p>{curso.descripcion}</p>
                    </div>

                    <div className="col">

                        <div className="row">

                            {
                                curso.idMiniatura != 0 ?
                                    <img src={imagenCurso.url} alt="imagenCurso" className="img-fluid rounded mb-2" />
                                    :
                                    <img src={imgDefault} alt="imagenCurso" className="img-fluid rounded mb-2" />
                            }
                            <FormularioAgregarImagenCurso idCurso={curso.idCurso} cursoNombre={cursoNombre} idImagen={curso.idMiniatura} objImagen={imagenCurso} />
                        </div>

                        <div className="row mt-3">
                            {
                                curso.idVideo != 0 ?
                                    <video controls className="object-fit-fill mb-2">
                                        <source src={videoCurso.url} type={videoCurso.extencion} />
                                    </video>
                                    :
                                    <div className="alert alert-warning" role="alert"><p>No se ha agregado un video para este curso.</p></div>
                            }
                            <FormularioAgregarVideoCurso idCurso={curso.idCurso} cursoNombre={cursoNombre} idVideo={curso.idVideo} objVideo={videoCurso} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default A_DetalleCurso