import { BsToggleOn, BsToggleOff } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const A_Registro_Usuario = ({ usuario }) => {
    return (
        <tr key={usuario.idUsuario}>
            <td>{usuario.idUsuario}</td>
            <td>{usuario.nombre} {usuario.primerApellido} {usuario.segundoApellido}</td>
            <td>{usuario.genero}</td>
            <td>{usuario.telefono}</td>
            <td>{usuario.correo}</td>
            <td>
                {
                    usuario.roles.map((rol) => rol + "\n")
                }
            </td>
            <td className="text-primary" >{usuario.estatus ? <BsToggleOn /> : <BsToggleOff />}</td>
            <td>
                <button className="btn btn-primary btn-sm me-2"><AiFillEdit /></button>
                <button className="btn btn-danger btn-sm"><AiFillDelete /></button>
            </td>
        </tr>
    )
}

export default A_Registro_Usuario