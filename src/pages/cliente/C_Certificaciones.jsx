import Certificaciones from "../../components/Certificaciones"

const C_Certificaciones = () => {

  return (
    <>
      <div className='container-fluid mt-3 vh-100'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <Certificaciones />
          </div>
        </div>  
      </div>
    </>
  )
}

export default C_Certificaciones