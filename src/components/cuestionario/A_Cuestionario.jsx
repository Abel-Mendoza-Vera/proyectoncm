import { useCuestionarioStore } from '../../store/cuestionarioStore'

import FormularioCuestionario from './FormularioCuestionario'
import ListaPreguntas from './ListaPreguntas'

const A_Cuestionario = ({ leccionId }) => {

    const { cuestionarios } = useCuestionarioStore((state) => ({
        cuestionarios: state.cuestionarios
    }))

    let cuestionario = cuestionarios.find((item) => item.idLeccion == leccionId)

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