import { useNavigate } from 'react-router-dom'

import { useAccesoStore } from '../../store/accesoStore'
import { usePerfil } from '../../hooks/useAcceso'
import { useEffect } from 'react';

const U_Perfil = () => {

    const navigate = useNavigate();
    const token = useAccesoStore((state) => state.token)
    const { data, isLoading } = usePerfil(token)

    useEffect(() => {
        if (!token) {
            navigate("/")
        }

    }, [token])

    if (isLoading) return <div>Cargando la información del perfil ...</div>

    return (
        <>

            <div className='my-5'>
                <h3 className='text-center'>Perfil del usuario</h3>

                <p><strong>Nombre:</strong> {data.nombre} {data.primerApellido} {data.segundoApellido}</p>
                <p><strong>Ultimo grado de estudios:</strong> {data.ultimoGradoEstudio}</p>
                <p><strong>CURP:</strong> {data.curp}</p>
                <p><strong>Telefono: </strong> {data.telefono}</p>
                <p><strong>Fecha de nacimiento: </strong>{data.fechaNac}</p>
                <p><strong>Correo:</strong> {data.correo}</p>
            </div>

        </>
    )
}

export default U_Perfil