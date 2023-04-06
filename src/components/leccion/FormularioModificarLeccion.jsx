import { useState } from "react"
import Swal from "sweetalert2"

import { useAccesoStore } from '../../store/accesoStore'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { modificarLeccion } from "../../hooks/useLeccion"
import { validarLeccion } from "../../lib/validarCurso"

const FormularioModificarLeccion = ({ leccion }) => {

    const token = useAccesoStore((state) => state.token)
    const queryClient = useQueryClient()
    const useModificarLeccion = useMutation({
        mutationFn: modificarLeccion,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar lección", text: "La lección se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getLecciones")
            queryClient.invalidateQueries("getLeccionesCurso")
        },
        onError: () => { Swal.fire({ title: "Guardar lección", text: "La lección no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    // obtener datos del formularioModificarLeccion
    const [formularioModificarLeccion, setFormularioModificarLeccion] = useState({
        nombre: leccion.nombre,
        informacion: leccion.informacion
    })

    const { nombre, informacion } = formularioModificarLeccion

    const handleChange = (e) => {
        setFormularioModificarLeccion({
            ...formularioModificarLeccion,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {

        const { pasaValidacion, mensaje } = validarLeccion(formularioModificarLeccion)

        if(pasaValidacion){
            useModificarLeccion.mutate({ token, idLeccion: leccion.idLeccion, leccion: formularioModificarLeccion })
        }
        else{
            Swal.fire({
                title: "Guardar lección", 
                text: mensaje, 
                icon: "warning", 
                timer: 3000, 
                timerProgressBar: true,
                showConfirmButton: false,
                iconColor: "orange"
            })
        }

    }

    return (
        <>

            { /** Boton para mostrar el modal */}
            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#agregarLeccionModal" ><span className="material-icons">edit</span>Editar lección</button>



            {/** Modal - Formulario */}
            <div className="modal fade" id="agregarLeccionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modificar lección</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="form-floating mb-3">
                                <input type="text" onChange={(e) => handleChange(e)} value={nombre} className="form-control" name='nombre' placeholder="" />
                                <label htmlFor="nombre">Nombre</label>
                            </div>



                            <div className="form-floating mb-3">
                                <textarea className="form-control" onChange={(e) => handleChange(e)} value={informacion} placeholder="" name="informacion" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="informacion">Información</label>
                            </div>




                            <div className="d-flex justify-content-evenly">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><span className='material-icons'>close</span>Cerrar</button>
                                <button onClick={handleSave} type="submit" className="btn btn-success"><span className='material-icons'>save</span>Guardar</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioModificarLeccion