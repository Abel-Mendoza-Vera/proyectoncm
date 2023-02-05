import ItemArchivoByLeccion from './ItemArchivoByLeccion'

const ListaArchivosByLeccion = ({ archivosByLeccion, leccionId, cursoNombre, leccionNombre }) => {

    return (
        <div className="card mt-4" style={{ height: "300px" }}>

            <div className="card-header d-flex justify-content-between">Archivos de la lección</div>

            <ol className="list-group list-group-flush list-group-numbered overflow-y-auto">

                {/** Item del archivo */}
                {
                    archivosByLeccion.map((item) => {
                        return (
                            <ItemArchivoByLeccion key={item.idArchivo} archivo={item} leccionId={leccionId} cursoNombre={cursoNombre} leccionNombre={leccionNombre} />
                        )
                    })

                }

            </ol>

        </div>
    )
}

export default ListaArchivosByLeccion