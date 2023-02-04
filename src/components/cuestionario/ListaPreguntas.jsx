import { usePreguntaStore } from '../../store/preguntaStore'

import FormularioPregunta from "./FormularioPregunta"
import ItemPregunta from "./ItemPregunta"

const ListaPreguntas = ({ cuestionarioId, nombre }) => {

    const {preguntas} = usePreguntaStore((state) => ({ preguntas: state.preguntas }))
    let preguntasDelCuestionario = preguntas.filter((item) => item.idCuestionario == cuestionarioId )

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