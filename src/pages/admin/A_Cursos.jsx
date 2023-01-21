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

      

    </div>
    </>
  )
}

export default A_Cursos