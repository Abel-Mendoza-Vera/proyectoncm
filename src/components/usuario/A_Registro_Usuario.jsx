import { BsToggleOn, BsToggleOff } from 'react-icons/bs'
import { AiFillDelete, AiOutlinePoweroff } from 'react-icons/ai'

import Swal from 'sweetalert2';

import { useAccesoStore } from '../../store/accesoStore';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cambiarEstatusUsuario } from '../../hooks/useUsuario';
import BotonModificarUsuario from './BotonModificarUsuario';

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
                <BotonModificarUsuario id={usuario.idUsuario} usuario={usuario} />
                <button onClick={handlerCambiarEstatusUsuario} className={usuario.estatus ? "btn btn-danger btn-sm" : "btn btn-success btn-sm"}>{ usuario.estatus ? <AiFillDelete /> : <AiOutlinePoweroff/> }</button>
            </td>
        </tr>
    )
}

export default A_Registro_Usuario