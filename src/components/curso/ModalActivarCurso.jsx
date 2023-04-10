import { useAccesoStore } from "../../store/accesoStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activarCursoCliente } from "../../hooks/useCursoCliente";
import Swal from "sweetalert2";

const ModalActivarCurso = ({ curso }) => {

    const queryClient = useQueryClient()
    const token = useAccesoStore((state) => state.token)

    const useActivarCurso = useMutation({
        mutationFn: activarCursoCliente,
        onSuccess: () => {
            Swal.fire({
                title: "Activar curso",
                text: `El curso ${curso.nombre} se ha activado correctamente`,
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            })
            queryClient.invalidateQueries("getCursosCliente")
            let btnCerrar = document.getElementById(`btnCerrarMActivacion${curso.idCurso}`)
            btnCerrar.click()
        },
        onError: () => {
            Swal.fire({
                title: "Activar curso",
                text: `El curso ${curso.nombre} no se ha activado correctamente`,
                icon: "error",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    })

    const handleActivar = () => {
        const idRelacion = curso.idRelacion
        let nombreInput = `inputCodigoAuth${idRelacion}`
        const codigoAutorizacion = document.getElementById(nombreInput).value

        if(codigoAutorizacion.length != 6) {
            return Swal.fire({
                title: "Activar curso",
                text: `El codigo de autorizacion debe contener 6 digitos.`,
                icon: "info",
                iconColor: "orange",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }

        useActivarCurso.mutate({ token, idRelacion, codigoAutorizacion })
    }
    
    return (
        <>
            <button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target={`#authModal${curso.idRelacion}`} >Activar</button>

            <div className="modal fade" id={`authModal${curso.idRelacion}`} tabIndex="-1" aria-labelledby={`authModalLabel${curso.idRelacion}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`authModalLabel${curso.idRelacion}`}>Activar curso</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Para activar el curso: {curso.nombre}</p>
                            <p>Ingrese el codigo de autorización</p>
                            <input type="number" id={`inputCodigoAuth${curso.idRelacion}`} maxLength="6" minLength="6" step="1" className='form-control form-control-lg text-center' placeholder='000000' />
                        </div>
                        <div className="modal-footer">
                            <button id={`btnCerrarMActivacion${curso.idCurso}`} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" onClick={handleActivar} className="btn btn-success">Activar curso</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalActivarCurso