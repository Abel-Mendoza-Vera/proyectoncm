import React from "react";
import img from '../assets/curso.jpg'
import { Link, useNavigate } from "react-router-dom"

const Cursos = () => {

    const navigate = useNavigate()

    const MisCursos = () => {
        navigate(`/cliente/mis_cursos`)
    }

    const Cursos = () => {
        navigate(`/cliente/cursos`)
    }

    const Certificaciones = () => {
        navigate(`/cliente/certificaciones`)
    }

    return (
        <div className="mb-5">
            <div className="row mt-3 justify-content-end mb-5">
                <div className='col-6'>
                    <div className="input-group">
                        <input value="" className='form-control' placeholder='Buscar' type="search" name="buscador" />
                        <span className='input-group-text material-icons'>search</span>
                    </div>
                </div>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" onClick={Cursos}>Cursos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick={MisCursos}>Mis Cursos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick={Certificaciones}>Cursos Terminados</a>
                    </li>
                </ul>
            </div>



            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                <div className="col mb-5">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <div><p className="card-text">Descripción del Curso</p>
                            <h5 className="text-end ">$100 MXN</h5>
                            </div>
                            <a href="" className="btn btn-outline-success">Comprar</a>
                        </div>
                    </div>
                </div>
                <div className="col mb-5">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <div><p className="card-text">Descripción del Curso</p>
                            <h5 className="text-end ">$100 MXN</h5>
                            </div>
                            <a href="" className="btn btn-outline-success">Comprar</a>
                        </div>
                    </div>
                </div>
                <div className="col mb-5">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <div><p className="card-text">Descripción del Curso</p>
                            <h5 className="text-end ">$100 MXN</h5>
                            </div>
                            <a href="" className="btn btn-outline-success">Comprar</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cursos