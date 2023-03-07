import { useAccesoStore } from "../../store/accesoStore"
import Swal from "sweetalert2"
import { useObtenerCursos } from "../../hooks/useCurso"
import { cambiarEstatusCompra } from "../../hooks/useCompraAdmin" 
import { useQueryClient, useMutation } from "@tanstack/react-query"

const ItemTablaCompra = ({ compra, cliente }) => {

    const queryClient = useQueryClient();

    const { token, usuario } = useAccesoStore((state) => ({
        token: state.token,
        usuario: state.usuario
    }))

    const marcarPagado = (compraId) => {
        let datos = {
            idCompra: compraId,
            estatus: 1
        }
        useCambiarEstatusCompra.mutate({ token, datos })
    }

    const useCambiarEstatusCompra = useMutation({
        mutationFn: cambiarEstatusCompra,
        onSuccess: () => {
            Swal.fire({
                title: "Marcar pagado", text: "La compra se marcado como pagado correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getComprasA")
        },
        onError: () => { Swal.fire({ title: "Marcar pagado", text: "La compra no se marcado como pagado correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const { data: cursos, isLoading } = useObtenerCursos()

    if( isLoading ) return <tr> <td colSpan="7" className="text-center" >Cargando datos ...</td> </tr>

    return (
        <tr>
            <td>{compra.idCompra}</td>
            <td>NC{compra.idCliente}</td>
            <td>{cliente.nombre} {cliente.primerApellido} {cliente.segundoApellido}</td>
            <td>{compra.fechaCompra}</td>
            <td>$ {compra.totalCompra} MXN</td>
            {
                compra.estatus == 0 ?
                    <td className="text-danger"><strong>Pago pendiente</strong></td>
                    :
                    <td className="text-success"><strong>Pagado</strong></td>
            }

            <td>
                <div className="btn-group" role="group">

                    {
                        compra.estatus == 0 ?
                        <button className="btn btn-outline-primary btn-sm" onClick={() => marcarPagado(compra.idCompra)} >Marcar pagado</button>
                        :
                        <></>
                    }

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
                    {
                        compra.estatus == 0 ?
                            <button className="btn btn-outline-primary btn-sm" disabled >Enviar codigos de autorización</button>
                            :
                            <button className="btn btn-outline-primary btn-sm"  >Enviar codigos de autorización</button>
                    }

                </div>

            </td>
        </tr>
    )
}

export default ItemTablaCompra