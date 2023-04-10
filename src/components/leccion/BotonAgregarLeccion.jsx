import Swal from "sweetalert2"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAccesoStore } from "../../store/accesoStore"
import { useObtenerLeccionesPorCurso, crearLeccion } from "../../hooks/useLeccion"

const BotonAgregarLeccion = ({ cursoId }) => {

    const { data } = useObtenerLeccionesPorCurso(cursoId)

    const token = useAccesoStore((state) => state.token)
    const queryClient = useQueryClient()

    const useCrearLeccion = useMutation({
        mutationFn: crearLeccion,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar lección", text: "El lección se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getLecciones")
            queryClient.invalidateQueries("getLeccionesCurso")
        },
        onError: () => { Swal.fire({ title: "Guardar lección", text: "El lección no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })
    
    const handleGuardarLeccion = async () => {

        let leccionesDelCurso = data
        
        let nombreLeccion = `Lección ${leccionesDelCurso.length + 1}`

        let leccion = {
            idCurso: cursoId,
            nombre: nombreLeccion,
            informacion: `Información de la ${nombreLeccion}`
        }
        
        useCrearLeccion.mutate({ token, leccion })
    }

    return (
        <>
            <button className="btn btn-outline-success" onClick={handleGuardarLeccion} >
                <span className="material-icons">add</span>Agregar lección
            </button>
        </>
    )
}

export default BotonAgregarLeccion