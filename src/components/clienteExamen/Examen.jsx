const Examen = () => {
    return (

        <div>


            <div class="card text">
                <div class="card-header">
                    <h3 className='text-center'>Nombre del cuestionario</h3>
                </div>
                <div class="card-body">
                    <p className='text-justify'>Enunciado</p>
                    <div class="pregresp">
                        <div class="pregunta">1. ¿Crees que HTML es una buena tecnología?<br />
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Respuesta 1
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Respuesta 2
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Respuesta 3
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Respuesta 4
                            </label>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                <a href="#" class="btn btn-primary">Enviar</a>
                </div>
            </div>

        </div>

    )
}

export default Examen