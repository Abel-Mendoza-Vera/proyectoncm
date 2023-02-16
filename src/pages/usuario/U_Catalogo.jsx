import Tarjeta from "../../components/curso/Tarjeta"
import { useObtenerCursos } from "../../hooks/useCurso"

const U_Catalogo = () => {

    const { data: cursos, isLoading, isError } = useObtenerCursos()

    if(isLoading) return <h1>Cargando ...</h1>

    return (
        <div className="container-fluid mt-3 justify-content-center">

            <div className='row mt-3 row-cols-auto g-3 mx-auto justify-content-start' >
                {
                    cursos.length ? 
                    cursos.map((curso) => <Tarjeta key={curso.idCurso} curso={curso}/>)
                    :
                    <h1 className="my-5">Aun no se cuenta con cursos</h1>
                }
            </div>

        </div>
    )
}

export default U_Catalogo