import { useState } from "react"
import Swal from "sweetalert2"
 
import { useAccesoStore } from '../../src/store/accesoStore';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registrarUsuario } from '../../src/hooks/useAcceso';


const Register = () => {

  const token = useAccesoStore((state) => state.token)
  const queryClient = useQueryClient()
  const useRegistrarUsuario = useMutation({
      mutationFn: registrarUsuario,
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

  const handlerChangeFormUsuario = (e) => {
      setFormularioUsuario({
          ...formularioUsuario,
          [e.target.name]: e.target.value
      })
  }
 
   

  const handlerSubmitFormUsuario = async (e) => {
      e.preventDefault();

      const usuario = formularioUsuario
      useRegistrarUsuario.mutate({ token, usuario })
  }



  return (
    <section class="h-100 bg-dark">
      <form id="registrarUsuarioForm" onSubmit={handlerSubmitFormUsuario} >

      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col">
            <div class="card card-registration my-4">
              <div class="row g-0">
                <div class="col-xl-6 d-none d-xl-block">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample photo" class="img-fluid"
                    style={{ bordertopleftradius: ".25rem", borderbottomleftradius: ".25rem" }} />
                </div>
 
                <div class="col-xl-6">
                  <div class="card-body p-md-5 text-black">
                    <h3 class="mb-5 text-uppercase text-center">Registrarse</h3>

                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <div className="form-floating mb-3">
                          <input type="text" name='nombre'value={nombre} onChange={(e) => handlerChangeFormUsuario(e)} class="form-control" placeholder=""/>
                          <label htmlFor="nombre">Nombre</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                      <input type="text" name='primerApellido' value={primerApellido} onChange={(e) => handlerChangeFormUsuario(e)} class="form-control" placeholder=""/>
                          <label htmlFor="primerApellido">Apellido Paterno</label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                        <input type="text" name='segundoApellido' value={segundoApellido} onChange={(e) => handlerChangeFormUsuario(e)} class="form-control" placeholder=""/>
                          <label htmlFor="segundoApellido">Apellido Materno</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <select name="ultimoGradoEstudio" id="ultimoGradoEstudio" value={ultimoGradoEstudio} onChange={(e) => handlerChangeFormUsuario(e)}className="form-select">
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
                        <label>Ultimo Grado de Estudios</label>

                      </div>
                    </div>
                    <div class="row">
                    <div class="col-md-6 mb-4">
                      <input type="date" name="fechaNac" value={fechaNac} onChange={(e) => handlerChangeFormUsuario(e)} id="fechaNac" className="form-control" />
                      <label>Fecha de nacimiento</label>
                    </div>

                    <div class="col-md-6 mb-4">
                        <select name="genero" id="genero" value={genero} onChange={(e) => handlerChangeFormUsuario(e)} className="form-select">
                          <option value="">Selecciona una opción</option>
                          <option value="Hombre">Hombre</option>
                          <option value="Mujer">Mujer</option>
                          <option value="Otro">Otro</option>
                        </select>
                        <label>Genero</label>
                      </div>
                      </div>
                     
                      <div class="row">
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                      <input type="text" name='curp' value={curp} onChange={(e) => handlerChangeFormUsuario(e)} class="form-control" placeholder=""/>
                          <label htmlFor="curp">Curp</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                      <input type="number" name='telefono' value={telefono} onChange={(e) => handlerChangeFormUsuario(e)}class="form-control" placeholder=""/>
                      <label htmlFor="telefono">Teléfono</label>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12 mb-4">
                    <div className="form-floating mb-3">
                      <input type="text" name='imagen'value={imagen} onChange={(e) => handlerChangeFormUsuario(e)} class="form-control" placeholder=""/>
                      <label htmlFor="imagen">Imagen</label>
                        </div>
                      </div>

                      <div class="row">
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                      <input type="email" name='correo' value={correo} onChange={(e) => handlerChangeFormUsuario(e)} class="form-control" placeholder=""/>
                      <label htmlFor="correo">Correo</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                      <input type="password" name='contrasenia' value={contrasenia} onChange={(e) => handlerChangeFormUsuario(e)} class="form-control" placeholder=""/>
                      <label htmlFor="contrasenia">Contraseña</label>
                        </div>
                      </div>
                    
                    </div>
                    

                    <div class="d-flex justify-content-end pt-3">
                      <button type="submit" id="btnGuardarUsuario" form="registrarUsuarioForm" class="btn btn-warning btn-lg ms-2">Registrarse</button>
 
                    </div>

                  </div>
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