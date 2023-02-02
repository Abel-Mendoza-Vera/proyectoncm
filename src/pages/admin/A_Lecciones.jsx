import { useParams } from "react-router-dom"

import A_DetalleLeccion from "../../components/leccion/A_DetalleLeccion"
import BotonAgregarCuestionario from "../../components/cuestionario/BotonAgregarCuestionario"
import A_TablaCuestionario from "../../components/cuestionario/A_TablaCuestionario"



const A_Lecciones = () => {
  let { leccionId } = useParams()

  return (
    <>
      <A_DetalleLeccion leccionId={leccionId} />
      <div className="container">
        <hr />

        <h3>
          <strong className="me-4">Cuestionarios</strong>
          <BotonAgregarCuestionario leccionId={leccionId} />
        </h3>

         {/** Tabla */}
         <A_TablaCuestionario leccionId={leccionId} />
        
      </div>
    </>
  )
}

export default A_Lecciones