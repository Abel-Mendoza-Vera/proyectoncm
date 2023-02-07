import { Link, useNavigate } from "react-router-dom"

const Leccion = () => {

    const navigate = useNavigate()

    const examen = () => {
        navigate(`/cliente/examen`)
    }

    return (
        <div>
            <ul class="nav nav-tabs">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Lección 1</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Archivo 1</a>
                        <a class="dropdown-item" href="#">Archivo 2</a>
                        <a class="dropdown-item" href="#">Archivo 3</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Archivo 4</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Lección 2</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Archivo 1</a>
                        <a class="dropdown-item" href="#">Archivo 2</a>
                        <a class="dropdown-item" href="#">Archivo 3</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Archivo 4</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Lección 3</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Archivo 1</a>
                        <a class="dropdown-item" href="#">Archivo 2</a>
                        <a class="dropdown-item" href="#">Archivo 3</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Archivo 4</a>
                    </div>
                </li>
            </ul>

            <div class="card text-center">
                <div class="card-header">
                    <h3 className='text-center'>Nombre de la leccion</h3>
                </div>
                <div class="card-body">
                    <p className='text-justify'>Información de la lección</p>
                    <div class="row">
                        <div class="col-12">
                            <div class="embed-responsive embed-responsive-16by9 text-center">
                                <iframe width="1000" height="400" src="https://www.youtube.com/embed/NAVzjKNa6ro" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                    </div>
                        </div>
                    </div>

                </div>
                <div class="card-footer text-muted">
                    <div className='text-center'>
                        <button className='btn btn-outline-primary' onClick={examen}>Continuar</button>
                    </div>                </div>
            </div>


        </div>

    )
}

export default Leccion