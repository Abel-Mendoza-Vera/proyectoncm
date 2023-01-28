

const FormularioAgregarArchivoCurso = ({ tipo, idCurso }) => {
    return (
        <>

            {/** Botón modal */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                {`Agregar ${tipo}`}
            </button>

            {/** Formulario modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{`Agregar ${tipo}`}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="archivo">Archivo</label>
                            <input className="form-control" type="file" name="archivo" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-success">Guardar archivo</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioAgregarArchivoCurso