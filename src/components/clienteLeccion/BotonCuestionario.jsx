import Swal from "sweetalert2"
import { useAccesoStore } from "../../store/accesoStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registrarCalificacion, modificarCalificacion } from "../../hooks/useCalificacion"
import { api } from "../../api/novatec"

const BotonCuestionario = ({ cuestionario, idCurso }) => {
    
    const queryClient = useQueryClient()
    const { token, usuario } = useAccesoStore((state) => ({
        token: state.token,
        usuario: state.usuario
    }))

    const useRegistrarCalificacion = useMutation({
        mutationFn: registrarCalificacion,
        onSuccess: () => {
            queryClient.invalidateQueries("getCalifClienteCurso")
        }
    })

    const useModificarCalificacion = useMutation({
        mutationFn: modificarCalificacion,
        onSuccess: () => {
            queryClient.invalidateQueries("getCalifClienteCurso")
        }
    })

    const obtenerCalif = async () => {
        const result = await api.get(`/calificacion_una/${usuario.idUsuario}/${cuestionario.idCuestionario}`, { headers: { "x-access-token": token } })
        return result.data
    }

    const handleFormCuestionario = async (e) => {
        e.preventDefault()

        let contador = 0

        let formElement = document.getElementById("formCuestionario")
        let formData = new FormData(formElement)

        for (const [key, value] of formData) {
            let idP = Number(key.replace("p", ""))

            let pregunta = cuestionario.preguntas.find((p) => p.idPregunta == idP)

            if (pregunta.respuesta_correcta == value) {
                contador += 1
            }

        }

        let calificacion = (contador / cuestionario.preguntas.length) * 10
        calificacion = calificacion.toFixed(0)

        const calificacionAlmacenada = await obtenerCalif()

        if (calificacionAlmacenada.idCalificacion == 0) {
            let datos = {
                idCuestionario: cuestionario.idCuestionario,
                idCurso,
                idLeccion: cuestionario.idLeccion,
                idCliente: usuario.idUsuario,
                calificacion
            }
            useRegistrarCalificacion.mutate({ token, datos})
            Swal.fire({
                title: cuestionario.nombre,
                text: calificacion >= 8 ? `Tu calificación es de ${calificacion}, felicidades puedes seguir a la siguiente lección.` : `Tu calificación es de ${calificacion}, lo siento no pudieste alcanzar la calificación minima para avanzar a la siguiente lección.`,
                icon: calificacion >= 8 ? "success" : "error"
            })
        }
        else if(calificacionAlmacenada.calificacion < calificacion){
            useModificarCalificacion.mutate({token, idCalificacion: calificacionAlmacenada.idCalificacion, calificacion})
            Swal.fire({
                title: cuestionario.nombre,
                text: calificacion >= 8 ? `Tu calificación es de ${calificacionAlmacenada.calificacion}, felicidades puedes seguir a la siguiente lección.` : `Tu calificación es de ${calificacionAlmacenada.calificacion}, lo siento no pudieste alcanzar la calificación minima para avanzar a la siguiente lección.`,
                icon: calificacion >= 8 ? "success" : "error"
            })
        }        

    }

    return (
        <>

            <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#cuestionarioModal">
                Cuestionario
            </button>


            <div className="modal fade" id="cuestionarioModal" tabIndex="-1" aria-labelledby="cuestionarioModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="cuestionarioModalLabel">{cuestionario.nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="formCuestionario" onSubmit={(e) => handleFormCuestionario(e)}>
                                {
                                    cuestionario.preguntas.map((p, index) => {

                                        return <div key={p.idPregunta} className="py-3">
                                            <label>Pregunta #{index + 1}: {p.enunciado}</label>
                                            <select className="form-select" name={`p${p.idPregunta}`} id={`p${p.idPregunta}`}>
                                                <option value="--">--</option>
                                                <option value={`${p.respuesta1}`}>{p.respuesta1}</option>
                                                <option value={`${p.respuesta2}`}>{p.respuesta2}</option>
                                                <option value={`${p.respuesta3}`}>{p.respuesta3}</option>
                                                <option value={`${p.respuesta4}`}>{p.respuesta4}</option>
                                            </select>
                                        </div>

                                    })
                                }
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" form="formCuestionario" className="btn btn-success">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default BotonCuestionario