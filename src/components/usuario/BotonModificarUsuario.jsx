import { useState } from "react"
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai"
import Swal from "sweetalert2"

import { useAccesoStore } from '../../store/accesoStore';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modificarUsuario } from '../../hooks/useUsuario';
import { validarUsuario } from "../../lib/validarUsuario";

const BotonModificarUsuario = ({id, usuario}) => {

    const token = useAccesoStore((state) => state.token)
    const queryClient = useQueryClient()

    const useModificarUsuario = useMutation({
        mutationFn: modificarUsuario,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar usuario", text: "El usuario se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getUsuarios")
        },
        onError: () => { Swal.fire({ title: "Guardar usuario", text: "El usuario no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const [formularioUsuario, setFormularioUsuario] = useState({
        nombre: usuario.nombre,
        primerApellido: usuario.primerApellido,
        segundoApellido: usuario.segundoApellido,
        fechaNac: usuario.fechaNac,
        curp: usuario.curp,
        correo: usuario.correo,
        contrasenia: "",
        ultimoGradoEstudio: usuario.ultimoGradoEstudio,
        genero: usuario.genero,
        telefono: usuario.telefono
    })

    const { nombre, primerApellido, segundoApellido, fechaNac, curp, correo, contrasenia, ultimoGradoEstudio, genero, telefono, roles } = formularioUsuario

    const handlerChangeFormUsuario = (e) => {
        setFormularioUsuario({
            ...formularioUsuario,
            [e.target.name]: e.target.value
        })
    }

    const limpiar = () => {
        let btnCancelarUsuario = document.getElementById("btnCancelarUsuarioM");
        btnCancelarUsuario.click();
    }

    const handlerSubmitFormUsuario = async (e) => {
        e.preventDefault();
        
        const { pasaValidacion, mensaje } = validarUsuario(formularioUsuario)

        if(pasaValidacion){
            useModificarUsuario.mutate({ token, id, usuario: formularioUsuario })
        }
        else{
            Swal.fire({
              title: "Guardar usuario",
              text: mensaje,
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
              icon: "warning",
              iconColor: "orange"
            })
          }

        
    }


    return (
        <>
            
            {/** Botón (Modal) para agregar un nuevo usuario */}
                <button className="btn btn-primary btn-sm me-2"data-bs-toggle="modal" data-bs-target={`#admin_usuarioModal${id}`}><AiFillEdit/></button>

            {/** Modal para agregar un usuario */}
            <div className="modal fade" id={`admin_usuarioModal${id}`} tabIndex="-1" aria-labelledby={`admin_usuarioModalLabel${id}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`admin_usuarioModalLabel${id}`}>Guardar usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <small>Los campos que tengan un * son obligatorios</small>
                            <form id={`modificarUsuarioForm${id}`} onSubmit={handlerSubmitFormUsuario} >
                                <div className="form-floating mb-3">
                                    <input name="nombre" value={nombre} onChange={(e) => handlerChangeFormUsuario(e)} type="text" className="form-control" placeholder="" required />
                                    <label>Nombre *</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="primerApellido" value={primerApellido} onChange={(e) => handlerChangeFormUsuario(e)} type="text" className="form-control" placeholder="" required />
                                    <label>Primer apellido *</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="segundoApellido" value={segundoApellido ? segundoApellido : ""} onChange={(e) => handlerChangeFormUsuario(e)} type="text" className="form-control" placeholder="" />
                                    <label>Segundo apellido</label>
                                </div>

                                <div className="mb-3">
                                    <label>Ultimo grado de estudios *</label>
                                    <select name="ultimoGradoEstudio" value={ultimoGradoEstudio} onChange={(e) => handlerChangeFormUsuario(e)} id={`ultimoGradoEstudio${id}`} className="form-select">
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
                                    <input type="date" value={fechaNac} onChange={(e) => handlerChangeFormUsuario(e)} name="fechaNac" id={`fechaNac${id}`} className="form-control" />
                                    <label>Fecha de nacimiento *</label>
                                </div>

                                <div className="mb-3">
                                    <label>Genero *</label>
                                    <select name="genero" value={genero} onChange={(e) => handlerChangeFormUsuario(e)} id={`genero${id}`} className="form-select">
                                        <option value="">Selecciona una de las opciones</option>
                                        <option value="Hombre">Hombre</option>
                                        <option value="Mujer">Mujer</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="telefono" value={telefono} onChange={(e) => handlerChangeFormUsuario(e)} type="tel" className="form-control" placeholder="" required />
                                    <label>Telefono *</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="correo" value={correo} onChange={(e) => handlerChangeFormUsuario(e)} type="email" className="form-control" placeholder="" required />
                                    <label>Correo *</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="contrasenia" value={contrasenia} onChange={(e) => handlerChangeFormUsuario(e)} type="password" className="form-control" placeholder="" />
                                    <label>Contraseña</label>
                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-danger" id={`btnCancelarUsuarioM${id}`} data-bs-dismiss="modal" form={`modificarUsuarioForm${id}`} >Cancelar</button>
                            <button type="submit" id={`btnGuardarUsuarioM${id}`} form={`modificarUsuarioForm${id}`} className="btn btn-success">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BotonModificarUsuario