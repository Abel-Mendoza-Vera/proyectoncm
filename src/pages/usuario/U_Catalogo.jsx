import Tarjeta from "../../components/curso/Tarjeta"
import { useObtenerCursos } from "../../hooks/useCurso"

const U_Catalogo = () => {

    const { data: cursos, isLoading, isError } = useObtenerCursos()

    if(isLoading) return <h1>Cargando ...</h1>

    return (
        <div className="container-fluid mt-3">

            <div className='row mt-3 row-cols-auto g-3 mx-auto justify-content-center' >
                {
                    cursos.lenght ? 
                    cursos.map((curso) => <Tarjeta key={curso.idCurso} curso={curso}/>)
                    :
                    <h1 className="my-5">Aun no se cuenta con cursos</h1>
                }
            </div>

        </div>
    )
}

export default U_Catalogo