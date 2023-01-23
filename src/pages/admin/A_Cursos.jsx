import A_Tabla from "../../components/curso/A_Tabla"
import Formulario from "../../components/curso/Formulario"

const A_Cursos = () => {

  return (
    <>
      <div className='container-fluid mt-3'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#agregarCursoModal" ><span className="material-icons">add</span>Agregar</button>
          </div>

          <div className='col'>
            <div className="input-group">
              <Formulario/>
              <span className='input-group-text material-icons'>search</span>
            </div>
          </div>
        </div>

        {/** Tabla */}
        <A_Tabla/>


        { /** Lista de las tarjetas de los cursos 
        <div className='row mt-3 row-cols-auto g-3 mx-auto' >
          {
            cantCursos.map((curso) => {
              return (
              <>
              <Tarjeta key={curso.idCurso} curso={curso} />
              </>)
            })
          }
        </div>
      */}

      </div>
    </>
  )
}

export default A_Cursos