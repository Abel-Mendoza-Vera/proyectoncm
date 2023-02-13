import React from "react";
import img from '../assets/curso.jpg'
import { Link, useNavigate } from "react-router-dom"

const Certificaciones = () => {


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
                        <a class="nav-link" onClick={Cursos}>Cursos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick={MisCursos}>Mis Cursos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" onClick={Certificaciones}>Cursos Terminados</a>
                    </li>
                </ul>
            </div>

            <div>
                Hola
            </div>

        </div>
    )
}

export default Certificaciones