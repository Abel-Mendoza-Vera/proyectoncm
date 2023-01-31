
const FormularioAgregarLeccion = () => {
    return (
        <>
            {/** Botón accionador del modal */}
            <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#leccionAgregar"><span className="material-icons">add</span>Agregar lección</button>

            {/** Modal del formulario */}
            <div className="modal fade" id="leccionAgregar" tabIndex="-1" aria-labelledby="leccionAgregarLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="leccionAgregarLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success"><span className="material-icons">save</span>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioAgregarLeccion