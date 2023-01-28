import { useParams } from "react-router-dom"
import { useCursoStore } from "../../store/cursoStore"
import FormularioModificarCurso from "../../components/curso/FormularioModificarCurso"
import FormularioAgregarArchivoCurso from "../../components/archivo/FormularioAgregarArchivoCurso"

const A_CursosEditar = () => {

  let { cursoId } = useParams()
  let cursos = useCursoStore((state) => state.cursos)
  let curso = cursos.find((item) => item.idCurso == cursoId)

  return (
    <>
      <div className='container mt-3'>
        {/** Botón editar curso */}
        <div className="row-1">
          {/** Abrira modal del fomulario del curso */}
          <FormularioModificarCurso curso={curso} />
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
                  <FormularioAgregarArchivoCurso tipo="imagen" idCurso={curso.idCurso} />
                </div>
              </div>
            </div>

            <div className="row mt-3">
            <div className="card">
                <div className="card-body">
                  <p className='card-text'>No hay un <strong>video</strong> introductorio para el curso.</p>
                  <FormularioAgregarArchivoCurso tipo="video" idCurso={curso.idCurso} />
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