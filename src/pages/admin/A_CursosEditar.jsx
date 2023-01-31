import A_DetalleCurso from "../../components/curso/A_DetalleCurso"
import FormularioAgregarLeccion from "../../components/leccion/FormularioAgregarLeccion"

const A_CursosEditar = () => {

  return (
    <>
      <A_DetalleCurso />



      <div className="container">
        <hr />

        <h3>
          <strong className="me-4">Lecciones</strong>
          <button className="mx-4 btn btn-outline-success"><span className="material-icons">add</span>Agregar lección</button>
        </h3>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Lección</th>
              <th>Información</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Id</td>
              <td>Lección</td>
              <td>Información</td>
              <td>Estatus</td>
              <td>Acciones</td>
            </tr>
          </tbody>

        </table>
      </div>

    </>
  )
}

export default A_CursosEditar