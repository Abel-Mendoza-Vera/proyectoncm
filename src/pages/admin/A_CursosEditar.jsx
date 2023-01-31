import A_DetalleCurso from "../../components/curso/A_DetalleCurso"
import A_Tabla_Leccion from "../../components/leccion/A_Tabla_Leccion"
import FormularioAgregarLeccion from "../../components/leccion/FormularioAgregarLeccion"

const A_CursosEditar = () => {

  return (
    <>
      <A_DetalleCurso />


      
      <div className="container">
        <hr />

        <h3>
          <strong className="me-4">Lecciones</strong>
          <FormularioAgregarLeccion />
        </h3>

        {/** Tabla */}
        <A_Tabla_Leccion/>
      </div>

    </>
  )
}

export default A_CursosEditar