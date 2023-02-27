import { useCarritoStore } from "../../store/carritoStore"
import imgDefault from "../../assets/curso.jpg"
import { MdDelete } from 'react-icons/md'

const C_Carrito = () => {

    const { carrito, quitarDelCarrito } = useCarritoStore((state) => ({
        carrito: state.carrito,
        quitarDelCarrito: state.quitarDelCarrito
    }))

    return (
        <div className="container-fluid mt-5">

            <h3 className="text-center display-3 mb-5">Carrito de compras</h3>

            <div className="row mx-5">
                <div className="col-8">

                    { /**Card */}
                    <div className="border  rounded mb-3">
                        <div className="row">
                            <div className="col-4">
                                <img src={imgDefault} className="img-fluid rounded" alt="curso" />
                            </div>
                            <div className="col-8">
                                <div style={{ height: "100%", padding: "6%" }}>
                                    <div className="col-auto">
                                        <div className="row">
                                            <div className="col-8">
                                                <h4>Curso: Liderazgo</h4>
                                            </div>
                                            <div className="col-auto">
                                                <h5>Precio: $ 1523.00 MXN</h5>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-danger"><MdDelete size="1.5rem" /> Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                
                <div className="col-4 ">
                    <div className="card sticky-top">
                        <div className="card-header"><h5 className="card-title">Por pagar</h5></div>
                        <div className="card-body">
                            <p className="card-text">La suma total del pago es de:</p>
                            <h4 className="card-title text-center">$ 4569.00 MXN</h4>
                        </div>
                        <div className="card-footer d-flex justify-content-end">
                            <button className="btn btn-primary" >Pagar ahora</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default C_Carrito