import img from '../assets/curso.jpg'

const Inicio = () => {

  return (
    <>
      <div className='container-fluid'>
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://cssslider.com/sliders/demo-10/data1/images/1.jpg" className="d-block w-100" height="250px" alt="Slide 1"/>
            </div>
            <div className="carousel-item">
              <img src="https://cssslider.com/sliders/demo-10/data1/images/3.jpg" className="d-block w-100" height="250px" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src="https://cssslider.com/sliders/demo-10/data1/images/2.jpg" className="d-block w-100" height="250px" alt="Slide 3" />
            </div>

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        <section className="text-center text-md-start">
          <h4 className="mb-5"><strong> </strong></h4>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="bg-image hover-overlay shadow-1-strong rounded ripple" data-mdb-ripple-color="light">
                <img src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" className="img-fluid" />
                <a href="#!">
                  <div className="mask" style={{ backgroundcolor: "rgba(251, 251, 251, 0.15)" }}></div>
                </a>
              </div>
            </div>

            <div className="col-md-8 mb-4">
              <h5>Liderazgo</h5>
              <p>
                Dentro del curso se verán conceptos diversos como la autoestima, la comunicación asertiva, tipos de comunicación no verbal y como emplearla, toma de decisiones y aspectos importantes sobre la empatía. Por otro lado, se verán diversas prácticas que puedes realizar en cualquier parte para desarrollar cada una de las habilidades que te darán la seguridad para mejorar cada día.
              </p>

              <button type="button" className="btn btn-primary">Añadir al Carrito</button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="bg-image hover-overlay shadow-1-strong rounded ripple" data-mdb-ripple-color="light">
                <img src="https://mdbootstrap.com/img/new/standard/nature/002.jpg" className="img-fluid" />
                <a href="#!">
                  <div className="mask" style={{ backgroundcolor: "rgba(251, 251, 251, 0.15)" }}></div>
                </a>
              </div>
            </div>

            <div className="col-md-8 mb-4">
              <h5>Desarrollo Sustentable</h5>
              <p>
                Dentro del curso se verán conceptos diversos como la autoestima, la comunicación asertiva, tipos de comunicación no verbal y como emplearla, toma de decisiones y aspectos importantes sobre la empatía. Por otro lado, se verán diversas prácticas que puedes realizar en cualquier parte para desarrollar cada una de las habilidades que te darán la seguridad para mejorar cada día.
              </p>

              <button type="button" className="btn btn-primary">Añadir al Carrito</button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="bg-image hover-overlay shadow-1-strong rounded ripple" data-mdb-ripple-color="light">
                <img src="https://mdbootstrap.com/img/new/standard/nature/023.jpg" className="img-fluid" />
                <a href="#!">
                  <div className="mask" style={{ backgroundcolor: "rgba(251, 251, 251, 0.15)" }}></div>
                </a>
              </div>
            </div>

            <div className="col-md-8 mb-4">
              <h5>Asistencia Técnica</h5>
              <p>
              Dentro del curso se verán conceptos diversos como la autoestima, la comunicación asertiva, tipos de comunicación no verbal y como emplearla, toma de decisiones y aspectos importantes sobre la empatía. Por otro lado, se verán diversas prácticas que puedes realizar en cualquier parte para desarrollar cada una de las habilidades que te darán la seguridad para mejorar cada día.
              </p>

              <button type="button" className="btn btn-primary">Añadir al Carrito</button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="bg-image hover-overlay shadow-1-strong rounded ripple" data-mdb-ripple-color="light">
                <img src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" className="img-fluid" />
                <a href="#!">
                  <div className="mask" style={{ backgroundcolor: "rgba(251, 251, 251, 0.15)" }}></div>
                </a>
              </div>
            </div>

            <div className="col-md-8 mb-4">
              <h5>Inovación Empresarial</h5>
              <p>
              Dentro del curso se verán conceptos diversos como la autoestima, la comunicación asertiva, tipos de comunicación no verbal y como emplearla, toma de decisiones y aspectos importantes sobre la empatía. Por otro lado, se verán diversas prácticas que puedes realizar en cualquier parte para desarrollar cada una de las habilidades que te darán la seguridad para mejorar cada día.
              </p>

              <button type="button" className="btn btn-primary">Añadir al Carrito</button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Inicio