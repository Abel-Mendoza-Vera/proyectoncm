import { useLeccionStore } from "../../store/leccionStore"
import { useArchivoStore } from "../../store/archivoStore"

import FormularioModificarLeccion from "../../components/leccion/FormularioModificarLeccion"
import FormularioAgregarVideoLeccion from '../archivo/FormularioAgregarVideoLeccion'

const A_DetalleLeccion = ({ leccionId, cursoNombre }) => {

    let lecciones = useLeccionStore((state) => state.lecciones)
    let archivos = useArchivoStore((state) => state.archivos)

    let leccion = lecciones.find((item) => item.idLeccion == leccionId)
    let videoLeccion = archivos.find((item) => item.idArchivo == leccion.idVideo)

    return (
        <>
            <div className='container mt-3'>
                {/** Botón editar lección */}
                <div className="row-1">
                    {/** Abrira modal del fomulario de la leccion */}
                    <FormularioModificarLeccion leccion={leccion} />
                </div>
                <div className='container mt-3'>
                    {/** Información de la lección */}
                    <div className="row row-2 mt-3">
                        <div className="col-12 col-md-8">
                            <h3><strong>{leccion.nombre}</strong></h3>
                            <p><strong>Información:</strong></p>
                            <p>{leccion.informacion}</p>
                        </div>

                        <div className="col">
                            <div className="row">
                                {
                                    leccion.idVideo != 0 ?
                                        <video controls className="object-fit-fill mb-2">
                                            <source src={videoLeccion.url} type={videoLeccion.extencion} />
                                        </video>
                                        :
                                        <div className="alert alert-warning" role="alert"><p>No se ha agregado un video para esta lección.</p></div>
                                }
                                <FormularioAgregarVideoLeccion idLeccion={leccionId} idVideo={leccion.idVideo} objVideo={videoLeccion} cursoNombre={cursoNombre} leccionNombre={leccion.nombre} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default A_DetalleLeccion