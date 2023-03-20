import img from "../../assets/curso.jpg"
import { useObtenerArchivos } from "../../hooks/useArchivo"
import { useObtenerCursoPorId } from "../../hooks/useCurso"
import { useAccesoStore } from "../../store/accesoStore"
import axios from "axios"

const ItemCertificado = ({ certificacion }) => {

    const {token, usuario} = useAccesoStore((state) => ({
        token: state.token,
        usuario: state.usuario
    }))
    const { data: archivos, isLoading: isLoadingArchivos } = useObtenerArchivos()
    const { data: curso, isLoading: isLoadingCurso } = useObtenerCursoPorId(certificacion.idCurso)

    if (isLoadingArchivos || isLoadingCurso) return <div className="card rounded-3 mb-4">
        <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
                <div className="col-md-2 col-lg-2 col-xl-2">
                    <img
                        src={img}
                        className="img-fluid rounded-3" alt="Cotton T-shirt" />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3">
                    <p className="lead fw-normal mb-2">Curso</p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <button type="button" className="btn btn-success btn-block">Cargando ...</button>
                </div>
            </div>
        </div>
    </div>

    let archivoImagenCurso = archivos.find((a) => a.idArchivo == curso.idMiniatura)

    const descargar = async () => {

        axios({
            url: `http://localhost:3000/api/certificacion_gem/${certificacion.idCertificacion}`,
            method:"GET",
            headers: {"x-access-token":token},
            responseType: "arraybuffer"
        })
        .then((response) => {
            
            let b = new Blob([response.data], { type: "applicacion/pdf" })
            blobToSaveAs(`certificado_${curso.nombre}_nc${usuario.idUsuario}.pdf`, b)
        })
    }

    const blobToSaveAs = (fileName, blob) => {

        try {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          if (link.download !== undefined) { // feature detection
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } catch (e) {
          console.error('BlobToSaveAs error', e);
        }
      }

    return (
        <div className="card rounded-3 mb-4">
            <div className="card-body p-4">
                <div className="row d-flex justify-content-between align-items-center">
                <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-bold mb-2">{certificacion.nombreCurso}</p>
                    </div><hr />
                    <div className="col-md-2 col-lg-2 col-xl-2">
                        <img
                            src={!archivoImagenCurso ? img : archivoImagenCurso.url}
                            className="img-fluid rounded-3" alt="Cotton T-shirt" />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">{usuario.nombre} {usuario.primerApellido}</p>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <button type="button" onClick={() => descargar()} className="btn btn-success btn-block">Descargar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCertificado