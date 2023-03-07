import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { useAccesoStore } from "../../store/accesoStore"
import { useObtenerUsuarios } from "../../hooks/useUsuario"
import { useObtenerCompras } from "../../hooks/useCompraAdmin"
import Cargando from "../Cargando"



import ItemTablaCompra from "../../components/compra/ItemTablaCompra"

const A_Compras = () => {

    const { token } = useAccesoStore((state) => ({
        token: state.token
    }))

    const { data: usuarios, isLoading: isLoadingUsuarios } = useObtenerUsuarios(token)
    const { data: compras, isLoading: isLoadingCompras } = useObtenerCompras(token)

    let listaCompra = []

    const [buscadorCompra, setBuscadorCompra] = useState("")
    const handlerBuscadorCompra = (e) => {
        setBuscadorCompra(e.target.value)
    }

    if (isLoadingUsuarios || isLoadingCompras) return <Cargando />

    if (!buscadorCompra) {
        listaCompra = compras
    }
    else {
        listaCompra = compras.filter((c) => `NC${c.idCliente}`.toLowerCase().includes(buscadorCompra.toLowerCase()))
    }

    return (
        <div className="container-fluid">

            {/** Buscador de la compra */}
            <div className="row mt-3 justify-content-end">
                <div className="col-6">
                    <div className="input-group">
                        <input value={buscadorCompra} onChange={(e) => handlerBuscadorCompra(e)} className='form-control' placeholder='Buscar por número de cuenta' type="search" name="buscadorCompra" />
                        <span className='input-group-text'><BiSearch size="2em" /></span>
                    </div>
                </div>
            </div>

            {/** Filtros de las compras */}
            <div className=" mt-3 d-flex justify-content-end">

                <div className="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                    <button type="button" className="btn btn-outline-primary" > <strong>Todo</strong></button>
                    <button type="button" className="btn btn-outline-primary"> <strong>Pago pendiente</strong></button>
                    <button type="button" className="btn btn-outline-primary" > <strong>Pagado</strong></button>
                </div>

            </div>

            {/** Tabla de compras */}
            <div className="overflow-y-auto" style={{ height: "500px" }} >
                <table id="datosCompras" className='table table-hover mt-4'>
                    <thead style={{ backgroundColor: "#274A93", color: "white" }}>
                        <tr>
                            <th>Folio de la compra</th>
                            <th>Núm. cuenta</th>
                            <th>Cliente</th>
                            <th>Fecha de compra</th>
                            <th>Total</th>
                            <th>Estatus de la compra</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody className='table-group-divider' >

                        {
                            listaCompra.length == 0 ?
                                <tr>
                                    <td colSpan="7">
                                        <h3 className="text-center my-3">No se han registrado compras</h3>
                                    </td>
                                </tr>
                                :
                                listaCompra.map((c) => {

                                    

                                    let u = usuarios.find((obj) => obj.idUsuario == c.idCliente)
                                    return <ItemTablaCompra key = { c.idCompra } compra = { c } cliente = { u } />
                                })
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default A_Compras