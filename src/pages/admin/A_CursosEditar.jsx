import A_TablaLeccion from "../../components/curso/A_TablaLeccion"
import FormularioCursoEditar from "../../components/curso/FormularioCursoEditar"

const A_CursosEditar = () => {

  return (
    <>
      <div className='container-fluid mt-3'>

        {/** Primer fila para agregar o buscar una leccion */}
        <div className="row">
          <div className="col">
            <FormularioCursoEditar/>
          </div>
        </div>

        <A_TablaLeccion/>


      </div>
    </>
  )
}

export default A_CursosEditar