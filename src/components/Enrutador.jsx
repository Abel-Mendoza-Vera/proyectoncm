import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import A_Cursos from '../pages/admin/A_Cursos'
import A_CursosEditar from '../pages/admin/A_CursosEditar'
import Home from'../pages/Home'
import Contac from '../pages/Contac'
import Us from '../pages/Us'
import C_Mis_Cursos from '../pages/cliente/C_Mis_Cursos'
import A_Lecciones from '../pages/admin/A_Lecciones'

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
                <Route path='/iniciar_sesion' element={ <><h1>Login</h1></> } />
                <Route path='/registrar' element={ <><h1>Regitrar cliente</h1></> } />

                {/* Rutas administrativas */}
                <Route path='/admin/*' >
                    <Route path='cursos' element={ <A_Cursos/> } />
                    <Route path='cursos_editar/:cursoId' element={ <A_CursosEditar/> } />
                    <Route path='lecciones/:leccionId' element={ <A_Lecciones/> } />
                    <Route path='cuestionarios' element={ <h1>Cuestionarios</h1> } />
                    <Route path='preguntas' element={ <><h1>Preguntas</h1></> } />
                    <Route path='empleados' element={ <><h1>Empleados</h1></> } />
                    <Route path='usuarios' element={ <><h1>Usuarios</h1></> } />
                </Route>
 
                {/* Rutas del cliente */}
                <Route path='/cliente/*' >
                    <Route path='mis_cursos' element={ <C_Mis_Cursos/> } />
                    <Route path='perfil' element={ <><h1>Perfil</h1></> } />
                    <Route path='comprar' element={ <><h1>Comprar</h1></> } />
                    <Route path='pagar' element={ <><h1>Pagar</h1></> } />
                    <Route path='pagar' element={ <><h1>Pagar</h1></> } />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default Enrutador