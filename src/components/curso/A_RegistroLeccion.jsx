import Swal from "sweetalert2"
import { useLeccionStore } from "../../store/leccionStore"
import { Link } from "react-router-dom"

const A_RegistroLeccion = ( { leccion } ) => {

    const { deleteLeccion, activeLeccion } = useLeccionStore((state) => ({
        deleteLeccion: state.deleteLeccion,
        activeLeccion: state.activeLeccion
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
            title: 'Eliminar leccion',
            text: "¿Esta seguro de querer eliminar la leccion?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminalo'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteLeccion(leccion.idLeccion)

                Swal.fire({
                    title: "Eliminar leccion",
                    text: "La leccion a sido eliminado correctamente",
                    icon: 'success'
                }
                )
            }
        })
    }

    return (
        <tr >
            <td>{leccion.idLeccion}</td>
            <td>{leccion.nombre}</td>
            <td>
                {
                    leccion.estatus == 1 ? 
                    <span className="material-icons text-success">toggle_on</span>
                    :
                    <span className="material-icons text-danger">toggle_off</span>
                }
            </td>
            <td>
                <Link to='/admin/lecciones' className='btn btn-primary btn-sm me-2'><span className='material-icons'>edit</span> </Link>
                {
                    leccion.estatus == 1 ?
                    <button className='btn btn-danger btn-sm' onClick={alertaEliminar}><span className='material-icons'>delete</span></button>
                    :
                    <button className='btn btn-success btn-sm' onClick={() => activeLeccion(leccion.idLeccion)}><span className='material-icons'>power_settings_new</span></button>
                }
            </td>
        </tr>
    )
}

export default A_RegistroLeccion