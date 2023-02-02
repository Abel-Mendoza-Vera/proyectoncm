import { useLeccionStore } from "../../store/leccionStore"
import FormularioModificarLeccion from "../../components/leccion/FormularioModificarLeccion"

const A_DetalleLeccion = ({leccionId}) => {

    let lecciones = useLeccionStore((state) => state.lecciones)

    let leccion = lecciones.find((item) => item.idLeccion == leccionId)
  
    return (
        <>
         <div className='container mt-3'>
                {/** Botón editar lección */}
                <div className="row-1">
                    {/** Abrira modal del fomulario de la leccion */}
                    <FormularioModificarLeccion leccion={leccion} />
                </div>
            <div className='container mt-3'>        
                {/** Información del curso */}
                <div className="row row-2 mt-3">
                    <div className="col-12 col-md-8">
                        <h3><strong>{leccion.nombre}</strong></h3>
                        <p><strong>Información:</strong></p>
                        <p>{leccion.informacion}</p>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default A_DetalleLeccion