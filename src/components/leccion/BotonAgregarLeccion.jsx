import Swal from "sweetalert2"
import { useLeccionStore } from "../../store/leccionStore"

const BotonAgregarLeccion = ({ cursoId }) => {

    const {saveLeccion, lecciones} = useLeccionStore((state) => ({
        saveLeccion: state.saveLeccion,
        lecciones: state.lecciones
    }))
    
    const handleGuardarLeccion = async () => {

        let leccionesDelCurso = lecciones.filter((leccion) => leccion.idCurso == cursoId)
        
        let nombreLeccion = `Lección ${leccionesDelCurso.length + 1}`
        
        const estatus = await saveLeccion(cursoId, nombreLeccion, `Información de la ${nombreLeccion}`)

        if (estatus != 500){
            Swal.fire({
                title: "Agregar lección",
                text: "Se ha guardado la lección correctamente",
                icon: "success",
                timer: 1500,
                timerProgressBar: true
            })
        }
        else{
            Swal.fire({
                title: "Agregar lección",
                text: "Ha ocurrido un error al momento de guardar la lección",
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            })
        }
    }

    return (
        <>
            <button className="btn btn-outline-success" onClick={handleGuardarLeccion} >
                <span className="material-icons">add</span>Agregar lección
            </button>
        </>
    )
}

export default BotonAgregarLeccion