import A_Tabla from "../../components/curso/A_Tabla"
import FormularioAgregarCurso from "../../components/curso/FormularioAgregarCurso"

const A_Cursos = () => {

  return (
    <>
      <div className='container-fluid mt-3'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <FormularioAgregarCurso/>
          </div>
        </div>

        {/** Tabla */}
        <A_Tabla/>

      </div>
    </>
  )
}

export default A_Cursos