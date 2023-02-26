import { BsCartPlusFill } from 'react-icons/bs'
import imgCurso from '../../assets/curso.jpg'
import { useNavigate } from 'react-router-dom'


const TarjetaMisCursos = ({ curso, archivo }) => {

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
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: "25%;" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                    </div>
                </div>

                <div className="card-footer">
                    <div className="d-flex justify-content-end">
                        <button className='btn btn-primary btn-sm' onClick={irAlCurso}>Continuar</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TarjetaMisCursos