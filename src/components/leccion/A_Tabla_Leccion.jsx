import { useState } from "react"
import A_Registro_Leccion from "./A_Registro_Leccion"

import { useObtenerLeccionesPorCurso } from "../../hooks/useLeccion"

const A_Tabla_Leccion = ({ cursoId, cursoNombre }) => {

    const { data ,isLoading } = useObtenerLeccionesPorCurso(cursoId)

    const [buscador, setBuscador] = useState("")

    if (isLoading) return <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>

    let listaLecciones = data

    const handleChange = (e) => {
        setBuscador(e.target.value)
    }

    if (!buscador) {
        listaLecciones = data
    }
    else {
        listaLecciones = data.filter((leccion) => leccion.nombre.toLowerCase().includes(buscador.toLowerCase()))
    }

    return (
        <>
            <div className="row mt-3 justify-content-end">
                <div className='col-6'>
                    <div className="input-group">
                        <input value={buscador} onChange={(e) => handleChange(e)} className='form-control' placeholder='Buscar' type="search" name="buscador" />
                        <span className='input-group-text material-icons'>search</span>
                    </div>
                </div>
            </div>

            <div className="overflow-y-auto" style={{ height: "500px" }} >
                <table id="datosLeccion" className='table table-hover mt-4'>
                    <thead style={{ backgroundColor: "#274A93", color: "white" }}>
                        <tr>
                            <th>Id Lección</th>
                            <th>Nombre</th>
                            <th>Informacion</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody className='table-group-divider' >
                        {

                            listaLecciones.length == 0 ?

                                (<tr><td colSpan='5' ><h2 className="text-center" ><strong>No hay lecciones registrados</strong></h2></td></tr>) :

                                listaLecciones.map((leccion) => {
                                    return (
                                        <A_Registro_Leccion key={leccion.idLeccion} leccion={leccion} cursoNombre={cursoNombre} />
                                    )
                                })

                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default A_Tabla_Leccion