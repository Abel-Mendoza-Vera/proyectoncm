import Register from "../../components/Register"

const U_Register = () => {

  return (
    <>
      <div className='container-fluid mt-3 vh-100'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <Register/>
          </div>
        </div>  
      </div>
    </>
  )
}

export default U_Register