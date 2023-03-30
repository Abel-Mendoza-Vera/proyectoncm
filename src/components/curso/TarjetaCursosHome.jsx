import { BsCartPlusFill } from 'react-icons/bs'
import imgCurso from '../../assets/curso.jpg'
import { useNavigate } from 'react-router-dom'
import AgregarAlCarrito from '../carrito/AgregarAlCarrito';


const Tarjeta = ({ curso, archivo }) => {

  const navigate = useNavigate()

  const irAlCurso = () => {
    navigate(`/curso/${curso.idCurso}`)
  }

  return (
    <div className="container h-100 py-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="card rounded-3 mb-4 text-center">
            <div className="card-body p-4">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-md-3 col-lg-3 col-xl-3">
                  <p className="lead fw-bold mb-2">{curso.nombre}</p>
                </div><hr />
                <div className="col-md-2 col-lg-2 col-xl-2">
                  <img height="190px" width="290px" src={curso.idMiniatura != 0 ? archivo.url : imgCurso}
                    onClick={irAlCurso} style={{ cursor: "pointer" }}
                    className="img-fluid rounded-3" alt="Cotton T-shirt" />
                </div>
                <div className="col-md-4 col-lg-4 col-xl-4">
                  <p className="lead fw-normal mb-4">Duración: {curso.duracion} horas</p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <AgregarAlCarrito small idCurso={curso.idCurso} />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>








  )
}

export default Tarjeta