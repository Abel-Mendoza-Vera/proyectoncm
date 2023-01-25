import Swal from "sweetalert2"
import { useState } from "react"

const FormularioCuestionario = () => {

    const [formularioCuestionario, setFormularioCuestionario] = useState({
        enunciado: "",
        pregunta: "",
        respuesta1: "",
        respuesta2: "",
        respuesta3: "",
        respuesta4: "",
        respuestaCorrecta: ""
    })

    const { enunciado,pregunta,respuesta1,respuesta2,respuesta3,respuesta4,respuestaCorrecta } = formularioCuestionario

    const handleChange = (e) => {
        setFormularioCuestionario({
            ...formularioCuestionario,
            [e.target.name] : e.target.value
        })
    }

    const handleAdd = () => {
        addCurso(102, enunciado,pregunta,respuesta1,respuesta2,respuesta3,respuesta4,respuestaCorrecta)
        alerta()
    }

    const alerta = () => {
        Swal.fire({
            title: "Guardar Cuestionario",
            text: 'Cuestionario guardado correctamente',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true
        })
    }

    return (
        <>

            { /** Boton para mostrar el modal */}
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#agregarCuestionarioModal" ><span className="material-icons">add</span>Agregar</button>

            {/** Modal - Formulario */}
            <div className="modal fade" id="agregarCuestionarioModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar Cuestionario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="form-floating mb-3">
                                <input type="text" onChange={(e) => handleChange(e)} value={enunciado} className="form-control" name='enunciado' placeholder="" />
                                <label htmlFor="nombre">Enunciado</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control"  onChange={(e) => handleChange(e)} value={pregunta} placeholder="" name="pregunta" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="descripcion">Pregunta</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control"  onChange={(e) => handleChange(e)} value={respuesta1} placeholder="" name="respuesta1" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="descripcion">Respuesta 1</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control"  onChange={(e) => handleChange(e)} value={respuesta2} placeholder="" name="respuesta2" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="descripcion">Respuesta 2</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control"  onChange={(e) => handleChange(e)} value={respuesta3} placeholder="" name="respuesta3" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="descripcion">Respuesta 3</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control"  onChange={(e) => handleChange(e)} value={respuesta4} placeholder="" name="respuesta4" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="descripcion">Respuesta 4</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control"  onChange={(e) => handleChange(e)} value={respuestaCorrecta} placeholder="" name="respuestaCorrecta" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="descripcion">Respuesta Correcta</label>
                            </div>
                            


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><span className='material-icons'>close</span>Cerrar</button>
                            <button type="button" className="btn btn-success" onClick={handleAdd} data-bs-dismiss="modal" ><span className='material-icons'>save</span> Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioCuestionario