import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import A_Cursos from '../pages/admin/A_Cursos'
import A_CursosEditar from '../pages/admin/A_CursosEditar'
import Home from'../pages/Home'
import Contac from '../pages/Contac'
import Us from '../pages/Us'
import C_Mis_Cursos from '../pages/cliente/C_Mis_Cursos'
import A_Lecciones from '../pages/admin/A_Lecciones'
import C_Certificaciones from '../pages/cliente/C_Certificaciones'
import C_Curso from '../pages/cliente/C_Cursos'
import C_Leccion from '../pages/cliente/C_Leccion'
import C_Examen from '../pages/cliente/C_Examen'
import U_Login from '../pages/usuario/U_Login'
import U_Register from '../pages/usuario/U_Register'
import A_Usuarios from '../pages/admin/A_Usuarios'
import U_Perfil from '../pages/usuario/U_Perfil'
import U_Catalogo from '../pages/usuario/U_Catalogo'


import { ProtectedRoute } from './ProtectedRoute'
import U_Curso from '../pages/usuario/U_Curso'
import U_Leccion from '../pages/usuario/U_Leccion'
import C_Carrito from '../pages/cliente/C_Carrito'
import A_Cuestionario from './cuestionario/A_Cuestionario'
import A_Compras from '../pages/admin/A_Compras'



const Enrutador = () => {

    return (
        <BrowserRouter>

            <Navbar/>

            <Routes>
                {/* Vista general */}
                <Route path='/' element={ <Home/> } />
                <Route path='/pages/Contac' element={ <Contac/> } />
                <Route path='/pages/Us' element={ <Us/> } />
                



                {/* Ruta para el inicio de sesion */}
                <Route path='/iniciar_sesion' element={ <U_Login/> } />
                <Route path='/registrar' element={ <U_Register/> } />
                <Route path='/perfil' element={ <U_Perfil/> } />

                {/** Rutas para la vista general de los cursos */}
                <Route path='/catalogo_cursos' element={ <U_Catalogo/> } />
                <Route path='/curso/:idCurso' element={ <U_Curso/> } />
                <Route path='/curso/leccion/:idCurso/:nombreCurso/:idLeccion' element={ <U_Leccion/> } />



                {/* Rutas administrativas */}
                <Route path='/admin/*' element={<ProtectedRoute rol="staff" />} >
                    <Route path='cursos' element={ <A_Cursos/> } />
                    <Route path='cursos_editar/:cursoId/:cursoNombre' element={ <A_CursosEditar/> } />
                    <Route path='lecciones/:cursoNombre/:leccionNombre/:leccionId' element={ <A_Lecciones/> } />
                    <Route path='usuarios' element={ <A_Usuarios/> } />
                    <Route path='compras' element={ <A_Compras/> } />
                </Route>
 
                {/* Rutas del cliente */}
                <Route path='/cliente/*' element={ <ProtectedRoute rol="cliente" /> } >
                    <Route path='mis_cursos' element={ <C_Mis_Cursos/> } />
                    <Route path='certificaciones' element={ <C_Certificaciones/> } />

                    <Route path='curso/:idCurso' element={ <C_Curso/> } />
                    <Route path='curso/leccion/:idCurso/:nombreCurso/:idLeccion' element={ <C_Leccion/> } />
                    
                    <Route path='examen' element={ <C_Examen/> } />

                    
                    <Route path='carrito' element={ <C_Carrito/> } />
                    <Route path='pagar' element={ <><h1>Pagar</h1></> } />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default Enrutador