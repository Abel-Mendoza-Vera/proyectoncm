import { useState } from "react"
import Swal from "sweetalert2"
import { useCuestionarioStore } from "../../store/cuestionarioStore"

const FormularioAgregarCuestionario = () => {

    const saveCuestionario = useCuestionarioStore((state) => state.saveCuestionario)

    // obtener datos del formulario
    const [formularioAgregarCuestionario, setFormularioAgregarCuestionario] = useState({
        nombre: "",
        precio: 1,
        objetivos: "",
        descripcion: "",
        duracion: 1
    })

    const { nombre, precio, objetivos, descripcion, duracion } = formularioAgregarCuestionario

    const handleChange = (e) => {
        setFormularioAgregarCuestionario({
            ...formularioAgregarCuestionario,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {
        const status = await saveCuestionario(enunciado)
        alerta(status)
    }

    const alerta = (status) => {
        if (status == 200) {
            Swal.fire({
                title: "Guardar cuestionario",
                text: "El cuestionario se ha guardado correctamente",
                icon: "success",
                timer: 1500,
                timerProgressBar: true,

            })
        }
        else {
            Swal.fire({
                title: "Guardar cuestionario",
                text: "Ha ocurrio un error al momento de guardar un cuestionario",
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
            })
        }
    }


    return (
        <>

            { /** Boton para mostrar el modal */}
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#agregarCuestionarioModal" ><span className="material-icons">add</span>Agregar</button>


            {/** Modal - Formulario */}
            <div className="modal fade" id="agregarCuestionarioModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar cuestionario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name='enunciado' placeholder="" />
                                <label htmlFor="enunciado">Enunciado</label>
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

export default FormularioAgregarCuestionario