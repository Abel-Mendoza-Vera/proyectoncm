import { useParams } from "react-router-dom"

import A_DetalleLeccion from "../../components/leccion/A_DetalleLeccion"
import BotonAgregarCuestionario from "../../components/cuestionario/BotonAgregarCuestionario"

const A_Lecciones = () => {
  let { leccionId } = useParams()

  return (
    <>
      <A_DetalleLeccion leccionId={leccionId} />

      <div className="container my-5">
        <div className="row">

          <div className="col">
            <hr />
            <h3>
              <strong className="me-4">Cuestionario</strong>
              <BotonAgregarCuestionario leccionId={leccionId} />
            </h3>

            {/** Tarjeta de las preguntas 
             * 
             * 
            <div className="card" style={{ height: "250px" }}>
              
              <div className="card-header"><h5 className="card-title">Nombre</h5></div>
              <ol className="list-group list-group-flush list-group-numbered overflow-y-auto">
                
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">¿ Cuanto es 2 + 2 ?</div>
                    <div className="text-success">Respuesta correcta: 4</div>
                  </div>
                  <div>
                      <button className="btn btn-primary btn-sm me-2"><span className="material-icons fs-6" >edit</span></button>
                      <button className="btn btn-danger btn-sm"><span className="material-icons fs-6">delete</span></button>
                    </div>
                </li>

              </ol>
              
            </div>
            */}

          </div>

          <div className="col">
            <hr />
            <h3>
              <strong className="me-4">Archivos</strong>

            </h3>
          </div>

        </div>
      </div>
    </>
  )
}

export default A_Lecciones