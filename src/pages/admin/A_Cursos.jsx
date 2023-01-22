import Swal from "sweetalert2"

const A_Cursos = () => {

  const alerta = () => {
    Swal.fire({
      title: 'Curso guardado correctamente',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    })
  }


  return (
    <>
      <div className='container-fluid mt-3'>

        {/** Primer fila para agregar o buscar un curso */}
        <div className="row">
          <div className="col">
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#agregarCursoModal" ><span className="material-icons">add</span>Agregar</button>
          </div>

          <div className='col'>
            <div className="input-group">
              <input className='form-control' placeholder='Buscar' type="search" name="buscar" />
              <span className='input-group-text material-icons'>search</span>
            </div>
          </div>
        </div>

        { /** Lista de las tarjetas de los cursos */}
        <div className='row mt-5 g-4' >

          { /** Tarjetas del cursos */}
          <div className='col'>
            <div className="card" style={{ width: "18rem" }}>
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

        <div className="modal fade" id="agregarCursoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar curso</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="nombre" name='nombre' placeholder="" />
                  <label htmlFor="nombre">Nombre</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="number" min='1' className="form-control" id="precio" name='precio' placeholder="" />
                  <label htmlFor="precio">Precio</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea className="form-control" placeholder="" id="objetivos" rows='3' style={{ height: "100px" }} ></textarea>
                  <label htmlFohtmlForr="objetivos">Objetivos</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea className="form-control" placeholder="" id="descripcion" rows='3' style={{ height: "100px" }} ></textarea>
                  <label htmlFohtmlForr="descripcion">Descripción</label>
                </div>

                <div className="mb-3">
                  <label htmlFor="video" className="form-label">Video introductorio del curso</label>
                  <input className="form-control" type="file" id="video"/>
                </div>

                <div className="mb-3">
                  <label htmlFor="miniatura" className="form-label">Miniatura del curso</label>
                  <input className="form-control" type="file" id="miniatura"/>
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><span className='material-icons'>close</span>Cerrar</button>
                <button type="button" className="btn btn-success" onClick={alerta} data-bs-dismiss="modal" ><span className='material-icons'>save</span> Guardar</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default A_Cursos