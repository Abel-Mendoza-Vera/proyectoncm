import Swal from "sweetalert2"
import { useCursoStore } from "../../store/cursoStore"
import { Link } from "react-router-dom"

const A_Registro = ( { curso } ) => {

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
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCurso(curso.idCurso)

                Swal.fire({
                    title: "Eliminar curso",
                    text: "El curso a sido eliminado correctamente",
                    icon: 'success'
                }
                )
            }
        })
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
                    <button className='btn btn-success btn-sm' onClick={() => activeCurso(curso.idCurso)}><span className='material-icons'>power_settings_new</span></button>
                }
            </td>
        </tr>
    )
}

export default A_Registro