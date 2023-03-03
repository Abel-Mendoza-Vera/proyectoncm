import '../../components/profile.css'
import Swal from "sweetalert2"

import { useNavigate } from 'react-router-dom'
import { useAccesoStore } from '../../store/accesoStore'
import { usePerfil } from '../../hooks/useAcceso'
import { useEffect } from 'react';

import { modificarCliente } from '../../hooks/useAcceso';
import { useState } from "react"
import { useMutation,useQueryClient } from "@tanstack/react-query";


const U_Perfil = () => {

    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const { token, saveUser } = useAccesoStore((state) => ({ token: state.token, saveUser: state.saveUser }))
    const { data, isLoading } = usePerfil(token)

    const useModificarCliente = useMutation({
        mutationFn: modificarCliente,
        onSuccess: () => {
            Swal.fire({
                title: "Guardar usuario", text: "El usuario se ha guardado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getUsuarios")
        },
        onError: () => { Swal.fire({ title: "Guardar usuario", text: "El usuario no se ha guardado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })
    const [formularioUsuario, setFormularioUsuario] = useState({
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        fechaNac: '',
        curp: '',
        correo: '',
        contrasenia: "",
        ultimoGradoEstudio: '',
        genero: '',
        telefono: ''
    })
    useEffect(() => {

        if (!token) {
            navigate("/")
        }
        if (!isLoading) {
            saveUser(data); 
            setFormularioUsuario({
                ...formularioUsuario, nombre: data.nombre,
                primerApellido: data.primerApellido,
                segundoApellido: data.segundoApellido,
                fechaNac: data.fechaNac,
                curp: data.curp,
                correo: data.correo,
                contrasenia: "",
                ultimoGradoEstudio: data.ultimoGradoEstudio,
                genero: data.genero,
                telefono: data.telefono
            })
        
        }

    }, [token, data])

    if (isLoading) return <div>Cargando la información del perfil ...</div>
     
    const { nombre, primerApellido, segundoApellido, fechaNac, curp, correo, contrasenia, ultimoGradoEstudio, genero, telefono } = formularioUsuario

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
        let objUsuario = { ...formularioUsuario, idUsuario: data.idUsuario }
        useModificarCliente.mutate({ token, usuario: objUsuario })
    }



    return (
        <>
            <div>
            <section style={{ backgroundcolor: "eee" }}>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col">
                                <div className='text-center'> <h1>Mi Perfil</h1></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img src="https://cdn-icons-png.flaticon.com/512/6915/6915669.png" alt="avatar"
                                            className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                        <h5 className="my-3">{data.nombre} {data.primerApellido}</h5>
                                        <p className="text-muted mb-1">{data.correo}</p>
                                        <p className="text-muted mb-4">{data.telefono}</p>
                                        <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><span className='material-icons'>edit</span></button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Nombre</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.nombre} {data.primerApellido} {data.segundoApellido}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Correo</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.correo}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Genero</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.genero}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Ultimo Grado de Estudios</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.ultimoGradoEstudio}</p>
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Fecha de Nacimiento</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.fechaNac}</p>
                                            </div>
                                            
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Curp</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.curp}</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">Editar Información</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form id={`modificarUsuarioForm${data.idUsuario}`} onSubmit={handlerSubmitFormUsuario} >

                                                                    <div className="container">
                                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div className="card h-100">
                                                                                <div className="card-body">
                                                                                    <div className="account-settings">
                                                                                        <div className="user-profile">
                                                                                            <div className="user-avatar">
                                                                                                <img src="https://cdn-icons-png.flaticon.com/512/6915/6915669.png" alt="Maxwell Admin" />
                                                                                            </div>
                                                                                            <h5 className="user-name">{data.nombre} {data.primerApellido} {data.segundoApellido}</h5>
                                                                                            <button type="button" id="submit" name="submit" className="btn btn-primary">Cambiar Imagen</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row gutters">
                                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div className="card h-100">
                                                                                    <div className="card-body">
                                                                                        <div className="row gutters">
                                                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                <h6 className="mb-2 text-primary">Información Personal</h6>
                                                                                            </div>
                                                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label htmlFor="nombre">Nombre</label>
                                                                                                    <input value={nombre} onChange={(e) => handlerChangeFormUsuario(e)} type="text" className="form-control" name="nombre" placeholder="" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label htmlFor="primerApellido">Apellido Paterno</label>
                                                                                                    <input value={primerApellido} onChange={(e) => handlerChangeFormUsuario(e)} type="text" className="form-control" name="primerApellido" placeholder="" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label htmlFor="segundoApellido">Apellido Materno</label>
                                                                                                    <input value={segundoApellido ? segundoApellido : ""} onChange={(e) => handlerChangeFormUsuario(e)} type="text" className="form-control" name="segundoApellido" placeholder="" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label htmlFor="segundoApellido">Ultimo Grado de Estudios</label>
                                                                                                    <select name="ultimoGradoEstudio" value={ultimoGradoEstudio} onChange={(e) => handlerChangeFormUsuario(e)} id={`ultimoGradoEstudio${data.idUsuario}`} className="form-select">
                                                                                                        <option value="">Selecciona una opción</option>
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
                                                                                            </div>
                                                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label htmlFor="fechaNac">Fecha de Nacimiento</label>
                                                                                                    <input value={fechaNac} onChange={(e) => handlerChangeFormUsuario(e)} type="date" className="form-control" name="fechaNac" placeholder="" />
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label>Genero</label>
                                                                                                    <select name="genero" value={genero} onChange={(e) => handlerChangeFormUsuario(e)} id={`genero${data.idUsuario}`} className="form-select">
                                                                                                        <option value="">Selecciona una opción</option>
                                                                                                        <option value="Hombre">Hombre</option>
                                                                                                        <option value="Mujer">Mujer</option>
                                                                                                        <option value="Otro">Otro</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="row gutters">

                                                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label htmlFor="curp">Curp</label>
                                                                                                    <input value={curp} onChange={(e) => handlerChangeFormUsuario(e)} type="name" className="form-control" name="curp" placeholder="" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label htmlFor="telefono">Teléfono</label>
                                                                                                    <input value={telefono} onChange={(e) => handlerChangeFormUsuario(e)} type="number" className="form-control" name="telefono" placeholder="" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label htmlFor="correo">Correo</label>
                                                                                                    <input value={correo} onChange={(e) => handlerChangeFormUsuario(e)} type="email" className="form-control" name="correo" placeholder="" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label htmlFor="contrasenia">Contraseña</label>
                                                                                                    <input value={contrasenia} onChange={(e) => handlerChangeFormUsuario(e)} type="password" className="form-control" name="contrasenia" placeholder="" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>

                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="reset" className="btn btn-danger" id={`btnCancelarUsuarioM${data.idUsuario}`} data-bs-dismiss="modal" form={`modificarUsuarioForm${data.idUsuario}`} >Cancelar</button>
                                                                <button type="submit" id={`btnGuardarUsuarioM${data.idUsuario}`} form={`modificarUsuarioForm${data.idUsuario}`} className="btn btn-success">Guardar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
            </div>

        </>
    )
}

export default U_Perfil