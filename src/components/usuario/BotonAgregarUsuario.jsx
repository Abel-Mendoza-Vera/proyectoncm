import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import Swal from "sweetalert2"

import { useAccesoStore } from '../../store/accesoStore';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearUsuario } from '../../hooks/useUsuario';

const BotonAgregarUsuario = () => {

    const token = useAccesoStore((state) => state.token)
    const queryClient = useQueryClient()
    const useCrearUsuario = useMutation({
        mutationFn: crearUsuario,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar usuario", text: "El usuario se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getUsuarios")
            limpiar();
        },
        onError: () => { Swal.fire({ title: "Guardar usuario", text: "El usuario no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const [formularioUsuario, setFormularioUsuario] = useState({
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        fechaNac: "",
        curp: "",
        correo: "",
        contrasenia: "",
        ultimoGradoEstudio: "",
        genero: "",
        telefono: "",
        roles: []
    })

    const { nombre, primerApellido, segundoApellido, fechaNac, curp, correo, contrasenia, ultimoGradoEstudio, genero, telefono, roles } = formularioUsuario

    const handlerChangeFormUsuario = (e) => {
        setFormularioUsuario({
            ...formularioUsuario,
            [e.target.name]: e.target.value
        })
    }

    const handlerRolesUsuario = () => {
        let isCheckedCliente = document.getElementById('cliente').checked;
        let isCheckedEmpleado = document.getElementById('empleado').checked;
        let isCheckedAdministrador = document.getElementById('administrador').checked;

        let arregloRoles = []

        if (isCheckedCliente && !arregloRoles.includes("cliente")) {
            arregloRoles.push("cliente")
        }
        if (!isCheckedCliente && arregloRoles.includes("cliente")) {
            arregloRoles = arregloRoles.filter((rol) => rol != "cliente")
        }


        if (isCheckedEmpleado && !arregloRoles.includes("empleado")) {
            arregloRoles.push("empleado")
        }
        if (!isCheckedEmpleado && arregloRoles.includes("empleado")) {
            arregloRoles = arregloRoles.filter((rol) => rol != "empleado")
        }

        if (isCheckedAdministrador && !arregloRoles.includes("administrador")) {
            arregloRoles.push("administrador")
        }
        if (!isCheckedAdministrador && arregloRoles.includes("administrador")) {
            arregloRoles = arregloRoles.filter((rol) => rol != "administrador")
        }

        setFormularioUsuario({
            ...formularioUsuario,
            roles: arregloRoles
        })
    }

    const limpiar = () => {


        setFormularioUsuario({
            ...formularioUsuario,
            nombre: "",
            primerApellido: "",
            segundoApellido: "",
            fechaNac: "",
            curp: "",
            correo: "",
            contrasenia: "",
            ultimoGradoEstudio: "",
            genero: "",
            telefono: "",
            roles: []
        })

        let btnCancelarUsuario = document.getElementById("btnCancelarUsuario");
        btnCancelarUsuario.click();
    }

    const handlerSubmitFormUsuario = async (e) => {
        e.preventDefault();
        handlerRolesUsuario();

        if (roles.length == 0) return Swal.fire({ title: "Guardar usuario", text: "Es necesario seleccionar por lo menos 1 tipo de rol para el usuario", icon: "warning" });

        const usuario = formularioUsuario
        useCrearUsuario.mutate({ token, usuario })
    }


    return (
        <>
            {/** Botón (Modal) para agregar un nuevo usuario */}
            <div className="my-5">
                <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#admin_usuarioModal"><span><AiOutlinePlus /></span>Agregar usuario</button>
            </div>

            {/** Modal para agregar un usuario */}
            <div className="modal fade" id="admin_usuarioModal" tabIndex="-1" aria-labelledby="admin_usuarioModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="admin_usuarioModalLabel">Guardar usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form id="agregarUsuarioForm" onSubmit={handlerSubmitFormUsuario} >
                                <div className="form-floating mb-3">
                                    <input name="nombre" value={nombre} onChange={(e) => handlerChangeFormUsuario(e)} type="text" className="form-control" placeholder="" required />
                                    <label>Nombre</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="primerApellido" value={primerApellido} onChange={(e) => handlerChangeFormUsuario(e)} type="text" className="form-control" placeholder="" required />
                                    <label>Primer apellido</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="segundoApellido" value={segundoApellido} onChange={(e) => handlerChangeFormUsuario(e)} type="text" className="form-control" placeholder="" />
                                    <label>Segundo apellido</label>
                                </div>

                                <div className="mb-3">
                                    <label>Ultimo grado de estudios</label>
                                    <select name="ultimoGradoEstudio" value={ultimoGradoEstudio} onChange={(e) => handlerChangeFormUsuario(e)} id="ultimoGradoEstudio" className="form-select">
                                        <option value="">Selecciona una de las opciones</option>
                                        <option value="Preescolar">Preescolar</option>
                                        <option value="Primaria">Primaria</option>
                                        <option value="Secundaria">Secundaria</option>
                                        <option value="Tecnólogo">Tecnólogo</option>
                                        <option value="Bachillerato General">Bachillerato General</option>
                                        <option value="Bachillerato Tecnológico">Bachillerato Tecnológico</option>
                                        <option value="Profesional Técnico">Profesional Técnico</option>
                                        <option value="Técnico Superior Universitario">Técnico Superior Universitario</option>
                                        <option value="Licenciatura">Licenciatura</option>
                                        <option value="Especialización">Especialización</option>
                                        <option value="Maestría">Maestría</option>
                                        <option value="Doctorado">Doctorado</option>
                                    </select>

                                </div>

                                <div className="form-floating mb-3">
                                    <input name="curp" value={curp} onChange={(e) => handlerChangeFormUsuario(e)} type="text" className="form-control" placeholder="" />
                                    <label>CURP</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="date" onChange={(e) => handlerChangeFormUsuario(e)} name="fechaNac" id="fechaNac" className="form-control" />
                                    <label>Fecha de nacimiento</label>
                                </div>

                                <div className="mb-3">
                                    <label>Genero</label>
                                    <select name="genero" value={genero} onChange={(e) => handlerChangeFormUsuario(e)} id="genero" className="form-select">
                                        <option value="">Selecciona una de las opciones</option>
                                        <option value="Hombre">Hombre</option>
                                        <option value="Mujer">Mujer</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="telefono" value={telefono} onChange={(e) => handlerChangeFormUsuario(e)} type="tel" className="form-control" placeholder="" required />
                                    <label>Telefono</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="correo" value={correo} onChange={(e) => handlerChangeFormUsuario(e)} type="email" className="form-control" placeholder="" required />
                                    <label>Correo</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="contrasenia" value={contrasenia} onChange={(e) => handlerChangeFormUsuario(e)} type="password" className="form-control" placeholder="" required />
                                    <label>Contraseña</label>
                                </div>

                                <div className="mb-3">
                                    <label>Roles</label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="cliente" id="cliente" />
                                        <label className="form-check-label">Cliente</label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="empleado" id="empleado" />
                                        <label className="form-check-label">Empleado</label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="administrador" id="administrador" />
                                        <label className="form-check-label">Administrador</label>
                                    </div>
                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-danger" id="btnCancelarUsuario" data-bs-dismiss="modal" form="agregarUsuarioForm" >Cancelar</button>
                            <button type="submit" id="btnGuardarUsuario" form="agregarUsuarioForm" className="btn btn-success">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BotonAgregarUsuario