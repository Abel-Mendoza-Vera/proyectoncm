import { useParams } from "react-router-dom"

import A_DetalleCurso from "../../components/curso/A_DetalleCurso"
import A_Tabla_Leccion from "../../components/leccion/A_Tabla_Leccion"
import BotonAgregarLeccion from "../../components/leccion/BotonAgregarLeccion"

const A_CursosEditar = () => {

  let { cursoId, cursoNombre } = useParams()

  return (
    <>
      <A_DetalleCurso cursoId={cursoId} cursoNombre={cursoNombre} />
      <div className="container">
        <hr />

        <h3>
          <strong className="me-4">Lecciones</strong>
          <BotonAgregarLeccion cursoId={cursoId} />
        </h3>

        {/** Tabla */}
        <A_Tabla_Leccion cursoId={cursoId} cursoNombre={cursoNombre} />
      </div>

    </>
  )
}

export default A_CursosEditar