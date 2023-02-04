import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { usePreguntaStore } from "../../store/preguntaStore";

function FormularioModificarPregunta({ pregunta }) {

    const { modifyPregunta } = usePreguntaStore((state) => ({
        modifyPregunta: state.modifyPregunta
    }))

    const [formModificarPregunta, setFormModificarPregunta] = useState({
        enunciado: pregunta.enunciado,
        respuesta_correcta: pregunta.respuesta_correcta,
        respuesta1: pregunta.respuesta1,
        respuesta2: pregunta.respuesta2,
        respuesta3: pregunta.respuesta3,
        respuesta4: pregunta.respuesta4
    })

    const { enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4 } = formModificarPregunta

    const handlerChangeModificarPregunta = (e) => {
        setFormModificarPregunta({
            ...formModificarPregunta,
            [e.target.name]: e.target.value
        })
    }

    const handlerGuardarPregunta = async () => {

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

            status = await modifyPregunta(pregunta.idPregunta, enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4)


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
        }

        setFormModificarPregunta({
            enunciado: "",
            respuesta_correcta: "",
            respuesta1: "",
            respuesta2: "",
            respuesta3: "",
            respuesta4: ""
        })

    }

    useEffect(() => {
        setFormModificarPregunta({
            enunciado: pregunta.enunciado,
            respuesta_correcta: pregunta.respuesta_correcta,
            respuesta1: pregunta.respuesta1,
            respuesta2: pregunta.respuesta2,
            respuesta3: pregunta.respuesta3,
            respuesta4: pregunta.respuesta4
        })
    
    }, [pregunta])
    

    return (
        <>

            <button className="btn btn-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target={`#preguntaM${pregunta.idPregunta}Modal`}><span className="material-icons fs-6" >edit</span></button>

            <div className="modal fade" id={`preguntaM${pregunta.idPregunta}Modal`} tabIndex="-1" aria-labelledby={`preguntaM${pregunta.idPregunta}ModalLabel`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`preguntaM${pregunta.idPregunta}ModalLabel`}>Guardar pregunta</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="enunciado" placeholder="" value={enunciado} onChange={handlerChangeModificarPregunta} />
                                <label htmlFor="enunciado">Enunciado</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control border-success" name="respuesta_correcta" placeholder="" value={respuesta_correcta} onChange={handlerChangeModificarPregunta} />
                                <label htmlFor="respuesta_correcta">Respuesta correcta</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="respuesta1" placeholder="" value={respuesta1} onChange={handlerChangeModificarPregunta} />
                                <label htmlFor="respuesta1">Primera respuesta</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="respuesta2" placeholder="" value={respuesta2} onChange={handlerChangeModificarPregunta} />
                                <label htmlFor="respuesta2">Segunda respuesta</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="respuesta3" placeholder="" value={respuesta3} onChange={handlerChangeModificarPregunta} />
                                <label htmlFor="respuesta3">Tercera respuesta</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="respuesta4" placeholder="" value={respuesta4} onChange={handlerChangeModificarPregunta} />
                                <label htmlFor="respuesta4">Cuarta respuesta</label>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handlerGuardarPregunta} >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioModificarPregunta