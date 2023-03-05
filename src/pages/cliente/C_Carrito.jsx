import { useCarritoStore } from "../../store/carritoStore"
import { useAccesoStore } from "../../store/accesoStore"
import imgDefault from "../../assets/curso.jpg"
import { MdDelete } from 'react-icons/md'
import { Link } from "react-router-dom"
import { shallow } from "zustand/shallow"
import { useObtenerCursos } from "../../hooks/useCurso"
import { useObtenerArchivos } from "../../hooks/useArchivo"
import Cargando from "../Cargando"
import Swal from "sweetalert2"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registrarCompra } from "../../hooks/useCompraCliente"
import { useNavigate } from "react-router-dom"

const C_Carrito = () => {

    const navigate = useNavigate();
    const { usuario, token } = useAccesoStore((state) => ({
        usuario: state.usuario,
        token: state.token
    }))

    const { carrito, quitarDelCarrito } = useCarritoStore((state) => ({
        carrito: state.carrito,
        quitarDelCarrito: state.quitarDelCarrito
    }), shallow)

    const { data: cursos, isLoading: isLoadingCursos } = useObtenerCursos()
    const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos();

    const queryClient = useQueryClient()
    const useRegistrarCompra = useMutation({
        mutationFn: registrarCompra,
        onSuccess: () => {
            Swal.fire({
                title: "Registrar compra", text: "La compra se ha realizado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getComprasC")
            limpiarCarrito(usuario.idUsuario)
            let btnCerrar = document.getElementById("cerrarModal")
            btnCerrar.click()
            navigate("/cliente/mis_cursos")
        },
        onError: () => { Swal.fire({ title: "Registrar compra", text: "La compra no se ha realizado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    let carritoCliente = carrito.find((c) => c.idUsuario == usuario.idUsuario)
    let total = 0

    const handleEliminar = (idCurso) => {
        quitarDelCarrito(idCurso, usuario.idUsuario)
        Swal.fire({
            title: "Quitar curso",
            text: "Se ha quitado correctamente un curso del carrito de compras",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false
        })
    }

    const handlePagar = () => {

        let objCursos = []

        for (let i = 0; i < cursos.length; i++) {
            let c = cursos[i]
            if (carritoCliente.cursos.includes(c.idCurso)) {
                objCursos.push({ idCurso: c.idCurso, precio: c.precio })
            }
        }

        let datos = {
            idCliente: usuario.idUsuario,
            totalCompra: total,
            cursos: objCursos
        }

        useRegistrarCompra.mutate({ token, datos })


    }


    if (isLoadingCursos || isLoadingArchivos) return < Cargando />

    return (
        <div className="container-fluid mt-5">

            <h3 className="text-center display-3 mb-5">Carrito de compras</h3>

            <div className="row mx-5">
                <div className="col-8">

                    { /**Card */}

                    {

                        !carritoCliente || carritoCliente.cursos.length == 0 ?
                            <div className="border rounded text-center mb-3 alert alert-info" role="alert">
                                <h3 className="my-4">No hay cursos agregados al carrito de compras</h3>
                                <p>Consulta nuestros cursos <Link to="/catalogo_cursos">aqui</Link>.</p>
                            </div>
                            :
                            carritoCliente.cursos.map((idCurso) => {

                                let curso = cursos.find((objCurso) => objCurso.idCurso == idCurso)
                                let miniatura = archivos.find((objArchivo) => objArchivo.idArchivo = curso.idMiniatura)
                                total += Number(curso.precio)

                                return (
                                    <div key={curso.idCurso} className="border rounded mb-3">
                                        <div className="row m-3">
                                            <div className="col-4">
                                                <img src={!miniatura ? imgDefault : miniatura.url} className="img-fluid img-thumbnail rounded" alt="curso" />
                                            </div>
                                            <div className="col-8">
                                                <h4>Curso: {curso.nombre}</h4>
                                                <h5>Precio: $ {curso.precio} MXN</h5>

                                                <div className="d-flex justify-content-end">
                                                    <button className="btn btn-danger" onClick={() => handleEliminar(curso.idCurso)} ><MdDelete size="1.5rem" />Eliminar</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )

                            })

                    }

                </div>


                <div className="col-4 ">
                    <div className="card sticky-top">
                        <div className="card-header"><h5 className="card-title">Por pagar</h5></div>
                        <div className="card-body">
                            <p className="card-text">La suma total del pago es de:</p>
                            <h4 className="card-title text-center">$ {total} MXN</h4>
                        </div>
                        <div className="card-footer d-flex justify-content-end">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Hacer pago</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Proceso de Pago</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                <div className="container">
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <div className="row gutters">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <h4 className="mb-2 text-primary text-center">Instrucciones</h4>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                                                            <div>
                                                                <h6 className="mb-2 text-primary">Paso 1</h6>
                                                                <p> Para realizar el pago es necesario realizar una transferencia al siguiente número de cuenta:</p>
                                                                <h6>Número de Cuenta BBVA: 123 456 178 123</h6>
                                                                <p className=" text-success ">El total a pagar es: ${total} MXN</p>
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-2 text-primary">Paso 2</h6>
                                                                <p>Una vez realizado el pago es necesario enviar un correo solicitando los codigos de acceso a el/los cursos que adquiriste adjuntando la foto del comprobante y tu numero de cliente al siguiente correo:</p>


                                                                <a href="mailto:hola@novatec-consultores.com?" target="_blank" className='text-primary'>hola@novatec-consultores.com</a>
                                                            </div><br />
                                                            <div>
                                                                <h6 className="mb-2 text-primary">Paso 3</h6>
                                                                <p>Una vez que se te envien el/los codigos de acceso dirigete a la seccion "Mis cursos" donde podras habilitar el/los cursos.</p>

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
                            <button type="button" id="cerrarModal" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-success" onClick={handlePagar}>Aceptar pago</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}


export default C_Carrito