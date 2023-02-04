import { useState } from "react";
import Swal from "sweetalert2";
import { usePreguntaStore } from "../../store/preguntaStore";

function FormularioPregunta({ cuestionarioId }) {

    const { savePregunta } = usePreguntaStore((state) => ({
        savePregunta: state.savePregunta
    }))

    const [formPregunta, setFormPregunta] = useState({
        enunciado: "",
        respuesta_correcta: "",
        respuesta1: "",
        respuesta2: "",
        respuesta3: "",
        respuesta4: ""
    })

    const { enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4 } = formPregunta

    const handlerChangePregunta = (e) => {
        setFormPregunta({
            ...formPregunta,
            [e.target.name]: e.target.value
        })
    }

    const handlerAgregarPregunta = async () => {

        let status = 500

        if (enunciado.length == 0 || respuesta_correcta.length == 0 || respuesta1.length == 0 || respuesta2.length == 0 || respuesta3.length == 0 || respuesta4.length == 0) {
            Swal.fire({
                title: "Guardar pregunta",
                text: "Es necesario ingresar datos en todos los campos del formulario",
                icon: "warning",
                timer: 2000,
                timerProgressBar: true,
            })
        }
        else {

            status = await savePregunta(cuestionarioId, enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4)

            if (status == 200) {
                Swal.fire({
                    title: "Guardar pregunta",
                    text: "La pregunta se ha guardado correctamente",
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                })
            }
            else {
                Swal.fire({
                    title: "Guardar pregunta",
                    text: "La pregunta no se ha podido guardar correctamente",
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true,
                })
            }
            setFormPregunta({
                enunciado: "",
                respuesta_correcta: "",
                respuesta1: "",
                respuesta2: "",
                respuesta3: "",
                respuesta4: ""
            })
        }

    }

    return (
        <>

            <button className='btn btn-success btn-sm' data-bs-toggle="modal" data-bs-target="#preguntaModal" ><span className='material-icons fs-6'>add</span>Agregar pregunta</button>


            <div className="modal fade" id="preguntaModal" tabIndex="-1" aria-labelledby="preguntaModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="preguntaModalLabel">Guardar pregunta</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="enunciado" placeholder="" value={enunciado} onChange={handlerChangePregunta} />
                                <label htmlFor="enunciado">Enunciado</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control border-success" name="respuesta_correcta" placeholder="" value={respuesta_correcta} onChange={handlerChangePregunta} />
                                <label htmlFor="respuesta_correcta">Respuesta correcta</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="respuesta1" placeholder="" value={respuesta1} onChange={handlerChangePregunta} />
                                <label htmlFor="respuesta1">Primera respuesta</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="respuesta2" placeholder="" value={respuesta2} onChange={handlerChangePregunta} />
                                <label htmlFor="respuesta2">Segunda respuesta</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="respuesta3" placeholder="" value={respuesta3} onChange={handlerChangePregunta} />
                                <label htmlFor="respuesta3">Tercera respuesta</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="respuesta4" placeholder="" value={respuesta4} onChange={handlerChangePregunta} />
                                <label htmlFor="respuesta4">Cuarta respuesta</label>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handlerAgregarPregunta} >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioPregunta