import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

// Se realiza la carga de todo el store
import { useCursoStore } from '../store/cursoStore'
import { useLeccionStore } from '../store/leccionStore'
import { useArchivoStore } from '../store/archivoStore'
import { useCuestionarioStore } from '../store/cuestionarioStore'

const Navbar = () => {

    const { getCursos } = useCursoStore((state) => ({ getCursos: state.getCursos }))
    const { getLecciones } = useLeccionStore((state) => ({ getLecciones: state.getLecciones }))
    const { getArchivos } = useArchivoStore((state) => ({ getArchivos: state.getArchivos }))
    const { getCuestionarios } = useCuestionarioStore((state) => ({ getCuestionarios: state.getCuestionarios }))

    useEffect(() => {
        getCursos()
        getLecciones()
        getArchivos()
        getCuestionarios()
    }, [])
    

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
                            <Link to="/admin/cursos" className="nav-link" >Cursos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/pages/Us" className="nav-link" >Nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/pages/Contac" className="nav-link" >Contactanos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cliente/mis_cursos" className="nav-link" >Mis Cursos</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar