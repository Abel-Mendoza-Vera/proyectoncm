import { useState } from "react";
import Swal from "sweetalert2";

import { useAccesoStore } from "../../store/accesoStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearCuestionario, modificarCuestionario } from "../../hooks/useCuestionario";

function FormularioCuestionario({ leccionId = 0, cuestionarioId = 0, nombre = "" }) {

    const token = useAccesoStore((state) =>  state.token)
    const queryClient = useQueryClient()

    const useCrearCuestionario = useMutation({
        mutationFn: crearCuestionario,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar cuestionario", text: "El cuestionario se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getCuestionarios")
        },
        onError: () => { Swal.fire({ title: "Guardar cuestionario", text: "El cuestionario no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const useModificarCuestionario = useMutation({
        mutationFn: modificarCuestionario,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar cuestionario", text: "El cuestionario se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getCuestionarios")
        },
        onError: () => { Swal.fire({ title: "Guardar cuestionario", text: "El cuestionario no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })


    const [nombreCuestionario, setNombreCuestionario] = useState(nombre)
    const handlerChangeNombre = (e) => {
        setNombreCuestionario(e.target.value)
    }

    const handlerGuardarCuestionario = async () => {

        if (nombreCuestionario.length == 0) {
            Swal.fire({
                title: "Guardar cuestionario",
                text: "Es necesario ingresar el nombre del cuestionario",
                icon: "warning",
                timer: 2000,
                timerProgressBar: true,
            })
        }
        else {
            
            let cuestionario = {
                idLeccion: leccionId,
                nombre: nombreCuestionario
            }

            if (cuestionarioId == 0) { // Se va a guardar por primera vez    
                useCrearCuestionario.mutate({ token, cuestionario })
            }
            else {
                useModificarCuestionario.mutate({ token, idCuestionario: cuestionarioId, cuestionario })
            }
        }
    }

    return (
        <>
            <div className="row mt-3">
                {
                    cuestionarioId == 0 ?
                    <>
                    <div className='alert alert-warning' role="alert">No se ha agregado un cuestionario para esta lección.</div>
                    <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#cuestionarioModal" ><span className='material-icons'>add</span>Agregar cuestionario</button>
                    </>
                    :
                    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#cuestionarioModal" ><span className='material-icons'>edit</span>Editar cuestionario</button>
                }
                
            </div>

            <div className="modal fade" id="cuestionarioModal" tabIndex="-1" aria-labelledby="cuestionarioModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="cuestionarioModalLabel">Guardar cuestionario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="nombreCuestionario" name="nombreCuestionario" placeholder="" value={nombreCuestionario} onChange={handlerChangeNombre} />
                                <label htmlFor="nombreCuestionario">Nombre del cuestionario</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handlerGuardarCuestionario} >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioCuestionario