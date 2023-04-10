import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

import { useAccesoStore } from "../../store/accesoStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cambiarEstadoCurso } from '../../hooks/useCurso'

const A_Registro = ({ curso }) => {

    const navigate = useNavigate()

    const token = useAccesoStore((state) => state.token)

    const queryClient = useQueryClient();
    const useCambiarEstadoCurso = useMutation({
        mutationFn: cambiarEstadoCurso,
        onSuccess: () => {
            Swal.fire({
                title: "Eliminar curso", text: "Se ha cambiado el estatus del curso correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getCursos")
        },
        onError: () => { Swal.fire({ title: "Eliminar curso", text: "No se ha cambiado el estatus del curso correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const alertaEliminar = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Eliminar curso',
            text: "¿Esta seguro de querer eliminar el curso?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminalo'
        }).then( async (result) => {
            if (result.isConfirmed) {
                let id = curso.idCurso
                useCambiarEstadoCurso.mutate({token, id, operacion: 0})
            }
        })
    }

    const alertaActivar = async () => {
        let id = curso.idCurso
        useCambiarEstadoCurso.mutate({token, id, operacion: 1})
    }

    const editar_curso = () => {
        navigate(`/admin/cursos_editar/${curso.idCurso}`)
    }

    return (
        <tr >
            <td>{curso.idCurso}</td>
            <td>{curso.nombre}</td>
            <td>{curso.objetivos}</td>
            <td>{curso.descripcion}</td>
            <td>$ {curso.precio} MXN</td>
            <td>{curso.duracion} horas</td>
            <td>
                {
                    curso.estatus == 1 ?
                        <span className="material-icons text-success">toggle_on</span>
                        :
                        <span className="material-icons text-danger">toggle_off</span>
                }
            </td>
            <td>
                <button className='btn btn-primary btn-sm me-2' onClick={editar_curso} ><span className='material-icons'>edit</span></button>
                {
                    curso.estatus == 1 ?
                        <button className='btn btn-danger btn-sm' onClick={alertaEliminar}><span className='material-icons'>delete</span></button>
                        :
                        <button className='btn btn-success btn-sm' onClick={alertaActivar}><span className='material-icons'>power_settings_new</span></button>
                }
            </td>
        </tr>
    )
}

export default A_Registro