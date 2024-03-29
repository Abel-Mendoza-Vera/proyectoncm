import { useState } from "react"
import Swal from "sweetalert2"
import { FaUserCircle } from 'react-icons/fa'
import { MdEmail, MdPassword,MdPhone,MdOutlinePermIdentity } from 'react-icons/all'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registrarCliente } from "../hooks/useAcceso"
import { validarUsuario } from "../lib/validarUsuario";

const Register = () => {

  const queryClient = useQueryClient()
  const useRegistrarUsuario = useMutation({
    mutationFn: registrarCliente,
    onSuccess: () => {
      Swal.fire({
        title: "Registrar Usuario", text: "El usuario se ha registrado correctamente", icon: "success", timer: 1500, timerProgressBar: true
      })
      queryClient.invalidateQueries("getUsuarios")
      limpiar();
    },
    onError: () => { Swal.fire({ title: "Registrar usuario", text: "El usuario no se ha registrado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
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
    imagen: ""
  })

  const { nombre, primerApellido, segundoApellido, fechaNac, curp, correo, contrasenia, ultimoGradoEstudio, genero, telefono, imagen } = formularioUsuario

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
      imagen: ""
    })


  }
  const handlerChangeFormUsuario = (e) => {
    setFormularioUsuario({
      ...formularioUsuario,
      [e.target.name]: e.target.value
    })
  }

  const convertirABase64 = (file) => {
    let render = new FileReader()
    render.readAsDataURL(file)
    render.onload = () => {
      let base64 = render.result
      setFormularioUsuario({
        ...formularioUsuario,
        imagen: base64
      })

    }
  }

  const handlerSubmitFormUsuario = async (e) => {
    e.preventDefault();

    const usuario = formularioUsuario

    const { pasaValidacion, mensaje } = validarUsuario(usuario)

    if(pasaValidacion){
      useRegistrarUsuario.mutate({ usuario })
    }
    else{
      Swal.fire({
        title: "Registrar Usuario",
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
<section className="h-100 h-custom bg-primary bg-opacity-25" >
    <form id="registrarUsuarioForm" onSubmit={handlerSubmitFormUsuario} >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">

              <div className="card-body p-4 p-md-5">

              <div className="text-center">
              <FaUserCircle size="3em" />
                <h3 className="mb-5 text-uppercase text-center">Registrarse</h3>
              </div>
             
                <div className="row">
                

                  <div className="col-md-6 mb-4">
                    <div className="form-floating mb-3">
                      <input type="text" name='nombre' value={nombre} onChange={(e) => handlerChangeFormUsuario(e)} className="form-control" placeholder="" required />
                      <label htmlFor="nombre">Nombre</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-floating mb-3">
                      <input type="text" name='primerApellido' value={primerApellido} onChange={(e) => handlerChangeFormUsuario(e)} className="form-control" placeholder="" required />
                      <label htmlFor="primerApellido">Apellido Paterno</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-floating mb-3">
                      <input type="text" name='segundoApellido' value={segundoApellido} onChange={(e) => handlerChangeFormUsuario(e)} className="form-control" placeholder="" />
                      <label htmlFor="segundoApellido">Apellido Materno</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label>Ultimo Grado de Estudios</label>
                    <select name="ultimoGradoEstudio" id="ultimoGradoEstudio" value={ultimoGradoEstudio} onChange={(e) => handlerChangeFormUsuario(e)} className="form-select">
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
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label>Fecha de nacimiento</label>
                    <input type="date" name="fechaNac" value={fechaNac} onChange={(e) => handlerChangeFormUsuario(e)} id="fechaNac" className="form-control" />

                  </div>

                  <div className="col-md-6 mb-4">
                    <label>Genero</label>
                    <select name="genero" id="genero" value={genero} onChange={(e) => handlerChangeFormUsuario(e)} className="form-select">
                      <option value="">Selecciona una opción</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="row">    
                <div className="input-group mb-3">
                  <span className='input-group-text'><MdOutlinePermIdentity size="2em" /></span>
                  <div className="form-floating">
                  <input type="text" maxLength="18" name='curp' value={curp} onChange={(e) => handlerChangeFormUsuario(e)} className="form-control" placeholder="" />
                    <label className='text-dark'>Curp</label>
                  </div>
                </div>

                  <div className="input-group mb-3">
                  <span className='input-group-text'><MdPhone size="2em" /></span>
                  <div className="form-floating">
                  <input type="number" name='telefono' value={telefono} onChange={(e) => handlerChangeFormUsuario(e)} className="form-control" placeholder="" required />
                    <label className='text-dark'>Teléfono</label>
                  </div>
                </div>
                  

                </div>

                {/** Foto de perfil */}
                <div className="col-md-12 mb-4">
                  <label htmlFor="imagen">Foto de perfil</label>
                  <input type="file" name='imagen' onChange={(e) => convertirABase64(e.target.files[0])} className="form-control" placeholder="" accept="image/*" />
                </div>



                <div className="row">

                <div className="input-group mb-3">
                  <span className='input-group-text'><MdEmail size="2em" /></span>
                  <div className="form-floating">
                    <input name='correo' value={correo} onChange={(e) => handlerChangeFormUsuario(e)}  type="email" className="form-control" placeholder="" required />
                    <label className='text-dark'>Correo</label>
                  </div>
                </div>
                
                <div className="input-group mb-3">
                  <span className='input-group-text'><MdPassword size="2em" /></span>
                  <div className="form-floating">
                  <input type="password" name='contrasenia' value={contrasenia} onChange={(e) => handlerChangeFormUsuario(e)} className="form-control" placeholder="" required />
                    <label className='text-dark'>Contraseña</label>
                  </div>
                </div>
                
                  

                </div>


                <div className="d-flex justify-content-end pt-3">
                  <button type="submit" id="btnGuardarUsuario" form="registrarUsuarioForm" className="btn btn-success btn-lg ms-2">Registrarse</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </section>

  )
}

export default Register