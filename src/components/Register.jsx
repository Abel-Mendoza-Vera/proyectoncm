import React from "react";

const Register = () => {

  return (
    <section class="h-100 bg-dark">
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
                          <input type="text" name='nombre' class="form-control" placeholder=""/>
                          <label htmlFor="nombre">Nombre</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                      <input type="text" name='apellidoPaterno' class="form-control" placeholder=""/>
                          <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                        <input type="text" name='apellidoMaterno' class="form-control" placeholder=""/>
                          <label htmlFor="apellidoMaterno">Apellido Materno</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <select name="ultimoGradoEstudio" id="ultimoGradoEstudio" className="form-select">
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
                      <input type="date" name="fechaNac" id="fechaNac" className="form-control" />
                      <label>Fecha de nacimiento</label>
                    </div>

                    <div class="col-md-6 mb-4">
                        <select name="genero" id="genero" className="form-select">
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
                      <input type="text" name='curp' class="form-control" placeholder=""/>
                          <label htmlFor="curp">Curp</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                      <input type="number" name='telefono' class="form-control" placeholder=""/>
                      <label htmlFor="telefono">Teléfono</label>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12 mb-4">
                    <div className="form-floating mb-3">
                      <input type="text" name='imagen' class="form-control" placeholder=""/>
                      <label htmlFor="imagen">Imagen</label>
                        </div>
                      </div>

                      <div class="row">
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                      <input type="email" name='correo' class="form-control" placeholder=""/>
                      <label htmlFor="correo">Correo</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                      <div className="form-floating mb-3">
                      <input type="password" name='contraseña' class="form-control" placeholder=""/>
                      <label htmlFor="contraseña">Contraseña</label>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex justify-content-end pt-3">
                      <button type="button" class="btn btn-warning btn-lg ms-2">Registrarse</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Register