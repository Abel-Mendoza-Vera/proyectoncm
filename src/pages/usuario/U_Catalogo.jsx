import Tarjeta from "../../components/curso/Tarjeta"
import { useObtenerCursos } from "../../hooks/useCurso"
import { useObtenerArchivos } from "../../hooks/useArchivo"

const U_Catalogo = () => {

    const { data: cursos, isLoading } = useObtenerCursos()
    const { data: archivos } = useObtenerArchivos();

    if(isLoading) return <h1>Cargando ...</h1>
    

    return (
        <div className="container-fluid mt-3 justify-content-center">

            <div className='row mt-3 row-cols-auto g-3 mx-auto justify-content-start' >
                {
                    cursos.length ? 
                    cursos.map((curso) => {

                        let archivo = archivos.find((item) => item.idArchivo == curso.idMiniatura)

                        return <Tarjeta key={curso.idCurso} curso={curso} archivo={archivo} />
                    })
                    :
                    <h1 className="my-5">Aun no se cuenta con cursos</h1>
                }
            </div>

        </div>
    )
}

export default U_Catalogo