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
            <div><div className="container">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <img src="https://cdn-icons-png.flaticon.com/512/6915/6915669.png" alt="Maxwell Admin" />
                                        </div>
                                        <h5 className="user-name">{data.nombre} {data.primerApellido} {data.segundoApellido}</h5>                                     
                                        <button type="button" id="submit" name="submit" className="btn btn-primary">Cambiar Imagen</button>
                                    </div>
                                     
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 text-primary">Información Personal</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text"  className="form-control" id="nombre" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="primerApellido">Apellido Paterno</label>
                                            <input type="text" className="form-control" id="primerApellido" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="segundoApellido">Apellido Materno</label>
                                            <input type="text" className="form-control" id="segundoApellido" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="segundoApellido">Ultimo Grado de Estudios</label>
                                            <select name="ultimoGradoEstudio" id="ultimoGradoEstudio" className="form-select">
                                                <option value="">Selecciona una opción</option>
                                                <option value="Preescolar">Preescolar</option>
                                                <option value="Primaria">Primaria</option>
                                                <option value="Secundaria">Secundaria</option>
                                                <option value="Tecnólogo">Tecnólogo</option>
                                                <option value="Bachillerato General">Bachillerato General</option>
                                                <option value="Bachillerato Tecnológico">Bachillerato Tecnológico</option>
                                                <option value="Profesional Técnico">Profesional Técnico</option>
                                                <option value="Técnico Superior Universitario">Técnico Superior Universitario</option>
                                                <option value="Licenciatura">Licenciatura</option>
                                                <option value="Especialización">Especialización</option>
                                                <option value="Maestría">Maestría</option>
                                                <option value="Doctorado">Doctorado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fechaNac">Fecha de Nacimiento</label>
                                            <input type="date" className="form-control" id="fechaNac" placeholder="" />
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Genero</label>
                                            <select name="genero" id="genero" className="form-select">
                                                <option value="">Selecciona una opción</option>
                                                <option value="Hombre">Hombre</option>
                                                <option value="Mujer">Mujer</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div className="row gutters">
                                    
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="curp">Curp</label>
                                            <input type="name" className="form-control" id="curp" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="telefono">Teléfono</label>
                                            <input type="number" className="form-control" id="telefono" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="correo">Correo</label>
                                            <input type="email" className="form-control" id="correo" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="contrasenia">Contraseña</label>
                                            <input type="password" className="form-control" id="contrasenia" placeholder="" />
                                        </div>
                                    </div>
                                </div><br />
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" className="btn btn-secondary">Cancelar</button>
                                            <button type="button" id="submit" name="submit" className="btn btn-primary">Actualizar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default U_PerfilEdit