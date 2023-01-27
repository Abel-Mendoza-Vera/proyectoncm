
const A_CursosEditar = () => {

  return (
    <>
      <div className='container mt-3'>
        {/** Botón editar curso */}
        <div className="row-1">
          {/** Abrira modal del fomulario del curso */}
          <button className="btn btn-primary" ><span className="material-icons" >edit</span>Editar curso</button>
        </div>

        {/** Información del curso */}
        <div className="row mt-3">
          <div className="col-8">
            <h3><strong>Desarrollo personal</strong></h3>
            <h5 className="text-end text-danger">$ 500.00 MXN</h5>
            <p><strong>Duración:</strong> 40 horas</p>
            <p><strong>Objetivo:</strong></p>
            <p>Mauris non nisl nibh. Pellentesque eget nunc eu sem eleifend accumsan.</p>
            <p><strong>Descripción:</strong></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan ut felis rutrum sagittis. Sed faucibus ligula mollis scelerisque consectetur. Vivamus vestibulum fringilla ipsum vestibulum ornare. Aenean consequat, nisi et vehicula condimentum, neque magna bibendum ipsum, vitae aliquet dolor lectus ut purus. Fusce sem tellus, mattis iaculis finibus eu, mattis dictum purus. Suspendisse tempus bibendum leo eget rutrum. Donec eget tincidunt velit.</p>

          </div>
          <div className="col-4">

            <div className="row">
              <div className="card">
                <div className="card-body">
                  <p className='card-text'>No hay una <strong>imagen</strong> para el curso.</p>
                  <button className='btn btn-primary' >Agregar imagen</button>
                </div>
              </div>
            </div>

            <div className="row mt-3">
            <div className="card">
                <div className="card-body">
                  <p className='card-text'>No hay un <strong>video</strong> introductorio para el curso.</p>
                  <button className='btn btn-primary' >Agregar video</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        {/** Division */}
        <h3><strong>Lecciones</strong></h3>

        {/** Botón agregar lección */}
        <div className="row-1">
          <button className='btn btn-outline-success'><span className='material-icons'>add</span>Agregar lección</button>
          {/** Abre modal del formulario */}
        </div>

      </div>
    </>
  )
}

export default A_CursosEditar