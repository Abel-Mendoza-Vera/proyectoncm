import Swal from "sweetalert2"
import { useState } from "react"
import { useLeccionStore } from "../../store/leccionStore"

const FormularioCursoEditar = () => {

    const addLeccion = useLeccionStore((state) => state.addLeccion)

    const [formularioCursoEditar, setFormularioCursoEditar] = useState({
        nombre: "",
        descripcion: "",
        idVideo: 0,
    })

    const { nombre, descripcion, idVideo } = formularioCursoEditar

    const handleChange = (e) => {
        setFormularioCursoEditar({
            ...formularioCursoEditar,
            [e.target.name] : e.target.value
        })
    }

    const handleAdd = () => {
        addLeccion(102, nombre, descripcion,  idVideo)
        alerta()
    }

    const alerta = () => {
        Swal.fire({
            title: "Guardar leccion",
            text: 'leccion guardada correctamente',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true
        })
    }

    return (
        <>
           
           <form>
                <div class="form-group form-check">
                    <div className="form-floating mb-3">
                        <input type="text"  className="form-control" name='nombre' placeholder="" />
                        <label htmlFor="nombre">Nombre</label>
                    </div>
                </div>
                <div class="form-group form-check">
                    <div className="form-floating mb-3">
                        <input type="number"  min='1' className="form-control" name='precio' placeholder="" />
                        <label htmlFor="precio">Precio</label>
                    </div>
                </div>

                <div class="form-group form-check">
                    <div className="form-floating mb-3">
                        <textarea className="form-control" placeholder="" name="objetivos" rows='3' style={{ height: "100px" }} ></textarea>
                        <label htmlFor="objetivos">Objetivos</label>
                    </div>
                </div>


                <div class="form-group form-check">
                    <div className="form-floating mb-3">
                        <textarea className="form-control"  placeholder="" name="descripcion" rows='3' style={{ height: "100px" }} ></textarea>
                        <label htmlFor="descripcion">Descripción</label>
                    </div>
                </div>


                <div class="form-group form-check">
                    <div className="form-floating mb-3">
                        <input type="number"  min='1' className="form-control" name='duracion' placeholder="" />
                        <label htmlFor="duracion">Duración del curso</label>
                    </div>
                </div>

                <div class="form-group form-check">
                    <div className="mb-3">
                        <label htmlFor="video" className="form-label">Video introductorio del curso</label>
                        <input className="form-control" type="file" id="videoCurso" />
                    </div>
                </div>

                <div class="form-group form-check">
                    <div className="mb-3">
                        <label htmlFor="miniatura" className="form-label">Miniatura del curso</label>
                        <input className="form-control" type="file" id="miniaturaCurso" />
                    </div>
                </div>


                <button type="submit" class="btn btn-primary">Guardar</button><br />
            </form>





            { /** Boton para mostrar el modal */}
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#agregarLeccionModal" ><span className="material-icons">add</span>Agregar Lección</button>

            {/** Modal - Formulario */}
            <div className="modal fade" id="agregarLeccionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar Leccion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="form-floating mb-3">
                                <input type="text" onChange={(e) => handleChange(e)} value={nombre} className="form-control" name='nombre' placeholder="" />
                                <label htmlFor="nombre">Nombre</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control" onChange={(e) => handleChange(e)} value={descripcion} placeholder="" name="descripcion" rows='3' style={{ height: "100px" }} ></textarea>
                                <label htmlFor="descripcion">Descripción</label>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="video" className="form-label">Video</label>
                                <input className="form-control" type="file" id="video" />
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

export default FormularioCursoEditar