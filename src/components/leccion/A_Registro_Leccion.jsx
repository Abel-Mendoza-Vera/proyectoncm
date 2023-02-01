import Swal from "sweetalert2"
import { useLeccionStore } from "../../store/leccionStore"
import { useNavigate } from "react-router-dom"

const A_Registro_Leccion = ({ leccion }) => {

    const navigate = useNavigate()

    const { deleteLeccion, activeLeccion } = useLeccionStore((state) => ({
        deleteLeccion: state.deleteLeccion,
        activeLeccion: state.activeLeccion
    }))

    const eliminarLeccion = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Eliminar lección',
            text: "¿Esta seguro de querer eliminar la lección?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminalo'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const status = await deleteLeccion(leccion.idLeccion)

                    if (status == 204) {
                        Swal.fire({
                            title: "Eliminar leccion",
                            text: "La leccion ha sido eliminado correctamente",
                            icon: 'success',
                            timer: 1500,
                            timerProgressBar: true
                        })
                    }
                    else if (status == 400) {
                        Swal.fire({
                            title: "Eliminar lección",
                            text: "No se ha encontrado la lección",
                            icon: 'warning',
                            timer: 1500,
                            timerProgressBar: true
                        })
                    }

                } catch (error) {
                    Swal.fire({
                        title: "Eliminar lección",
                        text: "Ha ocurrido un error al momento de eliminar la lección",
                        icon: 'error',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
            }
        })
    }

    const activarLeccion = async () => {
        const status = await activeLeccion(leccion.idLeccion)

        if (status == 204) {
            Swal.fire({
                title: "Activar lección",
                text: "La lección ha sido activado correctamente",
                icon: 'success',
                timer: 1500,
                timerProgressBar: true
            })
        }
        if (status == 400) {
            Swal.fire({
                title: "Activar lección",
                text: "No se ha encontrado la lección",
                icon: 'warning',
                timer: 1500,
                timerProgressBar: true
            })
        }
        if (status == 500) {
            Swal.fire({
                title: "Activar lección",
                text: "Ha ocurrido un error al momento de activar una lección",
                icon: 'error',
                timer: 1500,
                timerProgressBar: true
            })
        }
    }

    const editar_leccion = () => {
        navigate(`/admin/lecciones/${leccion.idLeccion}`)
    }

    return (
        <tr >
            <td>{leccion.idLeccion}</td>
            <td>{leccion.nombre}</td>
            <td>{leccion.informacion}</td>
            <td>
                {
                    leccion.estatus == 1 ?
                        <span className="material-icons text-success">toggle_on</span>
                        :
                        <span className="material-icons text-danger">toggle_off</span>
                }
            </td>
            <td>
                <button className='btn btn-primary btn-sm me-2' onClick={editar_leccion} ><span className='material-icons'>edit</span></button>
                {
                    leccion.estatus == 1 ?
                        <button className='btn btn-danger btn-sm' onClick={eliminarLeccion}><span className='material-icons'>delete</span></button>
                        :
                        <button className='btn btn-success btn-sm' onClick={activarLeccion}><span className='material-icons'>power_settings_new</span></button>
                }
            </td>
        </tr>
    )
}

export default A_Registro_Leccion