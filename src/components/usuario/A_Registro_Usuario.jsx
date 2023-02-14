import { BsToggleOn, BsToggleOff } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

import { useAccesoStore } from '../../store/accesoStore';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cambiarEstatusUsuario } from '../../hooks/useUsuario';

const A_Registro_Usuario = ({ usuario }) => {

    const token = useAccesoStore((state) => state.token)

    const queryClient = useQueryClient();
    const useCambiarEstatusUsuario = useMutation({
        mutationFn: cambiarEstatusUsuario,
        onSuccess: () => {
            Swal.fire({
                title: "Eliminar usuario", text: "Se ha cambiado el estatus del usuario correctamente", icon: "success", timer: 1500, timerProgressBar: true
            })
            queryClient.invalidateQueries("getUsuarios")
        },
        onError: () => { Swal.fire({ title: "Eliminar usuario", text: "No se ha cambiado el estatus del usuario correctamente", icon: "error", timer: 1500, timerProgressBar: true }) }
    })

    const handlerCambiarEstatusUsuario = async () => {
        const id = usuario.idUsuario
        useCambiarEstatusUsuario.mutate({token, id})
    }

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
                <button onClick={handlerCambiarEstatusUsuario} className="btn btn-danger btn-sm"><AiFillDelete /></button>
            </td>
        </tr>
    )
}

export default A_Registro_Usuario