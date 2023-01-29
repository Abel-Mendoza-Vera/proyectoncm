import img from '../assets/curso.jpg'
 
 const Inicio = () => {
  return (
    <div>
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://cssslider.com/sliders/demo-10/data1/images/1.jpg"  class="d-block w-100" height="250px" alt="..."/>
        </div>
        <div class="carousel-item">
          <img src="https://cssslider.com/sliders/demo-10/data1/images/3.jpg" class="d-block w-100" height="250px" alt="..."/>
        </div>
        <div class="carousel-item">
          <img src="https://cssslider.com/sliders/demo-10/data1/images/2.jpg" class="d-block w-100" height="250px" alt="..."/>
        </div>
       
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      </div><br />
      
      <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <p className="card-text">Descripción del Curso</p>
                            <a href=""  className="btn btn-outline-primary">Comprar</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <p className="card-text ">Descripción del Curso</p>
                            <a href=""  className="btn btn-outline-primary">Comprar</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className='card' style={{ width: "20rem" }}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">Nombre del Curso</h5>
                            <p className="card-text">Descripción del Curso</p>
                            <a href=""  className="btn btn-outline-primary">Comprar</a>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Inicio