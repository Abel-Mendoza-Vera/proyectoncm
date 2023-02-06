import React from "react";
import img from '../assets/curso.jpg'

const Cursos = () => {
    return (
        <div className="mb-5">
            <div className="row mt-3 justify-content-end mb-5">
                <div className='col-6'>
                    <div className="input-group">
                        <input value="" className='form-control' placeholder='Buscar' type="search" name="buscador" />
                        <span className='input-group-text material-icons'>search</span>
                    </div>
                </div>
            </div><br />
            
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                <div className="col mb-5">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <p className="card-text">Descripción del Curso</p>
                            <a href=""  className="btn btn-outline-success">Comprar</a>
                        </div>
                    </div>
                </div>
                <div className="col mb-5">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <p className="card-text ">Descripción del Curso</p>
                            <a href=""  className="btn btn-outline-success">Comprar</a>
                        </div>
                    </div>
                </div>
                <div className="col mb-5">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <p className="card-text">Descripción del Curso</p>
                            <a href=""  className="btn btn-outline-success">Comprar</a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Cursos