import imgCurso from '../../assets/curso.jpg'

const Tarjeta = ({curso}) => {

    const identificador = `curso${curso.idCurso}`

    return (
        < div className='col' >
            <div className="card" style={{ width: "18rem" }}>
                <img src={imgCurso} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Nombre del curso</h5>
                    <p className="card-text text-end text-danger"><strong>Precio</strong></p>

                    <p className="card-text">
                        Descripción del curso Descripción del curso Descripción del curso Descripción del curso<span className="collapse" id={identificador} >Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso Descripción del curso </span>
                        <a className="btn btn-primary" data-bs-toggle="collapse" href={`#${identificador}`} role="button" aria-expanded="false" aria-controls="collapseExample">
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