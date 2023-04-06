import { useState } from "react"
import Swal from "sweetalert2"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { modificarCurso } from "../../hooks/useCurso"
import { useAccesoStore } from "../../store/accesoStore"
import { validarCurso } from "../../lib/validarCurso"

const FormularioModificarCurso = ({ curso }) => {

    const token = useAccesoStore((state) => state.token)
    const queryClient = useQueryClient();
    const useModificarCurso = useMutation({
        mutationFn: modificarCurso,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar curso", text: "El curso se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getCursos")
        },
        onError: () => { Swal.fire({ title: "Guardar curso", text: "El curso no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    // obtener datos del formulario
    const [formulario, setFormulario] = useState({
        nombre: curso.nombre,
        precio: curso.precio,
        objetivos: curso.objetivos,
        descripcion: curso.descripcion,
        duracion: curso.duracion
    })

    const { nombre, precio, objetivos, descripcion, duracion } = formulario

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {

        const {pasaValidacion, mensaje} = validarCurso(formulario)

        if(pasaValidacion){
            useModificarCurso.mutate({ token, id: curso.idCurso, curso: formulario })
        let btnCerrar = document.getElementById("btnCerrarCursoM")
        btnCerrar.click();
        }
        else{
            Swal.fire({
                title: "Guardar curso", 
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
            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#agregarCursoModal" ><span className="material-icons">edit</span>Editar curso</button>
            
            

            {/** Modal - Formulario */}
            <div className="modal fade" id="agregarCursoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modificar curso</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="form-floating mb-3">
                                <input type="text" onChange={(e) => handleChange(e)} value={nombre} className="form-control" name='nombre' placeholder="" />
                                <label htmlFor="nombre">Nombre</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="number" onChange={(e) => handleChange(e)} value={precio} min='1' className="form-control" name='precio' placeholder="" />
                                <label htmlFor="precio">Precio</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control" onChange={(e) => handleChange(e)} value={objetivos} placeholder="" name="objetivos" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="objetivos">Objetivos</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control" onChange={(e) => handleChange(e)} value={descripcion} placeholder="" name="descripcion" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="descripcion">Descripción</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="number" onChange={(e) => handleChange(e)} value={duracion} min='1' className="form-control" name='duracion' placeholder="" />
                                <label htmlFor="duracion">Duración del curso</label>
                            </div>


                            <div className="d-flex justify-content-evenly">
                                <button id="btnCerrarCursoM" type="button" className="btn btn-danger" data-bs-dismiss="modal"><span className='material-icons'>close</span>Cerrar</button>
                                <button onClick={handleSave} type="submit" className="btn btn-success"><span className='material-icons'>save</span>Guardar</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioModificarCurso