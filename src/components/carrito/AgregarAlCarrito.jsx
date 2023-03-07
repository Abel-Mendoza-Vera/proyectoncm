import { BsCartPlusFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAccesoStore } from "../../store/accesoStore"
import AgregarAlCarritoCliente from './AgregarAlCarritoCliente'

const AgregarAlCarrito = ({ small = false, blanco = false, idCurso }) => {

  const navigate = useNavigate()
  const { acceso, usuario } = useAccesoStore((state) => ({
    acceso: state.acceso,
    usuario: state.usuario
  }))

  const irLogin = () => {
    return navigate("/iniciar_sesion")
  }

  const alertaNoEsCliente = () => {
    return Swal.fire({
      title: "Agregar al carrito",
      text: "Esta opción es unica para los clientes",
      icon: "info",
      iconColor: "orange",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    })
  }

  return acceso ?

    usuario.roles.includes("cliente") ? 
    <AgregarAlCarritoCliente small = { small } blanco = { blanco } idCurso = { idCurso } />
    :
    small ?
    <button onClick={alertaNoEsCliente} className={blanco ? 'btn btn-light btn-sm' : 'btn btn-primary btn-sm'} ><BsCartPlusFill /> Agregar al carrito</button>
    :
    <button onClick={alertaNoEsCliente} className={blanco ? 'btn btn-light' : 'btn btn-primary'} ><BsCartPlusFill size="1.5rem" /> Agregar al carrito</button>
    :
    small ?
    <button onClick={irLogin} className={blanco ? 'btn btn-light btn-sm' : 'btn btn-primary btn-sm'} ><BsCartPlusFill /> Agregar al carrito</button>
    :
    <button onClick={irLogin} className={blanco ? 'btn btn-light' : 'btn btn-primary'} ><BsCartPlusFill size="1.5rem" /> Agregar al carrito</button>
  
}

export default AgregarAlCarrito