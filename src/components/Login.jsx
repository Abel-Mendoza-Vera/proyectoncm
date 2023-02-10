import React from "react";
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  const Registrarse = () => {
    navigate(`/registrar`)
  }

  return (

    <div class="col d-flex justify-content-center">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <form>
                <div>
                  <h3 className="text-center">Iniciar Sesión</h3>
                </div> <br />
                <div class="form-outline mb-4">
                  <input type="email" id="form2Example1" class="form-control" />
                  <label class="form-label" for="form2Example1">Correo</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form2Example2" class="form-control" />
                  <label class="form-label" for="form2Example2">Contraseña</label>
                </div>

                <div class="row mb-4">
                  <div class="col d-flex justify-content-center">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                      <label class="form-check-label" for="form2Example31"> Recuerdame </label>
                    </div>
                  </div>

                  <div class="col">
                    <a href="#!">Olvide la Contraseña</a>
                  </div>
                </div>
                <div className="text-center">
                  <button type="button" class="btn btn-primary btn-block mb-4">Iniciar Sesión</button>
                </div>
                <div class="text-center">
                  <p>No estás registrado? <a onClick={Registrarse} className="text-primary">Registrarse</a></p>

                </div>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>


  )
}

export default Login