import { useState } from 'react'
import Swal from 'sweetalert2'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../../firebase'

import { useArchivoStore } from '../../store/archivoStore'
import { useLeccionStore } from '../../store/leccionStore'

const FormularioAgregarArchivoLeccion = ({ idLeccion, idVideo, objVideo }) => {

    const { saveArchivo, modifyArchivo } = useArchivoStore((state) => ({
        saveArchivo: state.saveArchivo,
        modifyArchivo: state.modifyArchivo
    }))
    const modifyLeccionVideo = useLeccionStore((state) => state.modifyLeccionVideo)

    const [progresoVideo, setProgresoVideo] = useState(0)

    const handleFormVideo = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        subirVideoFirebase(file)
    }

    const subirVideoFirebase = (file) => {

        if (!file) {
            Swal.fire({
                title: `Guardar video`,
                text: `Es necesario agregar un video para guardar`,
                icon: "warning",
                timer: 1500,
                timerProgressBar: true
            })
            return;
        }

        const storageRef = ref(storage, `/video/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed",
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgresoVideo(prog)
            },
            (err) => {
                Swal.fire({
                    title: `Guardar video`,
                    text: `Ha ocurrido un error al guardar el video`,
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true
                })
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then( async (url) => {

                    // Capturando la url del archivo
                    let videoUrl = url

                    if (idVideo == 0) {// Agrega por primera vez
                        const idArchivo = await saveArchivo(file.name, file.type, videoUrl)

                        if (idArchivo != 0) {
                            const status = await modifyLeccionVideo(idLeccion, idArchivo)
                            if (status == 200) {
                                Swal.fire({
                                    title: `Guardar video`,
                                    text: `El video se ha guardado correctamente`,
                                    icon: "success",
                                    timer: 1500,
                                    timerProgressBar: true
                                })
                            }
                        }
                    }
                    else { // Esta modificando el video

                        if (objVideo.nombre != file.name) {

                            const deleteRef = ref(storage, `/video/${objVideo.nombre}`)

                            deleteObject(deleteRef).then(async () => {
                                const estatus = await modifyArchivo(idVideo, file.name, file.type, videoUrl)
                                if (estatus == 200) {
                                    Swal.fire({
                                        title: `Guardar video`,
                                        text: `El video se ha guardado correctamente`,
                                        icon: "success",
                                        timer: 1500,
                                        timerProgressBar: true
                                    })
                                }
                            })
                        }
                        else {
                            const estatus = await modifyArchivo(idVideo, file.name, file.type, videoUrl)
                            if (estatus == 200) {
                                Swal.fire({
                                    title: `Guardar video`,
                                    text: `El video se ha guardado correctamente`,
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
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#videoModal">
                {
                    idVideo == 0 ?
                    <><span className='material-icons'>add</span>Agregar video</>
                    :
                    <><span className='material-icons'>edit</span>Editar video</>
                }
            </button>

            {/** Formulario modal */}
            <div className="modal fade" id="videoModal" tabIndex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="videoModalLabel">Agregar video</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form id='guardarVideo' onSubmit={handleFormVideo} >
                                <label htmlFor="archivo">Introdusca un video</label>
                                <input className="form-control" type="file" name="archivo" />

                                <div className="progress mt-3" role="progressbar" aria-label="Basic example" aria-valuenow={progresoVideo} aria-valuemin="0" aria-valuemax="100">
                                    <div className={progresoVideo == 100 ? "progress-bar progress-bar-striped progress-bar-animated bg-success" : "progress-bar progress-bar-striped progress-bar-animated"} style={{ width: `${progresoVideo}%` }}>{progresoVideo}%</div>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-success" form='guardarVideo'>Guardar video</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioAgregarArchivoLeccion