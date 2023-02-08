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
                <p class="nav-link active" href="#">Objetivo de este curso es aprender</p>
                <video width="1000" height="400" src="https://firebasestorage.googleapis.com/v0/b/test-firebase-react-19c01.appspot.com/o/cursos%2FCurso%201%2Fvideo%2Fvideo.mp4?alt=media&token=60684037-2283-4fcf-bdbd-17588edf320a" poster="presentacion.jpg" controls></video>

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