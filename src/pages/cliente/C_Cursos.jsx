import Cursos from "../../components/Cursos"

const C_Cursos = () => {

  return (
    <>
      <div className='container-fluid mt-3 vh-100'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <Cursos />
          </div>
        </div>  
      </div>
    </>
  )
}

export default C_Cursos