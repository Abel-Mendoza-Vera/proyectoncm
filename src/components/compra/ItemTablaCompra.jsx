import { useAccesoStore } from "../../store/accesoStore"
import Swal from "sweetalert2"

import { cambiarEstatusCompra } from "../../hooks/useCompraAdmin" 
import { useQueryClient, useMutation } from "@tanstack/react-query"
import BotonDetalle from "./BotonDetalle"
import BotonEnviarCodigosAutorizacion from "./BotonEnviarCodigosAutorizacion"

const ItemTablaCompra = ({ compra, cliente }) => {

    const queryClient = useQueryClient();

    const { token } = useAccesoStore((state) => ({
        token: state.token
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

                    <BotonDetalle compra={ compra } cliente={ cliente } />

                    {
                        compra.estatus == 0 ?
                            <button className="btn btn-outline-primary btn-sm" disabled >Enviar codigos de autorización</button>
                            :
                            <BotonEnviarCodigosAutorizacion cliente={cliente} compraId={compra.idCompra} />
                    }

                </div>

            </td>
        </tr>
    )
}

export default ItemTablaCompra