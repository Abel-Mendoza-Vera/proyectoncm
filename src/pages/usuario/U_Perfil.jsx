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
        if(!isLoading){
            saveUser(data);
        }

    }, [token, data])

    if (isLoading) return <div>Cargando la información del perfil ...</div>

    return (
        <>
            <div className="gradient-custom">
                <section class="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                    <div class="container py-5 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col col-lg-6 mb-4 mb-lg-0">
                                <div class="card mb-3" style={{ borderradius: ".5rem" }}>
                                    <div class="row g-0">
                                        <div class="col-md-4 gradient-custom text-center text-white"
                                            style={{ bordertopleftradius: ".5rem", borderbottomleftradius: ".5rem" }}>
                                            <img src="https://cdn-icons-png.flaticon.com/512/6915/6915669.png"
                                                alt="Avatar" class="img-fluid my-5" style={{ width: "80px" }} />

                                            <p>{data.nombre} {data.primerApellido} {data.segundoApellido}</p>
                                            <p>{data.fechaNac}</p>
                                            <i class="far fa-edit mb-5"></i>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body p-6">
                                                <h6>Información</h6>
                                                <hr class="mt-0 mb-4" />
                                                <div class="row pt-1">
                                                    <div class="col-6 mb-3">
                                                        <h6>Grado de Estudios</h6>
                                                        <p class="text-muted">{data.ultimoGradoEstudio}</p>
                                                          
                                                    </div>
                                                    <div class="col-6 mb-3">
                                                        <h6>Curp</h6>
                                                        <p class="text-muted">{data.curp}</p>
                                                    </div>
                                                </div>
                                                <h6>Contacto</h6>
                                                <hr class="mt-0 mb-4" />
                                                <div class="row pt-1">
                                                    <div class="col-6 mb-3">
                                                        <h6>Teléfono</h6>
                                                        <p class="text-muted">{data.telefono}</p>
                                                    </div>
                                                    <div class="col-6 mb-3">
                                                        <h6>Correo</h6>
                                                        <p class="text-muted">{data.correo}</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-start">
                                                    <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
                                                    <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
                                                    <a href="#!"><i class="fab fa-instagram fa-lg"></i></a>
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