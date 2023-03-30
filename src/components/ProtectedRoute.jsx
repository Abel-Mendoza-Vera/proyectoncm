import { Navigate, Outlet } from "react-router-dom";
import { useAccesoStore } from '../store/accesoStore';

export const ProtectedRoute = ({ rol, children }) => {

    const { acceso, usuario } = useAccesoStore((state) => ({
        acceso: state.acceso,
        usuario: state.usuario
    }))

    if (!acceso) {
        return <Navigate to="/iniciar-sesion" replace />
    }

    if(rol == "staff" && usuario.roles.includes("administrador")) return children ? children : <Outlet />;

    if(!usuario.roles.includes(rol) ){
        return <Navigate to="/" replace />
    }

    return children ? children : <Outlet />;

}