import { useParams } from "react-router-dom"
import { shallow } from "zustand/shallow"
import { useCursoStore } from "../../store/cursoStore"

const A_CursosEditar = () => {

  let { cursoId } = useParams()

  const { cursos } = useCursoStore((state) => ({
    cursos: state.cursos
  }),shallow)

  const curso = cursos.find((curso, index) => curso.idCurso == cursoId)

  return (
    <>
      <div className='container mt-3'>
        {/** Botón editar curso */}
        <div className="row-1">
          {/** Abrira modal del fomulario del curso */}
          <button className="btn btn-primary" ><span className="material-icons" >edit</span>Editar curso</button>
        </div>

        {/** Información del curso */}
        <div className="row mt-3">
          <div className="col-8">
            <h3><strong>{curso.nombre}</strong></h3>
            <h5 className="text-end text-danger">$ {curso.precio} MXN</h5>
            <p><strong>Duración:</strong> {curso.duracion} horas</p>
            <p><strong>Objetivo:</strong></p>
            <p>{curso.objetivos}</p>
            <p><strong>Descripción:</strong></p>
            <p>{curso.descripcion}</p>

          </div>
          <div className="col-4">

            <div className="row">
              <div className="card">
                <div className="card-body">
                  <p className='card-text'>No hay una <strong>imagen</strong> para el curso.</p>
                  <button className='btn btn-primary' >Agregar imagen</button>
                </div>
              </div>
            </div>

            <div className="row mt-3">
            <div className="card">
                <div className="card-body">
                  <p className='card-text'>No hay un <strong>video</strong> introductorio para el curso.</p>
                  <button className='btn btn-primary' >Agregar video</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        {/** Division */}
        <h3><strong>Lecciones</strong></h3>

        {/** Botón agregar lección */}
        <div className="row-1">
          <button className='btn btn-outline-success'><span className='material-icons'>add</span>Agregar lección</button>
          {/** Abre modal del formulario */}
        </div>

      </div>
    </>
  )
}

export default A_CursosEditar