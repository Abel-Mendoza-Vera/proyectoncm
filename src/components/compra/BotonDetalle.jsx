import { useObtenerCursos } from "../../hooks/useCurso"
import { useAccesoStore } from "../../store/accesoStore"

const BotonDetalle = ({ compra, cliente }) => {

    const { usuario } = useAccesoStore((state) => ({
        usuario: state.usuario
    }))

    const { data: cursos, isLoading } = useObtenerCursos()

    if (isLoading) return <button className="btn btn-outline-primary btn-sm" disabled ><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Detalles</button>

    return (
        <>
            {
                usuario.roles.includes("administrador") ?
                    <>
                        <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#detalleModal${compra.idCompra}`}>Detalles</button>

                        <div className="modal fade" id={`detalleModal${compra.idCompra}`} tabIndex="-1" aria-labelledby={`detalleModalLabel${compra.idCompra}`} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id={`detalleModalLabel${compra.idCompra}`}>Detalle de la compra</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">

                                        <div className="row">
                                            <div className="col"><p><strong>Folio:</strong> {compra.idCompra}</p></div>
                                            <div className="col"><p><strong>Fecha:</strong> {compra.fechaCompra}</p></div>
                                        </div>

                                        <div className="mt-2">
                                            <p><strong>Número de cuenta:</strong> NC{compra.idCliente}</p>
                                            <p><strong>Cliente:</strong> {cliente.nombre} {cliente.primerApellido} {cliente.segundoApellido}</p>
                                        </div>

                                        <div className="row">
                                            <div className="col"><p><strong>Total:</strong> $ {compra.totalCompra} MXN</p></div>
                                            <div className="col"><p><strong>Estatus:</strong> {compra.estatus == 0 ? "Pago pendiente" : "Pagado"}</p></div>
                                        </div>

                                        <div className="overflow-y-auto" style={{ height: "250px" }} >
                                            <table id="datosDetalleCompra" className='table table-hover mt-4'>
                                                <thead style={{ backgroundColor: "#274A93", color: "white" }}>
                                                    <tr>
                                                        <th>Curso</th>
                                                        <th>Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='table-group-divider'>
                                                    {
                                                        compra.detalleCompra.length != 0 ?
                                                            compra.detalleCompra.map((dc) => {
                                                                let cursoDetalle = cursos.find((lc) => lc.idCurso == dc.idCurso)
                                                                return <tr key={dc.idDetalleCompra}>
                                                                    <td>{cursoDetalle.nombre}</td>
                                                                    <td>$ {dc.subtotal} MXN</td>
                                                                </tr>
                                                            })
                                                            :
                                                            <></>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <></>
            }
        </>
    )
}

export default BotonDetalle