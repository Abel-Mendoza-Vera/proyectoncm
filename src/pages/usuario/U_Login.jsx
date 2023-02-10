import Login from "../../components/Login"

const U_Login = () => {

  return (
    <>
      <div className='container-fluid mt-3 vh-100'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <Login/>
          </div>
        </div>  
      </div>
    </>
  )
}

export default U_Login