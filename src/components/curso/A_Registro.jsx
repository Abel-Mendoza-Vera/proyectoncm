import Swal from "sweetalert2"
import { useCursoStore } from "../../store/cursoStore"
import { Link } from "react-router-dom"

const A_Registro = ({ curso }) => {

    const { deleteCurso, activeCurso } = useCursoStore((state) => ({
        deleteCurso: state.deleteCurso,
        activeCurso: state.activeCurso
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
            title: 'Eliminar curso',
            text: "¿Esta seguro de querer eliminar el curso?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminalo'
        }).then( async (result) => {
            if (result.isConfirmed) {

                const status = await deleteCurso(curso.idCurso)

                if (status == 204) {
                    Swal.fire({
                        title: "Eliminar curso",
                        text: "El curso ha sido eliminado correctamente",
                        icon: 'success',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
                if ( status == 400 ){
                    Swal.fire({
                        title: "Eliminar curso",
                        text: "No se ha encontrado el curso",
                        icon: 'warning',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
                if (status == 500){
                    Swal.fire({
                        title: "Eliminar curso",
                        text: "Ha ocurrido un error al momento de eliminar un curso",
                        icon: 'error',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
            }
        })
    }

    const alertaActivar = async () => {
        const status = await activeCurso(curso.idCurso)

        if (status == 204) {
            Swal.fire({
                title: "Activar curso",
                text: "El curso ha sido activado correctamente",
                icon: 'success',
                timer: 1500,
                timerProgressBar: true
            })
        }
        if ( status == 400 ){
            Swal.fire({
                title: "Activar curso",
                text: "No se ha encontrado el curso",
                icon: 'warning',
                timer: 1500,
                timerProgressBar: true
            })
        }
        if (status == 500){
            Swal.fire({
                title: "Activar curso",
                text: "Ha ocurrido un error al momento de activar un curso",
                icon: 'error',
                timer: 1500,
                timerProgressBar: true
            })
        }
    }

    return (
        <tr >
            <td>{curso.idCurso}</td>
            <td>{curso.nombre}</td>
            <td>{curso.objetivos}</td>
            <td>{curso.descripcion}</td>
            <td>$ {curso.precio} MXN</td>
            <td>{curso.duracion} horas</td>
            <td>
                {
                    curso.estatus == 1 ?
                        <span className="material-icons text-success">toggle_on</span>
                        :
                        <span className="material-icons text-danger">toggle_off</span>
                }
            </td>
            <td>
                <Link to='/admin/cursos_editar' className='btn btn-primary btn-sm me-2'><span className='material-icons'>edit</span> </Link>
                {
                    curso.estatus == 1 ?
                        <button className='btn btn-danger btn-sm' onClick={alertaEliminar}><span className='material-icons'>delete</span></button>
                        :
                        <button className='btn btn-success btn-sm' onClick={alertaActivar}><span className='material-icons'>power_settings_new</span></button>
                }
            </td>
        </tr>
    )
}

export default A_Registro