import Examen from "../../components/clienteExamen/Examen"

const C_Examen = () => {

  return (
    <>
      <div className='container-fluid mt-3 vh-100'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <Examen />
          </div>
        </div>  
      </div>
    </>
  )
}

export default C_Examen