import { useState } from "react"
import { BiSearch, BiShow } from "react-icons/bi"
import { AiFillEdit } from "react-icons/ai"

import { useAccesoStore } from "../../store/accesoStore"
import { useObtenerUsuarios } from "../../hooks/useUsuario"
import { useObtenerCompras } from "../../hooks/useCompraAdmin"
import { useObtenerCursos } from "../../hooks/useCurso"
import Cargando from "../Cargando"

const A_Compras = () => {

    const { token, usuario } = useAccesoStore((state) => ({
        token: state.token,
        usuario: state.usuario
    }))

    const { data: usuarios, isLoading: isLoadingUsuarios } = useObtenerUsuarios(token)
    const { data: compras, isLoading: isLoadingCompras } = useObtenerCompras(token)
    const { data: cursos, isLoading: isLoadingCursos } = useObtenerCursos()

    let listaCompra = []

    const [buscadorCompra, setBuscadorCompra] = useState("")
    const handlerBuscadorCompra = (e) => {
        setBuscadorCompra(e.target.value)
    }

    if (isLoadingUsuarios || isLoadingCompras || isLoadingCursos) return <Cargando />

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

                                    return <tr key={c.idCompra}>
                                        <td>{c.idCompra}</td>
                                        <td>NC{c.idCliente}</td>
                                        <td>{u.nombre} {u.primerApellido} {u.segundoApellido}</td>
                                        <td>{c.fechaCompra}</td>
                                        <td>$ {c.totalCompra} MXN</td>
                                        {
                                            c.estatus == 0 ?
                                                <td className="text-danger"><strong>Pago pendiente</strong></td>
                                                :
                                                <td className="text-success"><strong>Pagado</strong></td>
                                        }

                                        <td>
                                            <div className="btn-group" role="group">
                                                <button className="btn btn-outline-primary btn-sm">Marcar pagado</button>
                                                {
                                                    usuario.roles.includes("administrador") ?
                                                        <>
                                                            <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#detalleModal${c.idCompra}`}>Detalles</button>

                                                            <div className="modal fade" id={`detalleModal${c.idCompra}`} tabIndex="-1" aria-labelledby={`detalleModalLabel${c.idCompra}`} aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h1 className="modal-title fs-5" id={`detalleModalLabel${c.idCompra}`}>Detalle de la compra</h1>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">

                                                                            <div className="row">
                                                                                <div className="col"><p><strong>Folio:</strong> {c.idCompra}</p></div>
                                                                                <div className="col"><p><strong>Fecha:</strong> {c.fechaCompra}</p></div>
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <p><strong>Número de cuenta:</strong> NC{c.idCliente}</p>
                                                                                <p><strong>Cliente:</strong> {u.nombre} {u.primerApellido} {u.segundoApellido}</p>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col"><p><strong>Total:</strong> $ {c.totalCompra} MXN</p></div>
                                                                                <div className="col"><p><strong>Estatus:</strong> {c.estatus == 0 ? "Pago pendiente" : "Pagado"}</p></div>
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
                                                                                            c.detalleCompra.length != 0 ?
                                                                                            c.detalleCompra.map((dc) => {
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
                                                    c.estatus == 0 ?
                                                        <button className="btn btn-outline-primary btn-sm" disabled >Enviar codigos de autorización</button>
                                                        :
                                                        <button className="btn btn-outline-primary btn-sm"  >Enviar codigos de autorización</button>
                                                }

                                            </div>

                                        </td>
                                    </tr>
                                })
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default A_Compras