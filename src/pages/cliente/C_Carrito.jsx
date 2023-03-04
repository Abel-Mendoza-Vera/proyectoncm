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

const C_Carrito = () => {

    const { usuario } = useAccesoStore((state) => ({
        usuario: state.usuario
    }))

    const { carrito, quitarDelCarrito, limpiarCarrito } = useCarritoStore((state) => ({
        carrito: state.carrito,
        quitarDelCarrito: state.quitarDelCarrito,
        limpiarCarrito: state.limpiarCarrito
    }), shallow)

    const { data: cursos, isLoading: isLoadingCursos } = useObtenerCursos()
    const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos();

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
        console.log("Pagando");

        let objCursos = []
        
        for (let i = 0; i < cursos.length; i++){
            let c = cursos[i]
            if(carritoCliente.cursos.includes(c.idCurso)){
                objCursos.push({ idCurso: c.idCurso, precio: c.precio })
            }
        }

        let datos = {
            idCliente: usuario.idUsuario,
            totalCompra: total,
            cursos: objCursos
        }

        console.log(datos);

        limpiarCarrito(usuario.idUsuario)
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
                                                <img src={ !miniatura ? imgDefault : miniatura.url } className="img-fluid img-thumbnail rounded" alt="curso" />
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
                            <button onClick={handlePagar} className="btn btn-primary" >Pagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default C_Carrito