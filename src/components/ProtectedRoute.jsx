import { Navigate, Outlet } from "react-router-dom";
import { useAccesoStore } from '../store/accesoStore';
import { usePerfil } from "../hooks/useAcceso";

export const ProtectedRoute = async ({ rol, children }) => {
    console.log(rol);
    const { acceso, token } = useAccesoStore((state) => ({
        acceso: state.acceso,
        token: state.token
    }))

    if (!acceso) {
        return <Navigate to="/iniciar-sesion" replace />
    }
    else {
        const { data } = usePerfil(token);
        let usuario = data;
        let rolesUsuario = usuario.roles;
        console.log(rolesUsuario);
        
        if(!rolesUsuario.includes(rol)){
            return <Navigate to="/" replace />
        }

        return children ? children : <Outlet />;

    }



}