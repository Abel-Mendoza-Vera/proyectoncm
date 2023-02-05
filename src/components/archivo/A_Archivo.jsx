import { useArchivoStore } from '../../store/archivoStore'
import { shallow } from 'zustand/shallow'

import FormularioAgregarArchivoLeccion from "./FormularioAgregarArchivoLeccion"
import { useEffect } from 'react'
import ListaArchivosByLeccion from './ListaArchivosByLeccion'

const A_Archivo = ({ leccionId, cursoNombre, leccionNombre }) => {

    const { archivosByLeccion, getArchivosByLeccion } = useArchivoStore((state) => ({
        archivosByLeccion: state.archivosByLeccion,
        getArchivosByLeccion: state.getArchivosByLeccion
    }), shallow)

    useEffect(() => {
        getArchivosByLeccion(leccionId)
    }, [])

    return (
        <>
            <hr />
            <h3><strong className="me-4">Archivos</strong></h3>

            {/** Boton para agregar un archivo y alert */}
            <FormularioAgregarArchivoLeccion numArchivosByLeccion={archivosByLeccion.length} leccionId={leccionId} cursoNombre={cursoNombre} leccionNombre={leccionNombre} />

            {/** Listado de archivos de la leccion */}
            <ListaArchivosByLeccion archivosByLeccion={archivosByLeccion} leccionId={leccionId} cursoNombre={cursoNombre} leccionNombre={leccionNombre} />
            
        </>
    )
}

export default A_Archivo