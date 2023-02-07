const Leccion = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <div className="container"><ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Lección 1</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Lección 2</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Lección 3</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Lección 4</a>
                        </li>
                    </ul></div>
                </div>

                <div className="col-md-12 col-lg-6">
                    <div className="container text-justify">
                        <div className="base_header"><span className="text-decoration-underline"><small className="bor_header_left"></small> <small className="bor_header_right"></small></span>
                            <h3>Nombre de la Lección</h3>
                        </div>
                        <div className="base_footer"></div>
                        <div class="row">
                            <div class="col-4">
                                <div class="embed-responsive embed-responsive-16by9 text-center">
                                    <iframe width="400" height="150" src="https://www.youtube.com/embed/NAVzjKNa6ro" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                    </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='text-center'>
                <button className='btn btn-outline-primary'>Continuar</button>
            </div>

        </div>

    )
}

export default Leccion