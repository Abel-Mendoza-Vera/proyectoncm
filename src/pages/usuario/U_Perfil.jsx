import '../../components/profile.css'

import { useNavigate } from 'react-router-dom'
import { useAccesoStore } from '../../store/accesoStore'
import { usePerfil } from '../../hooks/useAcceso'
import { useEffect } from 'react';



const U_Perfil = () => {



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
            <div className="gradient-custom">
                <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-6 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ borderradius: ".5rem" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4 gradient-custom text-center text-white"
                                            style={{ bordertopleftradius: ".5rem", borderbottomleftradius: ".5rem" }}>
                                            <img src="https://cdn-icons-png.flaticon.com/512/6915/6915669.png"
                                                alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />

                                            <p>{data.nombre} {data.primerApellido} {data.segundoApellido}</p>
                                            <p>{data.fechaNac}</p>
                                            <i className="far fa-edit mb-5"></i>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-6">
                                                <h6>Información</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Grado de Estudios</h6>
                                                        <p className="text-muted">{data.ultimoGradoEstudio}</p>

                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Curp</h6>
                                                        <p className="text-muted">{data.curp}</p>
                                                    </div>
                                                </div>
                                                <h6>Contacto</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Teléfono</h6>
                                                        <p className="text-muted">{data.telefono}</p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Correo</h6>
                                                        <p className="text-muted">{data.correo}</p>
                                                    </div>

                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><span className='material-icons'>edit</span></button>
                                                </div>

                                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLabel">Editar Información</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div className="container">
                                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
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
                                                                    <div className="row gutters">
                                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div className="card h-100">
                                                                                <div className="card-body">
                                                                                    <div className="row gutters">
                                                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                            <h6 className="mb-2 text-primary">Información Personal</h6>
                                                                                        </div>
                                                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="nombre">Nombre</label>
                                                                                                <input type="text" className="form-control" id="nombre" placeholder="" />
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
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>                                                            </div>
                                                            <div class="modal-footer">
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
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default U_Perfil