import Leccion from "../../components/clienteLeccion/Leccion"

const C_Leccion = () => {

  return (
    <>
      <div className='container-fluid mt-3 vh-100'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <Leccion/>
          </div>
        </div>  
      </div>
    </>
  )
}

export default C_Leccion