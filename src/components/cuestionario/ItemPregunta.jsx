import Swal from "sweetalert2"

import FormularioModificarPregunta from "./FormularioModificarPregunta"

import { useAccesoStore } from "../../store/accesoStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { eliminarPregunta } from "../../hooks/usePregunta"

const ItemPregunta = ({ pregunta }) => {

    const token = useAccesoStore((state) => state.token)
    const queryClient = useQueryClient()
    const useEliminarPregunta = useMutation({
        mutationFn: eliminarPregunta,
        onSuccess: () => {
            Swal.fire({
                title: "Eliminar pregunta", text: "La pregunta se ha eliminado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getPreguntas")
        },
        onError: () => { Swal.fire({ title: "Eliminar pregunta", text: "La pregunta no se ha eliminado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const handlerDeletePregunta = () => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Eliminar pregunta',
            text: "¿Usted esta seguro de eliminar la pregunta?\nNo sera posible revertir este cambio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: "Cancelar"
        }).then( async (result) => {
            if (result.isConfirmed) {
                useEliminarPregunta.mutate({ token, idPregunta: pregunta.idPregunta })
            }
        })

    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{pregunta.enunciado}</div>
                <div className="text-success">{pregunta.respuesta_correcta}</div>
            </div>
            <div>
                <FormularioModificarPregunta pregunta={pregunta} />
                <button className="btn btn-danger btn-sm" onClick={handlerDeletePregunta}><span className="material-icons fs-6">delete</span></button>
            </div>
        </li>
    )
}

export default ItemPregunta