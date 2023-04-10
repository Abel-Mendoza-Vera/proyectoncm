import FormularioAgregarArchivoLeccion from "./FormularioAgregarArchivoLeccion"
import ListaArchivosByLeccion from './ListaArchivosByLeccion'

import { useObtenerArchivoPorLeccion } from '../../hooks/useArchivo'

const A_Archivo = ({ leccionId, cursoId }) => {

    const { data, isLoading } = useObtenerArchivoPorLeccion(leccionId)

    if (isLoading) return <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>

    return (
        <>
            <hr />
            <h3><strong className="me-4">Archivos</strong></h3>

            {/** Boton para agregar un archivo y alert */}
            <FormularioAgregarArchivoLeccion numArchivosByLeccion={data.length} leccionId={leccionId} cursoId={cursoId}  />

            {/** Listado de archivos de la leccion */}
            <ListaArchivosByLeccion archivosByLeccion={data} leccionId={leccionId} cursoId={cursoId} />
            
        </>
    )
}

export default A_Archivo