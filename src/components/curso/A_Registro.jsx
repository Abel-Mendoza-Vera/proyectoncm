import Swal from "sweetalert2"

const A_Registro = ( { curso } ) => {

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
            <td>$ {curso.precio} MXN</td>
            <td>{curso.duracion} horas</td>
            <td>
                <div className='form-check form-switch'>
                    {
                        curso.estatus == 0 ?
                            (<><input className="form-check-input" disabled type="checkbox" role="switch" id={`curso${curso.idCurso}`} /></>)
                            :
                            (<><input className="form-check-input" disabled type="checkbox" role="switch" id={`curso${curso.idCurso}`} checked /></>)
                    }
                </div>
            </td>
            <td>
                <button className='btn btn-primary btn-sm me-2'><span className='material-icons'>edit</span></button>
                <button className='btn btn-danger btn-sm' onClick={alertaEliminar}><span className='material-icons'>delete</span></button>
            </td>
        </tr>
    )
}

export default A_Registro