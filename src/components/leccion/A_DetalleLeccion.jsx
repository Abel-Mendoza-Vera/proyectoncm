import { useLeccionStore } from "../../store/leccionStore"



const A_DetalleLeccion = ({leccionId}) => {

    let lecciones = useLeccionStore((state) => state.lecciones)

    let leccion = lecciones.find((item) => item.idLeccion == leccionId)
  

    return (
        <>
            <div className='container mt-3'>        
                {/** Información del curso */}
                <div className="row row-2 mt-3">
                    <div className="col-12 col-md-8">
                        <h3><strong>{leccion.nombre}</strong></h3>
                        <p><strong>Descripción:</strong></p>
                        <p>{leccion.informacion}</p>
                    </div>

                    
                </div>
            </div>
        </>
    )
}

export default A_DetalleLeccion