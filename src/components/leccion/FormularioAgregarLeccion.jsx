import { useState } from "react"
import Swal from "sweetalert2"
import { useLeccionStore } from "../../store/leccionStore"

const FormularioAgregarLeccion = () => {

    const saveLeccion = useLeccionStore((state) => state.saveLeccion)

    // obtener datos del formulario
    const [FormularioAgregarLeccion, setFormularioLeccion] = useState({
        nombre: "",
        informacion: "",
    })

    const { nombre, informacion } = FormularioAgregarLeccion

    const handleChange = (e) => {
        setFormularioLeccion({
            ...FormularioAgregarLeccion,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {
        const status = await saveLeccion( nombre, informacion  )
        alerta(status)
    }

    const alerta = (status) => {
        if ( status == 200 ) {
            Swal.fire({
                title: "Guardar lección",
                text: "La lección se ha guardado correctamente",
                icon: "success",
                timer: 1500,
                timerProgressBar: true,

            })
        }
        else{
            Swal.fire({
                title: "Guardar lección",
                text: "Ha ocurrio un error al momento de guardar una lección",
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
            })
        }
    }

    return (
        <>
            {/** Botón accionador del modal */}
            <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#leccionAgregar"><span className="material-icons">add</span>Agregar lección</button>

            {/** Modal del formulario */}
            <div className="modal fade" id="leccionAgregar" tabIndex="-1" aria-labelledby="leccionAgregarLabel" aria-hidden="true"> 
            <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="leccionAgregarLabel">Agregar Lección</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="form-floating mb-3">
                                <input type="text"  className="form-control"  name='nombre' placeholder="" />
                                <label htmlFor="nombre">Nombre</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control" onChange={(e) => handleChange(e)} value={informacion} placeholder="" name="informacion" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="informacion">Información</label>
                            </div>                          


                            <div className="d-flex justify-content-evenly">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><span className='material-icons'>close</span>Cerrar</button>
                                <button onClick={handleSave} type="submit" className="btn btn-success" data-bs-dismiss="modal"><span className='material-icons'>save</span>Guardar</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FormularioAgregarLeccion