import React from "react";
import img from '../assets/curso.jpg'
import { Link, useNavigate } from "react-router-dom"


const Mis_Cursos = () => {

    const navigate = useNavigate()

    const Cursos = () => {
        navigate(`/cliente/cursos`)
    }

    const MisCursos = () => {
        navigate(`/cliente/mis_cursos`)
    }


    const continuar_curso = () => {
        navigate(`/cliente/cursos_plantilla`)
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
                        <a class="nav-link" onClick={Cursos}>Cursos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" onClick={MisCursos}>Mis Cursos</a>
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
                            <p className="card-text">Descripción del Curso</p>
                            <button className='btn btn-outline-success' onClick={continuar_curso}>Continuar</button>
                            <br /><br />
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col mb-5">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <p className="card-text ">Descripción del Curso</p>
                            <button className='btn btn-outline-success' onClick={continuar_curso}>Continuar</button>
                            <br /><br />
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col mb-5">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <p className="card-text">Descripción del Curso</p>
                            <button className='btn btn-outline-success' onClick={continuar_curso}>Continuar</button>
                            <br /><br />
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Mis_Cursos