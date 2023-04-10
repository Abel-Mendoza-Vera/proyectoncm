import { BsCartPlusFill } from 'react-icons/bs'
import imgCurso from '../../assets/curso.jpg'
import { useNavigate } from 'react-router-dom'
import AgregarAlCarrito from '../carrito/AgregarAlCarrito'


const Tarjeta = ({curso, archivo}) => {

    const navigate = useNavigate();

    const mouseOver = () => {
        let divSeleccionado = document.getElementById(`curso${curso.idCurso}`)
        divSeleccionado.setAttribute("class", "col shadow-lg p-1 bg-primary bg-opacity-75 rounded")
    }

    const mouseOut = () => {
        let divSeleccionado = document.getElementById(`curso${curso.idCurso}`)
        divSeleccionado.removeAttribute("class")
        divSeleccionado.setAttribute("class", "col")
    }
    
    const irAlCurso = () => {
        navigate(`/curso/${curso.idCurso}`)
    }

    return (
        < div id={`curso${curso.idCurso}`} onMouseOver={mouseOver} onMouseOut={mouseOut} className='col' >
            
            <div className="card" style={{ width: "18rem" }}>
                <img src={curso.idMiniatura != 0 ? archivo.url : imgCurso} onClick={irAlCurso} style={{ cursor: "pointer" }} height="190px" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{curso.nombre}</h5>
                    <p className='card-text'>Duración: {curso.duracion} horas</p>
                    <p className="card-text text-end"><strong>$ {curso.precio} MXN</strong></p>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-end">
                        <AgregarAlCarrito small idCurso={curso.idCurso} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Tarjeta