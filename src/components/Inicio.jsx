import Cargando from "../pages/Cargando"
import TarjetaCursosHome from "../components/curso/TarjetaCursosHome"
import { useObtenerCursos } from "../hooks/useCurso"
import { useObtenerArchivos } from "../hooks/useArchivo"
import { useState } from "react"

const Inicio = () => {
  const { data: cursos, isLoading: isLoadingCursos } = useObtenerCursos()
  const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos();

  if (isLoadingCursos || isLoadingArchivos) return < Cargando />

  let listaCursos = cursos.filter((curso) => curso.estatus == 1)

  return (
    <>
      <div className='container-fluid'>
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://cssslider.com/sliders/demo-10/data1/images/1.jpg" className="d-block w-100" height="250px" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src="https://cssslider.com/sliders/demo-10/data1/images/3.jpg" className="d-block w-100" height="250px" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src="https://cssslider.com/sliders/demo-10/data1/images/2.jpg" className="d-block w-100" height="250px" alt="Slide 3" />
            </div>

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container-fluid mt-3 justify-content-center">
        <div className='row mt-3 row-cols-auto g-3 mx-auto justify-content-start' >
          {
            listaCursos.length ?
              listaCursos.map((curso, index) => {
                
                if (index < 3) {
                  let archivo = archivos.find((item) => item.idArchivo == curso.idMiniatura)
                  return <TarjetaCursosHome key={curso.idCurso} curso={curso} archivo={archivo} />
                }
                return <></>
              })
              :
              <h1 className="my-5">No Se Ha Encontrado Dicho Curso</h1>
          }
        </div>
      </div>


    </>
  )
}

export default Inicio