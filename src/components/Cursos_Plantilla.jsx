import { Link, useNavigate } from "react-router-dom"

const CursosPlantilla = () => {
    const navigate = useNavigate()

    const leccion = () => {
        navigate(`/cliente/leccion`)
    }

    return (


        <div class="card text-center">
            <div class="card-header">
                <h3 className='text-center'>Nombre del Curso</h3>
            </div>
            <div class="card-body">
                <p className='text-justify'>Descripción del Curso Descripción del Curso Descripción del CursoDescripción del CursoDescripción del CursoDescripción del CursoDescripción del CursoDescripción del CursoDescripción del CursoDescripción del Curso</p>
                <p class="nav-link active" href="#">Objetivo de este curso es aprender sobre los corridos tumbados y porque son buenos en las fiestas</p>
                <div class="row">
                    <div class="col-12">
                        <div class="embed-responsive embed-responsive-16by9 text-center">
                            <iframe width="1000" height="400" src="https://www.youtube.com/embed/NAVzjKNa6ro" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                    </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">
                <div className='text-center'>
                    <button className='btn btn-outline-primary' onClick={leccion}>Continuar</button>
                </div>
            </div>
        </div>





    )
}

export default CursosPlantilla