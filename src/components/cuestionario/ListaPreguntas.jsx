import { usePreguntaStore } from '../../store/preguntaStore'

import FormularioPregunta from "./FormularioPregunta"
import ItemPregunta from "./ItemPregunta"

import { useAccesoStore } from '../../store/accesoStore'
import { useObtenerPreguntas } from '../../hooks/usePregunta'

const ListaPreguntas = ({ cuestionarioId, nombre }) => {

    const token = useAccesoStore((state) => state.token)
    const { data, isLoading } = useObtenerPreguntas(token)

    if (isLoading) return <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>

    let preguntasDelCuestionario = data.filter((item) => item.idCuestionario == cuestionarioId )

    return (
        <div className="card mt-4" style={{ height: "300px" }}>

            <div className="card-header d-flex justify-content-between">
                {nombre}
                <FormularioPregunta cuestionarioId={cuestionarioId} />
            </div>

            <ol className="list-group list-group-flush list-group-numbered overflow-y-auto">
                {
                    preguntasDelCuestionario.map((item) => {
                        return <ItemPregunta key={item.idPregunta} pregunta={item}/>
                    })
                }
            </ol>

        </div>
    )
}

export default ListaPreguntas