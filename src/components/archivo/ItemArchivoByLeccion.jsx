import { useArchivoStore } from '../../store/archivoStore'
import Swal from 'sweetalert2'

import { storage } from '../../firebase'
import { ref, deleteObject } from 'firebase/storage'

import axios from 'axios'

import { useAccesoStore } from '../../store/accesoStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { eliminarArchivo, eliminarArchivoLeccion } from '../../hooks/useArchivo'

const ItemArchivoByLeccion = ({ archivo, leccionId, cursoNombre, leccionNombre }) => {

    const token = useAccesoStore((state) => state.token)
    const queryClient = useQueryClient()

    const useEliminarArchivoLeccion = useMutation({
        mutationFn: eliminarArchivoLeccion,
        onSuccess: () => {
            Swal.fire({
                title: "Eliminar archivo", text: "El archivo se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getLecciones")
            queryClient.invalidateQueries("getLeccionesCurso")
            queryClient.invalidateQueries("getArchivoLeccion")
        },
        onError: () => { Swal.fire({ title: "Eliminar archivo", text: "El archivo no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const useEliminarArchivo = useMutation({
        mutationFn: eliminarArchivo,
        onSuccess: () => {
            Swal.fire({
                title: "Eliminar archivo", text: "El archivo se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getArchivos")
            queryClient.invalidateQueries("getArchivoLeccion")
        },
        onError: () => { Swal.fire({ title: "Eliminar archivo", text: "El archivo no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const handlerDeteleArchivo = () => {

        const desertRef = ref(storage, `/cursos/${cursoNombre}/lecciones/${leccionNombre}/archivos/${archivo.nombre}`);


        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Eliminar archivo',
            text: "¿Usted esta seguro de eliminar el archivo?\nNo sera posible revertir este cambio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {

                deleteObject(desertRef).then(async () => {
                    useEliminarArchivoLeccion.mutate({ token, id: archivo.idArchivo })
                    useEliminarArchivo.mutate({ token, id: archivo.idArchivo })
                })
                    .catch((error) => {
                        Swal.fire({
                            title: "Eliminar archivo",
                            text: "El archivo no se ha podido eliminar correctamente",
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        })
                    })
            }
        })
    }

    const descargar = async () => {
        const response = await axios.get(archivo.url, { responseType: "blob" })

        const url = window.URL.createObjectURL(new Blob([response.data]))

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', archivo.nombre)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    {archivo.nombre}
                </div>
            </div>
            <div>

                {/**<button className='btn btn-outline-info btn-sm' onClick={descargar} ><span className='material-icons fs-6' >download</span></button> */}
                <a href={archivo.url} target="_blank" className="btn btn-primary btn-sm mx-2"><span className="material-icons fs-6">remove_red_eye</span></a>
                <button className="btn btn-danger btn-sm" onClick={handlerDeteleArchivo} ><span className="material-icons fs-6">delete</span></button>
            </div>
        </li>
    )
}

export default ItemArchivoByLeccion