import { BsCartPlusFill } from 'react-icons/bs'
import imgCurso from '../../assets/curso.jpg'
import { useNavigate } from 'react-router-dom'


const Tarjeta = ({ curso, archivo }) => {

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
        <div className="container">
        <section className="text-center text-md-start">
          <h4 className="mb-5"><strong> </strong></h4>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="bg-image hover-overlay shadow-1-strong rounded ripple" data-mdb-ripple-color="light">
                <img src={curso.idMiniatura != 0 ? archivo.url : imgCurso} onClick={irAlCurso} style={{ cursor: "pointer" }} className="img-fluid" />
                <a href="#!">
                  <div className="mask" style={{ backgroundcolor: "rgba(251, 251, 251, 0.15)" }}></div>
                </a>
              </div>
            </div>

            <div className="col-md-8 mb-4">
              <h5>{curso.nombre}</h5>
              <p>
                {curso.descripcion}
              </p>

              <button className='btn btn-primary btn-sm'>Agregar al carrito <BsCartPlusFill/></button>
            </div>
          </div>

        

          
        </section>
      </div>

    )
}

export default Tarjeta