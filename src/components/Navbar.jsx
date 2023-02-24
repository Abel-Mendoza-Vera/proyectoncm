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

                          
                                            </>
                                            :
                                            <>
                                                 
                                            </>
                                    }
                                </>
                                :
                                <>
                                </>
                        }

                    </ul>


                    <ul className="navbar-nav">

                    <span className="nav-item text-primary" >
                        {acceso ?
                            <>
                                <div className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle d-flex align-items-center hidden-arrow"
                                        href="#"
                                        id="navbarDropdownMenuAvatar"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                            className="rounded-circle"
                                            height="25"
                                            alt="Black and White Portrait of a Man"
                                            loading="lazy"
                                        />
                                    </a>
                                    <ul className="dropdown-menu">

                                        <li className="nav-item">
                                            <Link to="/perfil" className="nav-link" >Perfil</Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li className="nav-item">
                                            <Link to="/cliente/cursos" className="nav-link" >Mis cursos</Link>

                                        </li>
                                        <li><hr className="dropdown-divider" /></li>

                                        <li className="nav-item">
                                            {acceso ?
                                                <>
                                                    <Link className="nav-link" onClick={cerrarSesion} > Cerrar sesion</Link>
                                                </>
                                                :
                                                <Link to="/iniciar_sesion" className="nav-link" >Iniciar Sesión</Link>
                                            }
                                        </li>
                                    </ul>

                                </div>
                                
                            </>
                            :
                            <Link to="/iniciar_sesion" className="nav-link text-primary" >Iniciar Sesión</Link>
                        }
                    </span>
                    </ul>
                    {
                        acceso ?
                            <small className='me-1' >{usuario.nombre} {usuario.primerApellido} {usuario.segundoApellido}</small>
                            :
                            <></>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar