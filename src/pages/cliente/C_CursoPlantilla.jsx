import Cursos_Plantilla from "../../components/Cursos_Plantilla"

const C_CursosPlantilla = () => {

  return (
    <>
      <div className='container-fluid mt-3 vh-100'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <Cursos_Plantilla />
          </div>
        </div>  
      </div>
    </>
  )
}

export default C_CursosPlantilla