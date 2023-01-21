import React from 'react'

const A_Cursos = () => {
  return (
    <>
      <div className='container-fluid mt-3'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <button className='btn btn-outline-success' ><span className="material-icons">add</span>Agregar</button>
          </div>

          <div className='col'>
            <div className="input-group">
              <input className='form-control' placeholder='Buscar' type="search" name="buscar" />
              <span className='input-group-text material-icons'>search</span>
            </div>
          </div>
        </div>

        { /** Lista de las tarjetas de los cursos */}
        <div className='mt-3 d-flex flex-wrap' >

        { /** Tarjetas del cursos */}
          <div className="card m-3" style={{ width: "18rem" }}>
            <img src="https://www.lucaedu.com/wp-content/uploads/2021/11/Que-es-un-curso-en-linea.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Nombre del curso</h5>
              <p className="card-text">Descripción del curso</p>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-end">
                <button className='btn btn-primary'><span className='material-icons'>edit</span></button>
                <div className="mx-1"></div>
                <button className='btn btn-danger'><span className='material-icons'>delete</span></button>
              </div>
            </div>
          </div>

          { /** Tarjetas del cursos */}
          <div className="card m-3" style={{ width: "18rem" }}>
            <img src="https://www.lucaedu.com/wp-content/uploads/2021/11/Que-es-un-curso-en-linea.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Nombre del curso</h5>
              <p className="card-text">Descripción del curso</p>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-end">
                <button className='btn btn-primary'><span className='material-icons'>edit</span></button>
                <div className="mx-1"></div>
                <button className='btn btn-danger'><span className='material-icons'>delete</span></button>
              </div>
            </div>
          </div>

          { /** Tarjetas del cursos */}
          <div className="card m-3" style={{ width: "18rem" }}>
            <img src="https://www.lucaedu.com/wp-content/uploads/2021/11/Que-es-un-curso-en-linea.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Nombre del curso</h5>
              <p className="card-text">Descripción del curso</p>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-end">
                <button className='btn btn-primary'><span className='material-icons'>edit</span></button>
                <div className="mx-1"></div>
                <button className='btn btn-danger'><span className='material-icons'>delete</span></button>
              </div>
            </div>
          </div>

          { /** Tarjetas del cursos */}
          <div className="card m-3" style={{ width: "18rem" }}>
            <img src="https://www.lucaedu.com/wp-content/uploads/2021/11/Que-es-un-curso-en-linea.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Nombre del curso</h5>
              <p className="card-text">Descripción del curso</p>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-end">
                <button className='btn btn-primary'><span className='material-icons'>edit</span></button>
                <div className="mx-1"></div>
                <button className='btn btn-danger'><span className='material-icons'>delete</span></button>
              </div>
            </div>
          </div>

          { /** Tarjetas del cursos */}
          <div className="card m-3" style={{ width: "18rem" }}>
            <img src="https://www.lucaedu.com/wp-content/uploads/2021/11/Que-es-un-curso-en-linea.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Nombre del curso</h5>
              <p className="card-text">Descripción del curso</p>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-end">
                <button className='btn btn-primary'><span className='material-icons'>edit</span></button>
                <div className="mx-1"></div>
                <button className='btn btn-danger'><span className='material-icons'>delete</span></button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default A_Cursos