
import A_Tabla_Usuarios from "../../components/usuario/A_Tabla_Usuarios"
import BotonAgregarUsuario from "../../components/usuario/BotonAgregarUsuario"

const A_Usuarios = () => {

    return (
        <div className="container-fluid">
            <BotonAgregarUsuario/>

            <A_Tabla_Usuarios/>
        </div>
    )
}

export default A_Usuarios