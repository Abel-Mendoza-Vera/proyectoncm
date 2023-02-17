import FormularioModificarLeccion from "../../components/leccion/FormularioModificarLeccion"
import FormularioAgregarVideoLeccion from '../archivo/FormularioAgregarVideoLeccion'

import { useObtenerArchivos } from "../../hooks/useArchivo"

const A_DetalleLeccion = ({ leccion, cursoNombre }) => {


    const { data, isLoading } = useObtenerArchivos()

    if (isLoading) return <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>

    let videoLeccion = data.find((item) => item.idArchivo == leccion.idVideo)

    console.log(videoLeccion);
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
                                <FormularioAgregarVideoLeccion idLeccion={leccion.idLeccion} idVideo={leccion.idVideo} objVideo={videoLeccion} cursoNombre={cursoNombre} leccionNombre={leccion.nombre} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default A_DetalleLeccion