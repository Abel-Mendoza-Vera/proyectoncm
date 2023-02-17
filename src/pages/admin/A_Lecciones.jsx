import { useParams } from "react-router-dom"

import A_DetalleLeccion from "../../components/leccion/A_DetalleLeccion"
import A_Cuestionario from "../../components/cuestionario/A_Cuestionario"
import A_Archivo from "../../components/archivo/A_Archivo"

import { useObtenerLeccion } from '../../hooks/useLeccion'

const A_Lecciones = () => {
  let { cursoNombre, leccionNombre, leccionId } = useParams()

  const { data, isLoading } = useObtenerLeccion(leccionId);

  if (isLoading) return <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>

  return (
    <>
      <A_DetalleLeccion leccion={data} cursoNombre={cursoNombre} />

      <div className="container my-5">
        <div className="row row-2 gx-5">

          <div className="col-12 col-md-6">
            <A_Cuestionario leccionId={leccionId}/>
          </div>

          <div className="col-12 col-md-6">
            <A_Archivo leccionId={leccionId} cursoNombre={cursoNombre} leccionNombre={leccionNombre} />
          </div>

        </div>
      </div>
    </>
  )
}

export default A_Lecciones