import Swal from "sweetalert2"
import { useCuestionarioStore } from "../../store/cuestionarioStore"

const BotonAgregarCuestionario = ({ cuestionarioId }) => {

    const {saveCuestionario, cuestionarios} = useCuestionarioStore((state) => ({
        saveCuestionario: state.saveCuestionario,
        cuestionarios: state.cuestionarios
    }))
    
    const handleGuardarCuestionario = async () => {

        let cuestionariosDeLaLecciones = cuestionarios.filter((cuestionario) => cuestionario.idCuestionario == cuestionarioId)
        
        let nombreCuestionario = `Cuestionario ${cuestionariosDeLaLecciones.length + 1}`
        
        const estatus = await saveCuestionario(cuestionarioId, nombreCuestionario, `Cuestionario de ${nombreCuestionario}`)

        if (estatus != 500){
            Swal.fire({
                title: "Agregar cuestionario",
                text: "Se ha guardado el cuestionario correctamente",
                icon: "success",
                timer: 1500,
                timerProgressBar: true
            })
        }
        else{
            Swal.fire({
                title: "Agregar cuestionario",
                text: "Ha ocurrido un error al momento de guardar el cuestionario",
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            })
        }
    }

    return (
        <>
            <button className="btn btn-outline-success" onClick={handleGuardarCuestionario} >
                <span className="material-icons">add</span>Agregar cuestionario
            </button>
        </>
    )
}

export default BotonAgregarCuestionario