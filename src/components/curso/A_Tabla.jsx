import { useState } from "react"
import A_Registro from "./A_Registro"

import { useObtenerCursos } from '../../hooks/useCurso'
import { useAccesoStore } from "../../store/accesoStore"

const A_Tabla = () => {

    const token = useAccesoStore(state => state.token)
    const { data, isLoading, status } = useObtenerCursos(token)
    const [buscador, setBuscador] = useState("")

    if (isLoading) return <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>

    let listaCursos = data
    
    const handleChange = (e) => {
        setBuscador(e.target.value)
    }

    if ( !buscador ){
        listaCursos = data
    }
    else{
        listaCursos = data.filter( ( curso ) => curso.nombre.toLowerCase().includes(buscador.toLowerCase()) )
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
                <table id="datosCurso" className='table table-hover mt-4'>
                    <thead style={{ backgroundColor: "#274A93", color: "white" }}>
                        <tr>
                            <th>Id</th>
                            <th>Curso</th>
                            <th>Objetivo</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Duración</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody className='table-group-divider' >
                        {

                            listaCursos.length == 0 ?

                            (<tr><td colSpan='8' ><h2 className="text-center" ><strong>No hay cursos registrados</strong></h2></td></tr>):

                            listaCursos.map((curso) => {
                                return (
                                    <A_Registro key={curso.idCurso} curso={curso} />
                                )
                            })

                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default A_Tabla