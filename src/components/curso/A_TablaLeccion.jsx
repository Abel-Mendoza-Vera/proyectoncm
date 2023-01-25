import { useState } from "react"
import { useLeccionStore } from "../../store/leccionStore"
import { shallow } from 'zustand/shallow'
import A_RegistroLeccion from "./A_RegistroLeccion"

const A_TablaLeccion = () => {

    const { lecciones } = useLeccionStore((state) => ({
        lecciones: state.lecciones
    }), shallow)

    let listaLecciones = lecciones
    const [buscador, setBuscador] = useState("")

    const handleChange = (e) => {
        setBuscador(e.target.value)
        console.log(buscador)
    }

    if ( !buscador ){
        listaLecciones = lecciones
    }
    else{
        listaLecciones = lecciones.filter( ( leccion ) => leccion.nombre.toLowerCase().includes(buscador.toLowerCase()) )
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

            <div className="overflow-y-auto" style={{ height: "525px" }} >
                <table id="datosLeccion" className='table table-hover mt-4'>
                    <thead style={{ backgroundColor: "#274A93", color: "white" }}>
                        <tr>
                            <th>Id</th>
                            <th>Leccion</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody className='table-group-divider' >
                        {
                            listaLecciones.map((leccion) => {
                                return (
                                    <A_RegistroLeccion key={leccion.idLeccion} leccion={leccion} />
                                )
                            })

                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default A_TablaLeccion