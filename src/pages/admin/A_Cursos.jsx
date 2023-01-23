import A_Tabla from "../../components/curso/A_Tabla"
import Formulario from "../../components/curso/Formulario"

const A_Cursos = () => {

  return (
    <>
      <div className='container-fluid mt-3'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <Formulario/>
          </div>
        </div>

        {/** Tabla */}
        <A_Tabla/>

      </div>
    </>
  )
}

export default A_Cursos