import FormularioCuestionario from './FormularioCuestionario'
import ListaPreguntas from './ListaPreguntas'

import { useAccesoStore } from '../../store/accesoStore'
import { useObtenerCuestionarios } from '../../hooks/useCuestionario'

const A_Cuestionario = ({ leccionId }) => {

    const token = useAccesoStore((state) => state.token)
    const { data, isLoading } = useObtenerCuestionarios(token)

    if (isLoading) return <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>

    let cuestionario = data.find((item) => item.idLeccion == leccionId)

    return (
        <>
            <hr />
            <h3><strong>Cuestionario</strong></h3>

            {
                !cuestionario ?
                    <FormularioCuestionario leccionId={leccionId}/>
                    :
                    <>
                    <FormularioCuestionario cuestionarioId={cuestionario.idCuestionario} nombre={cuestionario.nombre} />
                    <ListaPreguntas cuestionarioId={cuestionario.idCuestionario} nombre={cuestionario.nombre} />
                    </>
            }

        </>
    )
}

export default A_Cuestionario