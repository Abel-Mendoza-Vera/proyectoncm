import { BsCartPlusFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useAccesoStore } from "../../store/accesoStore"
import { useCarritoStore } from '../../store/carritoStore'

const AgregarAlCarrito = ({ small = false, blanco = false, idCurso }) => {

  const navigate = useNavigate()
  const { acceso, usuario } = useAccesoStore((state) => ({
    acceso: state.acceso,
    usuario: state.usuario
  }))
  
  const agregarAlCarrito = useCarritoStore((state) => state.agregarAlCarrito)

  const handleAgregar = () => {
    if( !acceso ) {
      navigate("/iniciar_sesion")
    }

    if(!usuario.roles.includes("cliente")){
      Swal.fire({
        title: "Agregar al carrito",
        text: "Esta opción es unica para los clientes",
        icon: "info",
        iconColor: "orange",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      })
    }

    agregarAlCarrito(idCurso, usuario.idUsuario)
    Swal.fire({
      title: "Agregar al carrito",
      text: "El curso se ha agregado al carrito de compras",
      icon: "success",
      //iconColor: "",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    })
  }

  return small ?
    <button onClick={handleAgregar} className={blanco ? 'btn btn-light btn-sm' : 'btn btn-primary btn-sm'} ><BsCartPlusFill /> Agregar al carrito</button>
    :
    <button onClick={handleAgregar} className={blanco ? 'btn btn-light' : 'btn btn-primary'} ><BsCartPlusFill size="1.5rem" /> Agregar al carrito</button>
}

export default AgregarAlCarrito