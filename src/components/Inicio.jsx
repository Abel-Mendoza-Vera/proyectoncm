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
              <img src="https://cssslider.com/sliders/demo-10/data1/images/1.jpg" className="d-block w-100" height="250px" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cssslider.com/sliders/demo-10/data1/images/3.jpg" className="d-block w-100" height="250px" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cssslider.com/sliders/demo-10/data1/images/2.jpg" className="d-block w-100" height="250px" alt="..." />
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

      <div className='container mt-5'>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className='card' style={{ width: "20rem" }}>
              <img src={img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">Nombre del Curso</h5>
                <div><p className="card-text">Descripción del Curso</p>
                  <h5 className="text-end">$100 MXN</h5>
                </div>                <a href="" className="btn btn-outline-primary">Comprar</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className='card' style={{ width: "20rem" }}>
              <img src={img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">Nombre del Curso</h5>
                <div><p className="card-text">Descripción del Curso</p>
                  <h5 className="text-end">$100 MXN</h5>
                </div>                <a href="" className="btn btn-outline-primary">Comprar</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className='card' style={{ width: "20rem" }}>
              <img src={img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">Nombre del Curso</h5>
                <div><p className="card-text">Descripción del Curso</p>
                  <h5 className="text-end">$100 MXN</h5>
                </div>                <a href="" className="btn btn-outline-primary">Comprar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Inicio