import React from "react";
import img from '../assets/curso.jpg'
import { Link, useNavigate } from "react-router-dom"
import { BiSearch } from "react-icons/bi"


const Certificaciones = () => {


    const navigate = useNavigate()

    const MisCursos = () => {
        navigate(`/cliente/mis_cursos`)
    }



    const Certificaciones = () => {
        navigate(`/cliente/certificaciones`)
    }

    return (
        <div className="mb-5">
            <div className="row mt-3 justify-content-end mb-5">
                <ul className="nav nav-tabs">

                    <li className="nav-item">
                        <a className="nav-link" onClick={MisCursos}>Mis Cursos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" onClick={Certificaciones}>Cursos Terminados</a>
                    </li>
                </ul>
            </div>
            <div className="row mt-3 justify-content-end">

                <div className='col-6'>
                    <div className="input-group">
                        <input className='form-control' placeholder='Buscar' type="search" name="buscadorUsuario" />
                        <span className='input-group-text'><BiSearch size="2em" /></span>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <h4>
                    Mis Certificaciones
                </h4>
            </div>

            <section className="h-100" style={{ backgroundcolor: "#eee" }}>
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">

                            <div className="card rounded-3 mb-4">
                                <div className="card-body p-4">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img
                                                src={img}
                                                className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <p className="lead fw-normal mb-2">Curso 1</p>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                            <button className="btn btn-link px-2"
                                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                                <i className="fas fa-minus"></i>
                                            </button>


                                            <button className="btn btn-link px-2"
                                                onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <button type="button" className="btn btn-success btn-block">Descargar</button>
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                            <a href="#!" className="text-danger"><i className="fas fa-trash fa-lg"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Certificaciones