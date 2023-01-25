import FormularioCuestionario from "../../components/curso/FormularioCuestionario"

const A_Cuestionarios = () => {

  return (
    <>
      <div className='container-fluid mt-3'>

        {/** Primer fila para agregar o buscar una leccion */}
        <div className="row">
          <div className="col">
            <FormularioCuestionario/>
          </div>
        </div>

      </div>
    </>
  )
}

export default A_Cuestionarios