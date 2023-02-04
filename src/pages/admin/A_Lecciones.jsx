import { useParams } from "react-router-dom"

import A_DetalleLeccion from "../../components/leccion/A_DetalleLeccion"
import A_Cuestionario from "../../components/cuestionario/A_Cuestionario"


const A_Lecciones = () => {
  let { leccionId } = useParams()

  return (
    <>
      <A_DetalleLeccion leccionId={leccionId} />

      <div className="container my-5">
        <div className="row">

          <div className="col">
            <A_Cuestionario leccionId={leccionId}/>
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