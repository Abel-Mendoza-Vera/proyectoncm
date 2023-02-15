import { BsCartPlusFill } from 'react-icons/bs'
import imgCurso from '../../assets/curso.jpg'

const Tarjeta = ({curso}) => {

    const identificador = `curso${curso.idCurso}`

    return (
        < div className='col' >
            <div className="card" style={{ width: "18rem" }}>
                <img src={imgCurso} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{curso.nombre}</h5>
                    <p className="card-text text-end text-danger"><strong>$ {curso.precio} MXN</strong></p>                    

                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-end">
                        <button className='btn btn-primary btn-sm'>Agregar al carrito <BsCartPlusFill/></button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Tarjeta