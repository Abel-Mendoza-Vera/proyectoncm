import Swal from "sweetalert2"
import imgCurso from '../../assets/curso.jpg'

const Tarjeta = () => {

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
        < div className='col' >
            <div className="card" style={{ width: "18rem" }}>
                <img src={imgCurso} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Nombre del curso</h5>
                    <p className="card-text text-end text-danger"><strong>Precio</strong></p>

                    <p className="card-text">
                        Descripción del curso Descripción del curso Descripción del curso Descripción del curso<span className="collapse" id="collapseExample" >Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso </span>
                        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Ver más
                        </a>

                    </p>

                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-end">
                        <button className='btn btn-primary'><span className='material-icons'>edit</span></button>
                        <div className="mx-1"></div>
                        <button className='btn btn-danger' onClick={alertaEliminar}><span className='material-icons'>delete</span></button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Tarjeta