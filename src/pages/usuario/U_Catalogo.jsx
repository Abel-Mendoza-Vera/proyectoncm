import { BiSearch } from "react-icons/bi"

import Cargando from "../Cargando"
import Tarjeta from "../../components/curso/Tarjeta"
import { useObtenerCursos } from "../../hooks/useCurso"
import { useObtenerArchivos } from "../../hooks/useArchivo"
import { useState } from "react"

const U_Catalogo = () => {

    const { data: cursos, isLoading: isLoadingCursos } = useObtenerCursos()
    const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos();
    const [buscadorCurso, setBuscadorCurso] = useState("")

    if (isLoadingCursos || isLoadingArchivos) return < Cargando />

    const onChangeBuscadorCurso = (e) => {
        setBuscadorCurso(e.target.value)
    }

    let listaCursos = cursos

    if (!buscadorCurso) {
        listaCursos = cursos
    }
    else {
        listaCursos = cursos.filter((curso) => curso.nombre.toLowerCase().includes(buscadorCurso.toLowerCase()))
    }

    return (
        <div className="container-fluid" >

            <span id="hero">
                <div className="border rounded text-center mb-3 alert alert-info" role="alert">
                    <h3 className="my-4">¡ Checa nuestro catálogo ! </h3>
                </div>
            </span>



            <div className="row mt-3 justify-content-end">
                <div className='col-6'>
                    <div className="input-group">
                        <input value={buscadorCurso} onChange={(e) => onChangeBuscadorCurso(e)} className='form-control' placeholder='Buscar' type="search" name="buscadorUsuario" />
                        <span className='input-group-text'><BiSearch size="2em" /></span>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-3 justify-content-center">
                <div className='row mt-3 row-cols-auto g-3 mx-auto justify-content-start' >
                    {
                        listaCursos.length ?
                            listaCursos.map((curso) => {
                                let archivo = archivos.find((item) => item.idArchivo == curso.idMiniatura)
                                if(curso.estatus == 0){
                                    return <></>
                                }
                                else{
                                    return <Tarjeta key={curso.idCurso} curso={curso} archivo={archivo} />
                                }
                            })
                            :
                            <h1 className="my-5">No Se Ha Encontrado Dicho Curso</h1>
                    }
                </div>
            </div>



        </div>
    )
}

export default U_Catalogo