import { Link, useNavigate } from "react-router-dom"

const CursosPlantilla = () => {
    const navigate = useNavigate()

    const Cursos = () => {
        navigate(`/cliente/mis_cursos`)
    }

    const Curso = () => {
        navigate(`/cliente/cursos_plantilla`)
    }

    const leccion = () => {
        navigate(`/cliente/leccion`)
    }

    return (
        <div>

            <div class="card text-center">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" onClick={Curso}>Introducción</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Lección 1</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" onClick={leccion}>Lección</a></li>
                                <li><a class="dropdown-item" href="#">Archivo 1</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Separated link</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <h5 class="card-title"><h3 className='text-center'>Nombre del Curso</h3></h5>
                    <p className='text-justify'>Descripción del Curso</p>
                    <p className='text-justify'>Objetivo de este curso es aprender</p>
                    <video width="500" height="300" src="https://firebasestorage.googleapis.com/v0/b/test-firebase-react-19c01.appspot.com/o/cursos%2FCurso%201%2Fvideo%2Fvideo.mp4?alt=media&token=60684037-2283-4fcf-bdbd-17588edf320a" poster="presentacion.jpg" controls></video>


                    <div class="card-body d-flex justify-content-between align-items-center">
                        <button className='btn btn-outline-primary' onClick={Cursos}>Regresar</button>

                        <button className='btn btn-outline-primary' onClick={leccion}>Continuar</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CursosPlantilla