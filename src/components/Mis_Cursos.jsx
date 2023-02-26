import React from "react";
import img from '../assets/curso.jpg'
import { Link, useNavigate } from "react-router-dom"
import { BiSearch } from "react-icons/bi"

import Cargando from "../../src/pages/Cargando"
import Tarjeta from "../components/curso/TarjetaMisCursos"
import { useObtenerCursos } from "../hooks/useCurso"
import { useObtenerArchivos } from "../hooks/useArchivo"
import { useState } from "react"


const Mis_Cursos = () => {
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

    const navigate = useNavigate()

    const Cursos = () => {
        navigate(`/cliente/cursos`)
    }

    const MisCursos = () => {
        navigate(`/cliente/mis_cursos`)
    }


    const continuar_curso = () => {
        navigate(`/cliente/cursos_plantilla`)
    }
    
    const Certificaciones = () => {
        navigate(`/cliente/certificaciones`)
    }

    return (
        <div className="mb-5">
            <div className="row mt-3 justify-content-end mb-5">
                <div className='col-6'>
                </div>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" onClick={Cursos}>Carrito</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" onClick={MisCursos}>Mis Cursos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick={Certificaciones}>Cursos Terminados</a>
                    </li>
                </ul>
            </div>

            <div className="container-fluid" >




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
                    return <Tarjeta key={curso.idCurso} curso={curso} archivo={archivo} />
                })
                :
                <h1 className="my-5">No Se Ha Encontrado Dicho Curso</h1>
        }
    </div>
</div>



</div>

        </div>
    )
}

export default Mis_Cursos