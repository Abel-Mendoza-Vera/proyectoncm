import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

import { useAccesoStore } from "../../store/accesoStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cambiarEstadoLeccion } from "../../hooks/useLeccion"

const A_Registro_Leccion = ({ leccion, cursoId }) => {

    const navigate = useNavigate()
    const token = useAccesoStore((state) => state.token)
    const queryClient = useQueryClient()
    const useCambiarEstadoLeccion = useMutation({
        mutationFn: cambiarEstadoLeccion,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar lección", text: "La lección se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getLecciones")
            queryClient.invalidateQueries("getLeccionesCurso")
        },
        onError: () => { Swal.fire({ title: "Guardar lección", text: "La lección no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const eliminarLeccion = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Eliminar lección',
            text: "¿Esta seguro de querer eliminar la lección?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminalo'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let idLeccion = leccion.idLeccion
                useCambiarEstadoLeccion.mutate({ token, idLeccion, operacion: 0 })
            }
        })
    }

    const activarLeccion = async () => {
        let idLeccion = leccion.idLeccion
        useCambiarEstadoLeccion.mutate({ token, idLeccion, operacion: 1 })
         
    }

    const editar_leccion = () => {
        navigate(`/admin/lecciones/${cursoId}/${leccion.idLeccion}`) 
    }

    return (
        <tr >
            <td>{leccion.idLeccion}</td>
            <td>{leccion.nombre}</td>
            <td>{leccion.informacion}</td>
            <td>
                {
                    leccion.estatus == 1 ?
                        <span className="material-icons text-success">toggle_on</span>
                        :
                        <span className="material-icons text-danger">toggle_off</span>
                }
            </td>
            <td>
                <button className='btn btn-primary btn-sm me-2' onClick={editar_leccion} ><span className='material-icons'>edit</span></button>
                {
                    leccion.estatus == 1 ?
                        <button className='btn btn-danger btn-sm' onClick={eliminarLeccion}><span className='material-icons'>delete</span></button>
                        :
                        <button className='btn btn-success btn-sm' onClick={activarLeccion}><span className='material-icons'>power_settings_new</span></button>
                }
            </td>
        </tr>
    )
}

export default A_Registro_Leccion