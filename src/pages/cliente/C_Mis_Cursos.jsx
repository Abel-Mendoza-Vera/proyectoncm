import Mis_Cursos from "../../components/Mis_Cursos"

const C_Mis_Cursos = () => {

  return (
    <>
      <div className='container-fluid mt-3 vh-100'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <Mis_Cursos />
          </div>
        </div>

        {/** Tarjeta 
       <Tarjeta/>*/}

      </div>
    </>
  )
}

export default C_Mis_Cursos