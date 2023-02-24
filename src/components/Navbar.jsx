import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

import { shallow } from 'zustand/shallow'
import { useAccesoStore } from '../store/accesoStore'

const Navbar = () => {

    const navigate = useNavigate();

    const { acceso, logout, usuario } = useAccesoStore((state) => ({ acceso: state.acceso, logout: state.logout, usuario: state.usuario }), shallow)

    const cerrarSesion = () => {
        logout();
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg  bg-ligth">
            <div className="container-fluid shadow">
                <Link to="/" className="navbar-brand" >
                    <img src={logo} alt="Logo de Novatec Consultores Mexico" height='35' />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" >Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/catalogo_cursos" className="nav-link" >Cursos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/pages/Us" className="nav-link" >Nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/pages/Contac" className="nav-link" >Contactanos</Link>
                        </li>
                        {
                            acceso && usuario.roles ?
                                <>
                                    {
                                        usuario.roles.includes("empleado") || usuario.roles.includes("administrador") ?
                                            <>
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Gestión
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li className="nav-item">
                                                            <Link to="/admin/cursos" className="nav-link" >Cursos</Link>
                                                        </li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li className="nav-item">
                                                            <Link to="/admin/usuarios" className="nav-link" >Usuarios</Link>
                                                        </li>
                                                    </ul>
                                                </li>

                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Mi cuenta
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li className="nav-item">
                                                            <Link to="/perfil" className="nav-link" >Perfil</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </>
                                            :
                                            <>
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Mi cuenta
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li className="nav-item">
                                                            <Link to="/perfil" className="nav-link" >Perfil</Link>
                                                        </li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li className="nav-item">
                                                            <Link to="/cliente/cursos" className="nav-link" >Mis cursos</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </>
                                    }
                                </>
                                :
                                <>
                                </>
                        }

                    </ul>

                    {
                        acceso ? 
                        <small className='me-1' >{usuario.nombre} {usuario.primerApellido} {usuario.segundoApellido}</small>
                        :
                        <></>
                    }


                    <span className="nav-item text-primary" >
                        
                        {acceso ?
                            <>
                            <a className="nav-link" onClick={cerrarSesion} >Cerrar sesion</a>
                            </>
                            :
                            <Link to="/iniciar_sesion" className="nav-link" >Iniciar Sesión</Link>
                        }
                    </span>
                    

                </div>
            </div>
        </nav>
    )
}

export default Navbar