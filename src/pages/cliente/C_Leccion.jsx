import { useParams, Navigate, useNavigate } from "react-router-dom"
import AgregarAlCarrito from "../../components/carrito/AgregarAlCarrito"
import { useObtenerCursoPorId } from "../../hooks/useCurso"
import { useObtenerLeccion } from "../../hooks/useLeccion"
import { useObtenerArchivos, useObtenerArchivoPorLeccion } from "../../hooks/useArchivo"
import { useObtenerLeccionesPorCurso } from "../../hooks/useLeccion"
import { useAccesoStore } from '../../store/accesoStore'

import Cargando from '../../pages/Cargando'
import { useObtenerCalificacionesClientePorCurso } from "../../hooks/useCalificacion"
import { useObtenerCuestionarioPorLeccion } from "../../hooks/useCuestionario"
import BotonCuestionario from "../../components/clienteLeccion/BotonCuestionario"

const C_Leccion = () => {

  const { idCurso, nombreCurso, idLeccion } = useParams()
  const { acceso, token, usuario } = useAccesoStore((state) => ({
    acceso: state.acceso,
    token: state.token,
    usuario: state.usuario
  }))
  const navigation = useNavigate()
  const { data: curso, isLoading: isLoadingCurso } = useObtenerCursoPorId(idCurso)
  const { data: leccion, isLoading: isLoadingLeccion } = useObtenerLeccion(idLeccion)
  const { data: leccionesCurso, isLoading: isLoadingLeccionesCurso } = useObtenerLeccionesPorCurso(idCurso)
  const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos()
  const { data: archivosLecciones, isLoading: isLoadingArchivosLecciones } = useObtenerArchivoPorLeccion(idLeccion)
  const { data: califCurso, isLoading: isLoadingCalifCurso } = useObtenerCalificacionesClientePorCurso(token, usuario.idUsuario, idCurso)
  const { data: cuestionario, isLoading: isLoadingCuestionario } = useObtenerCuestionarioPorLeccion(token, idLeccion)

  if (isLoadingCurso || isLoadingLeccion || isLoadingLeccionesCurso || isLoadingArchivos || isLoadingArchivosLecciones || isLoadingCalifCurso || isLoadingCuestionario) return <Cargando />

  const videoLeccion = archivos.find((archivo) => archivo.idArchivo == leccion.idVideo)

  const irLeccion = (leccionId) => {
    navigation(`/cliente/curso/leccion/${idCurso}/${nombreCurso}/${leccionId}`)
  }

  return (
    <div className="container-fluid py-5">

      <h2 className="text-center display-2 mb-5">{curso.nombre}</h2>

      <div className="row">
        <div className="col-8">
          <div className="row">
            <video controls>
              <source src={videoLeccion.url} />
            </video>
            <h4 className="mt-3" >{leccion.nombre}</h4>
          </div>


          <div className="row">

            <div className="d-flex justify-content-end mb-2">
              {
                archivosLecciones.length == 0 ?
                  <></>
                  :
                  <div className="dropdown">
                    <button className="btn btn-primary btn-sm dropdown-toggle me-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Archivos
                    </button>
                    <ul className="dropdown-menu">
                      {
                        archivosLecciones.map((a) => <li key={a.idArchivo}><a className="dropdown-item" href={a.url} target="_blank" >{a.nombre}</a></li>)
                      }
                    </ul>
                  </div>
              }

              <BotonCuestionario cuestionario={cuestionario} idCurso={idCurso} />
            </div>


            <p>
              {leccion.informacion}
            </p>
          </div>
        </div>


        <div className="col-4">
          <h4 className="text-center mb-3">Lecciones del curso</h4>
          <div className="list-group overflow-y-auto" style={{ height: "500px" }}>
            { /** Cuando tengan el mismo id se asigna la clase active */}
            {
              leccionesCurso.map((leccion, index) => {

                if (califCurso.length == 0 && index == 0) return <button key={leccion.idLeccion} type="button" onClick={() => irLeccion(leccion.idLeccion)} className={leccion.idLeccion == idLeccion ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} >1Lección {index + 1}: {leccion.nombre}</button>
                
                if( califCurso.length <= index) return <button key={leccion.idLeccion} type="button" onClick={() => irLeccion(leccion.idLeccion)} className={leccion.idLeccion == idLeccion ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} >2Lección {index + 1}: {leccion.nombre}</button>

                return <button key={leccion.idLeccion} type="button" className="list-group-item list-group-item-action" disabled >3Lección {index + 1}: {leccion.nombre}</button>


              })
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default C_Leccion