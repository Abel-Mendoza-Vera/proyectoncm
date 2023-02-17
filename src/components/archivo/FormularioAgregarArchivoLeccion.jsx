import { useState } from 'react'
import Swal from 'sweetalert2'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'
import { useArchivoStore } from '../../store/archivoStore'

import { useAccesoStore } from '../../store/accesoStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { crearArchivoLeccion } from '../../hooks/useArchivo'

const FormularioAgregarArchivoLeccion = ({ numArchivosByLeccion, leccionId, cursoNombre, leccionNombre }) => {

    const token = useAccesoStore((state) => state.token)
    const queryClient = useQueryClient()
    const useCrearArchivoLeccion = useMutation({
        mutationFn: crearArchivoLeccion,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar archivo", text: "El archivo se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getArchivos")
            queryClient.invalidateQueries("getArchivoLeccion")
        },
        onError: () => { Swal.fire({ title: "Guardar archivo", text: "El archivo no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const { saveArchivo } = useArchivoStore((state) => ({
        saveArchivo: state.saveArchivo
    }))

    const [progresoArchivo, setProgresoArchivo] = useState(0)

    const handlerFormArchivoLeccion = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        subirArchivoFirebase(file)
    }

    const subirArchivoFirebase = (file) => {

        if (!file) {
            Swal.fire({
                title: `Guardar archivo`,
                text: `Es necesario agregar un archivo para guardar`,
                icon: "warning",
                timer: 1500,
                timerProgressBar: true
            })
            return;
        }

        const storageRef = ref(storage, `/cursos/${cursoNombre}/lecciones/${leccionNombre}/archivos/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed",
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgresoArchivo(prog)
            },
            (err) => {
                Swal.fire({
                    title: `Guardar archivo`,
                    text: `Ha ocurrido un error al guardar el archivo`,
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true
                })
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {

                    // Capturando la url del archivo
                    let archivoUrl = url

                    const idArchivo = await saveArchivo(file.name, file.type, archivoUrl, token)

                    useCrearArchivoLeccion.mutate({ token, idArchivo, idLeccion: leccionId})

                })
            }
        )

    }


    return (
        <>
            <div className="row mt-3">
                {
                    numArchivosByLeccion == 0 ?
                        /** Alerta informativa */
                        <div className="alert alert-info">No hay archivos asignados a esta lección.</div>
                        :
                        <></>
                }
                {/** Boton para accionar el modal */}
                <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#archivoLeccionModal" ><span className='material-icons' >add</span>Agregar archivo</button>
            </div>

            {/**Modal */}
            <div className="modal fade" id="archivoLeccionModal" tabIndex="-1" aria-labelledby="archivoLeccionModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="archivoLeccionModalLabel">Guardar archivo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form id='guardarArchivoLeccion' onSubmit={handlerFormArchivoLeccion} >
                                <label htmlFor="archivo">Introduzca un archivo</label>
                                <input className="form-control" type="file" name="archivoLeccion" />

                                <div className="progress mt-3" role="progressbar" aria-label="Basic example" aria-valuenow={progresoArchivo} aria-valuemin="0" aria-valuemax="100">
                                    <div className={progresoArchivo == 100 ? "progress-bar progress-bar-striped progress-bar-animated bg-success" : "progress-bar progress-bar-striped progress-bar-animated"} style={{ width: `${progresoArchivo}%` }}>{progresoArchivo}%</div>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-success" form="guardarArchivoLeccion">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FormularioAgregarArchivoLeccion