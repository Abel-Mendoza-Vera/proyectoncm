import imagen from '../assets/Nosotros1.png'
import Mision from '../assets/Mision.jpg'
import Vision from '../assets/Vision.jpg'
import Valores from '../assets/Valores.jpg'



const Nosotros = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <div className="container"><img src={imagen} style={{ width: "20rem" }} alt="" /></div>
                </div>

                <div className="col-md-12 col-lg-6">
                    <div className="container text-justify">
                        <div className="base_header"><span class="text-decoration-underline"><small className="bor_header_left"></small> <small className="bor_header_right"></small></span>
                            <h3>ACERCA DE NOSOTROS</h3>
                        </div>
                        <div className="base_footer"></div>
                        <p className='fst-italic text-justify'>Novatec Consultores México es una firma de
                            consultoría organizacional y desarrollo humano,orgullosamente mexicana, la cual a lo largo de 15 años ha ofrecido exitosamente servicios de capacitación y consultoría
                            a empresas privadas y gubernamentales de todos los sectores en el país y en el extranjero;</p>
                        <p className='fst-italic text-justify'>Nos caracteriza que somos seres humanos comprometidos, soñadores y con los pies en la
                            tierra, además de que dispuestos a convertir a las organizaciones y a los seres humanos
                            que las integran, en elementos sinergiadores de desarrollo nacional e internacional.
                        </p>
                        <p className='fst-italic text-justify'>Nuestro quehacer cotidiano es el diseño e implementación de modelos y herramientas de
                            diagnóstico y mejoramiento de las organizaciones.</p>

                    </div>
                </div>
            </div>


            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={Mision} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Misión</h5>
                            <p className="card-text">Creemos firmemente en la felicidad como motor y potenciador de creatividad y la efectividad en las organizaciones.</p>
                            <a href="http://novatec-consultores.com/acerca/ " target="_blank" className="btn btn-outline-info">Ver Más</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={Vision} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Visión</h5>
                            <p className="card-text ">Ser el punto de convergencia entre la creatividad, felicidad y efectividad que necesitan las organizaciones y los seres humanos hoy en día.</p>
                            <a href="http://novatec-consultores.com/acerca/ " target="_blank" className="btn btn-outline-info">Ver Más</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={Valores} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Valores</h5>
                            <p className="card-text">Vivimos y Creemos en:
                                <li>Felicidad</li>
                                <li>Liderazgo</li>
                                <li>Comunidad</li></p>
                            <a href="http://novatec-consultores.com/acerca/ " target="_blank" className="btn btn-outline-info">Ver Más</a>
                        </div>
                    </div>
                </div>
            </div>




        </div>




    )
}

export default Nosotros