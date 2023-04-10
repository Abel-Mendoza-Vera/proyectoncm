import { useEffect, useState } from 'react'
import { MdEmail, MdPassword } from 'react-icons/all'
import { FaUserCircle } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'

import { useAccesoStore } from '../../store/accesoStore'

const U_Login = () => {

  const navigate = useNavigate();

  const { acceso, login} = useAccesoStore(state => ({
    acceso: state.acceso,
    login: state.login
  }), shallow)

  useEffect(() => {
    if(acceso) {
      navigate("/")
    }
  }, [acceso])
  

  const [formularioIniciarSesion, setFormularioIniciarSesion] = useState({
    correo: "",
    contrasenia: ""
  })

  const { correo, contrasenia } = formularioIniciarSesion;

  const handlerChangeFormIniciarSesion = (e) => {

    setFormularioIniciarSesion({
      ...formularioIniciarSesion,
      [e.target.name]: e.target.value
    })

  }

  const submitHandler = async (e) => {

    e.preventDefault();
    try {
      const result = await login(correo, contrasenia)

      const { acceso } = result.data

      Swal.fire({
        title: "Iniciar sesión",
        text: "Usuario autenticado",
        icon: "success",
        timer: 1500,
        timerProgressBar: true
      })

      navigate("/perfil");

    } catch (error) {

      if(error.response.status == 401){
        return Swal.fire({
          title: "Iniciar sesión",
          text: "El correo o contraseña son incorrectos.",
          icon: "error",
        })  
      }

      Swal.fire({
        title: "Iniciar sesión",
        text: error.response.data.mensaje,
        icon: "error",
        
      })
    }


  }

  return (
    <>
      <div className="container-fluid w-100 h-100 my-5">
        <div id="FormularioLogin" className="row d-flex justify-content-center">

          <div className="col-5 border p-5 rounded bg-primary bg-opacity-25">

            <div className="row">

              <div className="text-center">

                <FaUserCircle size="3em" />
                <h3 className='display-6'><strong>Iniciar Sesión</strong></h3>
                <p className='mb-5 text-center'>Nos da gusto verte de nuevo</p>
              </div>

              <form onSubmit={submitHandler}>

                <div className="input-group mb-3">
                  <span className='input-group-text'><MdEmail size="2em" /></span>
                  <div className="form-floating">
                    <input name='correo' onChange={handlerChangeFormIniciarSesion} value={correo} type="email" className="form-control" placeholder="" required />
                    <label className='text-dark'>Correo</label>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <span className='input-group-text'><MdPassword size="2em" /></span>
                  <div className="form-floating">
                    <input name='contrasenia' onChange={handlerChangeFormIniciarSesion} value={contrasenia} type="password" className="form-control" placeholder="" required />
                    <label className='text-dark'>Contraseña</label>
                  </div>
                </div>


                <div className="row mt-4">
                  <button className='btn btn-primary' type="submit">Iniciar sesión</button>
                </div>

              </form>
            </div>

            <div className="row my-3 text-center">
              <p>¿ No tienes una cuenta ?, no te preocupes.</p>
              <Link to="/registrar">Registrate ahora!</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default U_Login