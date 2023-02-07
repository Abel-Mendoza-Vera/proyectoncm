import { Link, useNavigate } from "react-router-dom"

const CursosPlantilla = () => {
    const navigate = useNavigate()

    const leccion = () => {
        navigate(`/cliente/leccion`)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="container text-justify">
                        <div className="base_header"><span className="text-decoration-underline"><small className="bor_header_left"></small> <small className="bor_header_right"></small></span>
                            <h3 className='text-center'>Nombre del Curso</h3>
                        </div>
                        <div className="base_footer"></div>
                        <p className='text-justify'>Descripción del Curso Descripción del Curso Descripción del Curso Descripción del Curso Descripción del Curso Descripción del Curso Descripción del CursoDescripción del CursoDescripción del CursoDescripción del CursoDescripción del CursoDescripción del CursoDescripción del CursoDescripción del Curso</p>

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="embed-responsive embed-responsive-16by9 text-center">
                        <iframe width="1000" height="400" src="https://www.youtube.com/embed/NAVzjKNa6ro" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                    </div>
                </div>
            </div>
            <div className='text-center'>
                <button className='btn btn-outline-primary' onClick={leccion}>Continuar</button>
            </div>

        </div>

    )
}

export default CursosPlantilla