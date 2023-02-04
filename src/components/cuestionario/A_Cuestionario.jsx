import { useCuestionarioStore } from '../../store/cuestionarioStore'

import FormularioCuestionario from './FormularioCuestionario'
import ListaPreguntas from './ListaPreguntas'

const A_Cuestionario = ({ leccionId }) => {

    const { cuestionarios } = useCuestionarioStore((state) => ({
        cuestionarios: state.cuestionarios
    }))

    let cuestionario = cuestionarios.find((item) => item.idLeccion == leccionId)

    /**
         * Pasos por seguir:
         * 0- Crear el diseño de todo lo de abajo, despues dar la funcionalidad
         * 1- Validar si hay o no 1 cuestionario para la lección
         * 2- Tener su alerta
         * 3- Agregar boton modal para agregar el cuestionario
         * 3.1 - Ocultar el boton
         * 4- Crear un "card" del cuestionario vacio
         * 5- Agregar un boton modal para agrega una pregunta al cuestionario
         * 6- Mostrar la lista de preguntas en el "card" del cuestionario
         * 7- Modificar una pregunta
         * 8- Eliminar una pregunta
         */

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