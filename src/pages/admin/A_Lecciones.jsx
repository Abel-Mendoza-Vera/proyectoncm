import { useParams } from "react-router-dom"

import A_DetalleLeccion from "../../components/leccion/A_DetalleLeccion"


const A_Lecciones = () => {
  let { leccionId } = useParams()

  return (
    <>
      <A_DetalleLeccion leccionId={leccionId} />

    </>
  )
}

export default A_Lecciones