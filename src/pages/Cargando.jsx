
const Cargando = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>

            <h3>Espere un momento por favor</h3>

            <div style={{ width: "13rem", height: "13rem" }} className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>

        </div>
    )
}

export default Cargando