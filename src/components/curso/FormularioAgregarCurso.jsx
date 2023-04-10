import { useState } from "react"
import Swal from "sweetalert2"

import { useAccesoStore } from "../../store/accesoStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { crearCurso } from '../../hooks/useCurso'
import { validarCurso } from "../../lib/validarCurso"

const Formulario = () => {

    const token = useAccesoStore((state) => state.token)
    const queryClient = useQueryClient()
    const useCrearCurso = useMutation({
        mutationFn: crearCurso,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar curso", text: "El curso se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getCursos")
            limpiar();
        },
        onError: () => { Swal.fire({ title: "Guardar curso", text: "El curso no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    // obtener datos del formulario
    const [formulario, setFormulario] = useState({
        nombre: "",
        precio: 1,
        objetivos: "",
        descripcion: "",
        duracion: 1
    })

    const { nombre, precio, objetivos, descripcion, duracion } = formulario

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    const limpiar = () => {

        setFormulario({
            ...formulario,
            nombre: "",
            precio: 1,
            objetivos: "",
            descripcion: "",
            duracion: 1
        })

        let btnCancelarCurso = document.getElementById("btnCerrarCurso");
        btnCancelarCurso.click();
    }

    const handleSave = async () => {

        const { pasaValidacion, mensaje } = validarCurso(formulario)

        if (pasaValidacion){
            useCrearCurso.mutate({ token, curso: formulario })
        }
        else{
            Swal.fire({
                title: "Guardar curso", 
                text: mensaje,
                icon: "warning",
                iconColor: "orange",
                timer: 3000, 
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
        
    }


    return (
        <>

            { /** Boton para mostrar el modal */}
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#agregarCursoModal" ><span className="material-icons">add</span>Agregar</button>
            

            {/** Modal - Formulario */}
            <div className="modal fade" id="agregarCursoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar curso</h1>
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
                                <button type="button" className="btn btn-danger" id="btnCerrarCurso" data-bs-dismiss="modal"><span className='material-icons'>close</span>Cerrar</button>
                                <button onClick={handleSave} type="submit" className="btn btn-success" ><span className='material-icons'>save</span>Guardar</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Formulario