import { useState } from "react"
import { useCuestionarioStore } from "../../store/cuestionarioStore"
import A_Registro_Cuestionario from "./A_Registro_Cuestionario"

const A_TablaCuestionario = ({ cuestionarioId }) => {

    const { cuestionarios } = useCuestionarioStore((state) => ({
        cuestionarios: state.cuestionarios
    }))

    let listaCuestionarios = cuestionarios.filter((cuestionario) => cuestionario.idCuestionario == cuestionarioId)

    const [buscador, setBuscador] = useState("")

    const handleChange = (e) => {
        setBuscador(e.target.value)
    }

    if (!buscador) {
        listaCuestionarios = cuestionarios.filter((cuestionario) => cuestionario.idCuestionario == cuestionarioId)
    }
    else {
        listaCuestionarios = cuestionarios.filter((cuestionario) => cuestionario.idCuestionario == cuestionarioId && cuestionario.nombre.toLowerCase().includes(buscador.toLowerCase()))
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
                <table id="datosCuestionario" className='table table-hover mt-4'>
                    <thead style={{ backgroundColor: "#274A93", color: "white" }}>
                        <tr>
                            <th>Id Cuestionario</th>
                            <th>Nombre</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody className='table-group-divider' >
                        {

                            listaCuestionarios.length == 0 ?

                                (<tr><td colSpan='5' ><h2 className="text-center" ><strong>No hay cuestionarios registrados</strong></h2></td></tr>) :

                                listaCuestionarios.map((cuestionario) => {
                                    return (
                                        <A_Registro_Cuestionario key={cuestionario.idCuestionario} cuestionario={cuestionario} />
                                    )
                                })

                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default A_TablaCuestionario