import Contac from '../assets/Contac.jpg'

const Contactanos = () => {
    return (
        <div className="jumbotron text-center">
           
            <section class="intro">
                <div class="mask d-flex align-items-center h-100 gradient-custom">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-12 col-xl-10">
                                <div class="card">
                                    <div class="card-body p-5">
                                        <div class="row d-flex align-items-center">
                                            <div class="col-md-6 col-xl-7">
                                                <div class="text-center pt-md-5 pb-5 my-md-5">
                                                <img src={Contac} class="card-img-top" alt="..." />
                                                </div>

                                            </div>
                                            <div class="col-md-6 col-xl-4 text-center">
                                                <h2 class="fw-bold mb-4 pb-2">Contáctanos</h2>
                                                <div class="form-outline mb-3">
                                                <img src="https://cdn-icons-png.flaticon.com/512/6043/6043857.png" style={{ width: "4rem" }} class="card-img-top" alt="..." /> <br />
                                                <a href="https://goo.gl/maps/t5AY7Z3gJovJfDjs9"  target="_blank" >Violetas 239 Colonia Jardines de Jerez León, Guanajuato, México.<i class="fas fa-long-arrow-alt-right"></i></a>                                                   
                                                </div>
                                                <div class="form-outline mb-4">
                                                <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" style={{ width: "3rem" }} class="card-img-top" alt="..." /> <br />

                                                <a href="mailto:hola@novatec-consultores.com?" target="_blank">hola@novatec-consultores.com</a>
                                                </div>



                                                <div class="text-center">
                                                    <a href="http://novatec-consultores.com/contacto/" target="_blank">Ver Más <i class="fas fa-long-arrow-alt-right"></i></a>
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
    )
}

export default Contactanos