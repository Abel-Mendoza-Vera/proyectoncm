import '../../components/profile.css'

import { useNavigate } from 'react-router-dom'
import { useAccesoStore } from '../../store/accesoStore'
import { usePerfil } from '../../hooks/useAcceso'
import { useEffect } from 'react';

const U_PerfilEdit = () => {

    const navigate = useNavigate();
    const { token, saveUser } = useAccesoStore((state) => ({ token: state.token, saveUser: state.saveUser }))
    const { data, isLoading } = usePerfil(token)


    useEffect(() => {
        if (!token) {
            navigate("/")
        }
        if (!isLoading) {
            saveUser(data);
        }

    }, [token, data])

    if (isLoading) return <div>Cargando la información del perfil ...</div>


    return (
        <>
            <div>
            </div>
        </>
    )
}

export default U_PerfilEdit