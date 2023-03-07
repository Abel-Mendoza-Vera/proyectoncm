import { useObtenerUsuarios } from "../../hooks/useUsuario"
import { useAccesoStore } from '../../store/accesoStore'

import { BiSearch } from 'react-icons/bi'

import { useState } from "react"
import A_Registro_Usuario from "../../components/usuario/A_Registro_Usuario"

const A_Tabla_Usuarios = () => {

    const token = useAccesoStore(state => state.token)
    const { data, isLoading } = useObtenerUsuarios(token)

    const [buscadorUsuario, setBuscadorUsuario] = useState("")
    const [tipoUsuario, setTipoUsuario] = useState("todo")

    if (isLoading) return <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>

    let listaUsuarios = data
    let listaClientes = data.filter((usuario) => usuario.roles.includes("cliente"))
    let listaStaff = data.filter((usuario) => usuario.roles.includes("staff"))

    const handlerBuscadorUsuario = (e) => {
        setBuscadorUsuario(e.target.value)
    }

    if (!buscadorUsuario) {
        listaUsuarios = data
        listaClientes = data.filter((usuario) => usuario.roles.includes("cliente"))
        listaStaff = data.filter((usuario) => usuario.roles.includes("staff"))
    }
    else {
        listaUsuarios = data.filter((usuario) => usuario.nombre.toLowerCase().includes(buscadorUsuario.toLowerCase()) | usuario.primerApellido.toLowerCase().includes(buscadorUsuario.toLowerCase()) | usuario.segundoApellido.toLowerCase().includes(buscadorUsuario.toLowerCase()))

        listaClientes = data.filter((usuario) => (usuario.roles.includes("cliente")) && (usuario.nombre.toLowerCase().includes(buscadorUsuario.toLowerCase()) | usuario.primerApellido.toLowerCase().includes(buscadorUsuario.toLowerCase()) | usuario.segundoApellido.toLowerCase().includes(buscadorUsuario.toLowerCase())))

        listaStaff = data.filter((usuario) => usuario.roles.includes("staff") && (usuario.nombre.toLowerCase().includes(buscadorUsuario.toLowerCase()) | usuario.primerApellido.toLowerCase().includes(buscadorUsuario.toLowerCase()) | usuario.segundoApellido.toLowerCase().includes(buscadorUsuario.toLowerCase())))
    }


    return (
        <>

            <div className="row mt-3 justify-content-end">
                <div className='col-6'>
                    <div className="input-group">
                        <input value={buscadorUsuario} onChange={(e) => handlerBuscadorUsuario(e)} className='form-control' placeholder='Buscar' type="search" name="buscadorUsuario" />
                        <span className='input-group-text'><BiSearch size="2em" /></span>
                    </div>
                </div>
            </div>


            <div className=" mt-3 d-flex justify-content-end">

                <div className="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                    <button type="button" className="btn btn-outline-primary" onClick={() => setTipoUsuario("todo")} > <strong>Todos</strong></button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => setTipoUsuario("cliente")} > <strong>Staff</strong></button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => setTipoUsuario("staff")} > <strong>Clientes</strong></button>
                </div>

            </div>



            <div className="overflow-y-auto" style={{ height: "500px" }} >
                <table id="datosLeccion" className='table table-hover mt-4'>
                    <thead style={{ backgroundColor: "#274A93", color: "white" }}>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Genero</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Roles</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody className='table-group-divider' >
                        {

                            data.length == 0 ?

                                (<tr><td colSpan='8' ><h2 className="text-center" ><strong>No hay usuarios registrados</strong></h2></td></tr>)
                                :
                                tipoUsuario == "todo" ?
                                    listaUsuarios.map((usuario) => {
                                        return (<A_Registro_Usuario usuario={usuario} key={usuario.idUsuario} />)
                                    })
                                    :
                                    tipoUsuario == "cliente" ?
                                        listaClientes.map((usuario) => {
                                            return (<A_Registro_Usuario usuario={usuario} key={usuario.idUsuario} />)
                                        })
                                        :
                                        listaStaff.map((usuario) => {
                                            return (<A_Registro_Usuario usuario={usuario} key={usuario.idUsuario} />)
                                        })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default A_Tabla_Usuarios