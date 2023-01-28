import Mis_Cursos from "../../components/Mis_Cursos"
import Tarjeta from "../../components/curso/Tarjeta"

const C_Mis_Cursos = () => {

  return (
    <>
      <div className='container-fluid mt-3'>

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