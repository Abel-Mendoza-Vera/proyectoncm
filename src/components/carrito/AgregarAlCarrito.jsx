import { BsCartPlusFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useAccesoStore } from "../../store/accesoStore"
import { useObtenerCursosCliente } from '../../hooks/useCurso'
import { useCarritoStore } from '../../store/carritoStore'
import Cargando from '../../pages/Cargando'

const AgregarAlCarrito = ({ small = false, blanco = false, idCurso }) => {

  const navigate = useNavigate()
  const { acceso, usuario, token } = useAccesoStore((state) => ({
    acceso: state.acceso,
    usuario: state.usuario,
    token: state.token
  }))

  const { carrito, agregarAlCarrito } = useCarritoStore((state) => ({
    carrito: state.carrito,
    agregarAlCarrito: state.agregarAlCarrito
  }))

  const { data: cursos, isLoading: isLoadingCursos } = useObtenerCursosCliente(token, usuario.idUsuario)

  if (isLoadingCursos) return < Cargando />

  const handleAgregar = () => {
    if (!acceso) {
      return navigate("/iniciar_sesion")
    }

    if (!usuario.roles.includes("cliente")) {
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

    let carritoCliente = carrito.find((c) => c.idUsuario == usuario.idUsuario)

    if (!carritoCliente) {
      agregarAlCarrito(idCurso, usuario.idUsuario)
      return Swal.fire({
        title: "Agregar al carrito",
        text: "El curso se ha agregado al carrito de compras",
        icon: "success",
        //iconColor: "",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      })
    }

    if (carritoCliente.cursos.includes(idCurso)) {
      return Swal.fire({
        title: "Agregar al carrito",
        text: "El curso ya se encuentra en el carrito de compras",
        icon: "success",
        //iconColor: "",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      })
    }

    let seguir = true;

    for (let i = 0; i < cursos.length; i++) {

      let curso = cursos[i]
      if (curso.idCurso == idCurso) {
        seguir = false
        return Swal.fire({
          title: "Agregar al carrito",
          text: "El curso ya ha sido comprado",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        })
      }

    }

    if (seguir) {
      agregarAlCarrito(idCurso, usuario.idUsuario)
      return Swal.fire({
        title: "Agregar al carrito",
        text: "El curso se ha agregado al carrito de compras",
        icon: "success",
        //iconColor: "",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      })
    }
  }

  return small ?
    <button onClick={handleAgregar} className={blanco ? 'btn btn-light btn-sm' : 'btn btn-primary btn-sm'} ><BsCartPlusFill /> Agregar al carrito</button>
    :
    <button onClick={handleAgregar} className={blanco ? 'btn btn-light' : 'btn btn-primary'} ><BsCartPlusFill size="1.5rem" /> Agregar al carrito</button>
}

export default AgregarAlCarrito