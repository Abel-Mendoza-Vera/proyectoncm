import { useCursoStore } from "../../store/cursoStore"
import {shallow} from 'zustand/shallow'
import A_Registro from "./A_Registro"

const A_Tabla = () => {

    const {cursos} = useCursoStore((state) => ({
        cursos: state.cursos
    }), shallow)

    return (
        <div className="overflow-y-auto" style={{ height: "525px" }} >
            <table className='table table-hover mt-4'>
                <thead style={{ backgroundColor: "#274A93", color: "white" }}>
                    <tr>
                        <th>Id</th>
                        <th>Curso</th>
                        <th>Objetivo</th>
                        <th>Precio</th>
                        <th>Duración</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody className='table-group-divider' >
                    {
                        cursos.map((curso) => {
                            return (
                                <A_Registro key={curso.idCurso} curso={curso} />
                            )
                        })
                        
                    }
                </tbody>
            </table>
        </div>
    )
}

export default A_Tabla