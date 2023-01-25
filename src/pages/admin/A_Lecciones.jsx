import FormularioLeccion from "../../components/curso/FormularioLeccion"

const A_Lecciones = () => {

  return (
    <>
      <div className='container-fluid mt-3'>

        {/** Primer fila para agregar o buscar una leccion */}
        <div className="row">
          <div className="col">
            <FormularioLeccion/>
          </div>
        </div>

      </div>
    </>
  )
}

export default A_Lecciones