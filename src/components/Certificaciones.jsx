import React from "react";

import { useNavigate } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import { useAccesoStore } from "../store/accesoStore"
import { useObtenerCertificacionesCliente } from "../hooks/useCertificacion";
import Cargando from "../pages/Cargando"
import ItemCertificado from "./certificado/ItemCertificado";

const Certificaciones = () => {

    const navigate = useNavigate()
    const { token, usuario } = useAccesoStore((state) => ({
        token: state.token,
        usuario: state.usuario
    }))

    const { data, isLoading } = useObtenerCertificacionesCliente(token, usuario.idUsuario)

    if (isLoading) return <Cargando />

    const MisCursos = () => {
        navigate(`/cliente/mis_cursos`)
    }

    const Certificaciones = () => {
        navigate(`/cliente/certificaciones`)
    }

    return (
        <div className="mb-5">
            <div className="row mt-3 justify-content-end mb-5">
                <ul className="nav nav-tabs">

                    <li className="nav-item">
                        <a className="nav-link" onClick={MisCursos}>Mis Cursos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" onClick={Certificaciones}>Cursos Terminados</a>
                    </li>
                </ul>
            </div>
            <div className="row mt-3 justify-content-end">

                <div className='col-6'>
                    <div className="input-group">
                        <input className='form-control' placeholder='Buscar' type="search" name="buscadorUsuario" />
                        <span className='input-group-text'><BiSearch size="2em" /></span>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <h4>
                    Mis Certificaciones
                </h4>
            </div>

            <section className="h-100" style={{ backgroundcolor: "#eee" }}>
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">

                            {
                                data.length == 0 ?
                                    <div className="alert alert-info text-center" role="alert">
                                        <h3>No se ha encontrado niguna certificación</h3>
                                    </div>
                                    :
                                    data.map((item) => {
                                        return <ItemCertificado key={item.idCertificacion} certificacion={item} />
                                    })
                            }

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Certificaciones