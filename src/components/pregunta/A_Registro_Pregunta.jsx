import Swal from "sweetalert2"
import { usePreguntaStore } from "../../store/preguntaStore"
import { Link, useNavigate } from "react-router-dom"

const A_Registro_Pregunta = ({ pregunta }) => {

    const navigate = useNavigate()

    const { deletePregunta, activePregunta } = usePreguntaStore((state) => ({
        deletePregunta: state.deletePregunta,
        activePregunta: state.activePregunta
    }))

    const alertaEliminar = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Eliminar pregunta',
            text: "¿Esta seguro de querer eliminar la pregunta?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminalo'
        }).then( async (result) => {
            if (result.isConfirmed) {

                const status = await deletePregunta(pregunta.idPregunta)

                if (status == 204) {
                    Swal.fire({
                        title: "Eliminar pregunta",
                        text: "La pregunta ha sido eliminado correctamente",
                        icon: 'success',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
                if ( status == 400 ){
                    Swal.fire({
                        title: "Eliminar pregunta",
                        text: "No se ha encontrado la pregunta",
                        icon: 'warning',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
                if (status == 500){
                    Swal.fire({
                        title: "Eliminar pregunta",
                        text: "Ha ocurrido un error al momento de eliminar una pregunta",
                        icon: 'error',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
            }
        })
    }

    const alertaActivar = async () => {
        const status = await activePregunta(pregunta.idPregunta)

        if (status == 204) {
            Swal.fire({
                title: "Activar pregunta",
                text: "La pregunta ha sido activado correctamente",
                icon: 'success',
                timer: 1500,
                timerProgressBar: true
            })
        }
        if ( status == 400 ){
            Swal.fire({
                title: "Activar pregunta",
                text: "No se ha encontrado la pregunta",
                icon: 'warning',
                timer: 1500,
                timerProgressBar: true
            })
        }
        if (status == 500){
            Swal.fire({
                title: "Activar pregunta",
                text: "Ha ocurrido un error al momento de activar una pregunta",
                icon: 'error',
                timer: 1500,
                timerProgressBar: true
            })
        }
    }

    const editar_pregunta = () => {
        navigate(`/admin/pregunta_editar/${pregunta.idPregunta}`)
    }

    return (
        <tr >
            <td>{pregunta.idPregunta}</td>
            <td>
                {
                    pregunta.estatus == 1 ?
                        <span className="material-icons text-success">toggle_on</span>
                        :
                        <span className="material-icons text-danger">toggle_off</span>
                }
            </td>
            <td>
                <button className='btn btn-primary btn-sm me-2' onClick={editar_pregunta} ><span className='material-icons'>edit</span></button>
                {
                    pregunta.estatus == 1 ?
                        <button className='btn btn-danger btn-sm' onClick={alertaEliminar}><span className='material-icons'>delete</span></button>
                        :
                        <button className='btn btn-success btn-sm' onClick={alertaActivar}><span className='material-icons'>power_settings_new</span></button>
                }
            </td>
        </tr>
    )
}

export default A_Registro_Pregunta