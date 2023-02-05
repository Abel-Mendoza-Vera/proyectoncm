import { useState } from 'react'
import Swal from 'sweetalert2'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../../firebase'

import { useArchivoStore } from '../../store/archivoStore'
import { useCursoStore } from '../../store/cursoStore'

const FormularioAgregarArchivoCurso = ({ idCurso, idImagen, objImagen, cursoNombre }) => {

    const { saveArchivo, modifyArchivo } = useArchivoStore((state) => ({
        saveArchivo: state.saveArchivo,
        modifyArchivo: state.modifyArchivo
    }))
    const modifyCursoImagen = useCursoStore((state) => state.modifyCursoImagen)

    const [progreso, setProgreso] = useState(0)

    const handleForm = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        subirArchivoFirebase(file)
    }

    const subirArchivoFirebase = (file) => {

        if (!file) {
            Swal.fire({
                title: `Guardar imagen`,
                text: `Es necesario agregar una imagen para guardar`,
                icon: "warning",
                timer: 1500,
                timerProgressBar: true
            })
            return;
        }

        const storageRef = ref(storage, `/cursos/${cursoNombre}/imagen/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed",
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgreso(prog)
            },
            (err) => {
                Swal.fire({
                    title: `Guardar imagen`,
                    text: `Ha ocurrido un error al guardar la imagen`,
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true
                })
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {

                    // Capturando la url del archivo
                    let imagenUrl = url

                    if (idImagen == 0) {// Agrega por primera vez
                        const idArchivo = await saveArchivo(file.name, file.type, imagenUrl)

                        if (idArchivo != 0) {
                            const status = await modifyCursoImagen(idCurso, idArchivo)
                            if (status == 200) {
                                Swal.fire({
                                    title: `Guardar imagen`,
                                    text: `La imagen se ha guardado correctamente`,
                                    icon: "success",
                                    timer: 1500,
                                    timerProgressBar: true
                                })
                            }
                        }
                    }
                    else { // Esta modificando la imagen

                        if (objImagen.nombre != file.name) {

                            const deleteRef = ref(storage, `/cursos/${cursoNombre}/imagen/${objImagen.nombre}`)

                            deleteObject(deleteRef).then(async () => {
                                const estatus = await modifyArchivo(idImagen, file.name, file.type, imagenUrl)
                                if (estatus == 200) {
                                    Swal.fire({
                                        title: `Guardar imagen`,
                                        text: `La imagen se ha guardado correctamente`,
                                        icon: "success",
                                        timer: 1500,
                                        timerProgressBar: true
                                    })
                                }
                            })
                        }
                        else {
                            const estatus = await modifyArchivo(idImagen, file.name, file.type, imagenUrl)
                            if (estatus == 200) {
                                Swal.fire({
                                    title: `Guardar imagen`,
                                    text: `La imagen se ha guardado correctamente`,
                                    icon: "success",
                                    timer: 1500,
                                    timerProgressBar: true
                                })
                            }

                        }

                    }

                })
            }
        )

    }

    return (
        <>

            {/** Botón modal */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#imagenModal">
                <span className='material-icons'>edit</span>Editar imagen
            </button>

            {/** Formulario modal */}
            <div className="modal fade" id="imagenModal" tabIndex="-1" aria-labelledby="imagenModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="imagenModalLabel">Agregar imagen</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form id='guardarArchivo' onSubmit={handleForm} >
                                <label htmlFor="archivo">Introdusca una imagen</label>
                                <input className="form-control" type="file" name="archivo" />

                                <div className="progress mt-3" role="progressbar" aria-label="Basic example" aria-valuenow={progreso} aria-valuemin="0" aria-valuemax="100">
                                    <div className={progreso == 100 ? "progress-bar progress-bar-striped progress-bar-animated bg-success" : "progress-bar progress-bar-striped progress-bar-animated"} style={{ width: `${progreso}%` }}>{progreso}%</div>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-success" form='guardarArchivo'>Guardar imagen</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioAgregarArchivoCurso