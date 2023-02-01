import Swal from "sweetalert2"
import { useCuestionarioStore } from "../../store/cuestionarioStore"
import { Link, useNavigate } from "react-router-dom"

const A_Registro_Cuestionario = ({ cuestionario }) => {

    const navigate = useNavigate()

    const { deleteCuestionario, activeCuestionario } = useCuestionarioStore((state) => ({
        deleteCuestionario: state.deleteCuestionario,
        activeCuestionario: state.activeCuestionario
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
            title: 'Eliminar cuestionario',
            text: "¿Esta seguro de querer eliminar el cuestionario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminalo'
        }).then( async (result) => {
            if (result.isConfirmed) {

                const status = await deleteCuestionario(cuestionario.idCuestionario)

                if (status == 204) {
                    Swal.fire({
                        title: "Eliminar cuestionario",
                        text: "El cuestionario ha sido eliminado correctamente",
                        icon: 'success',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
                if ( status == 400 ){
                    Swal.fire({
                        title: "Eliminar cuestionario",
                        text: "No se ha encontrado el cuestionario",
                        icon: 'warning',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
                if (status == 500){
                    Swal.fire({
                        title: "Eliminar cuestionario",
                        text: "Ha ocurrido un error al momento de eliminar un cuestionario",
                        icon: 'error',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
            }
        })
    }

    const alertaActivar = async () => {
        const status = await activeCuestionario(cuestionario.idCuestionario)

        if (status == 204) {
            Swal.fire({
                title: "Activar cuestionario",
                text: "El cuestionario ha sido activado correctamente",
                icon: 'success',
                timer: 1500,
                timerProgressBar: true
            })
        }
        if ( status == 400 ){
            Swal.fire({
                title: "Activar cuestionario",
                text: "No se ha encontrado el cuestionario",
                icon: 'warning',
                timer: 1500,
                timerProgressBar: true
            })
        }
        if (status == 500){
            Swal.fire({
                title: "Activar cuestionario",
                text: "Ha ocurrido un error al momento de activar un cuestionario",
                icon: 'error',
                timer: 1500,
                timerProgressBar: true
            })
        }
    }

    const editar_cuestionario = () => {
        navigate(`/admin/cuestionario/${cuestionario.idCuestionario}`)
    }

    return (
        <tr >
            <td>{cuestionario.idCuestionario}</td>
            <td>
                {
                    cuestionario.estatus == 1 ?
                        <span className="material-icons text-success">toggle_on</span>
                        :
                        <span className="material-icons text-danger">toggle_off</span>
                }
            </td>
            <td>
                <button className='btn btn-primary btn-sm me-2' onClick={editar_cuestionario} ><span className='material-icons'>edit</span></button>
                {
                    cuestionario.estatus == 1 ?
                        <button className='btn btn-danger btn-sm' onClick={alertaEliminar}><span className='material-icons'>delete</span></button>
                        :
                        <button className='btn btn-success btn-sm' onClick={alertaActivar}><span className='material-icons'>power_settings_new</span></button>
                }
            </td>
        </tr>
    )
}

export default A_Registro_Cuestionario