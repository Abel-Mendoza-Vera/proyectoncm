import Swal from "sweetalert2"
import { api } from "../../api/novatec"
import axios from "axios"
import { useAccesoStore } from "../../store/accesoStore"

const BotonEnviarCodigosAutorizacion = ({ cliente, compraId }) => {

    const { token } = useAccesoStore((state) => ({
        token: state.token
    }))

    const enviarCodigos = async () => {

        const codigos = await api.get(`/compra/${cliente.idUsuario}/${compraId}`, { headers: { "x-access-token": token } })

        let mensaje= ""

        for(let i = 0; i < codigos.data.length; i ++){
            let codigo = codigos.data[i]
            mensaje += "***********************************\n";
            mensaje += "Curso: " + codigo.nombre + "\n";
            mensaje += "Codigo de autorización: " + codigo.codigoAuth + "\n"
        }

        const serviceId = 'service_j0rnl8q';
        const templateId = 'template_3784u14';
        const userId = 'CP5o6n-2gg2hGWbUU';
        const tokenService = "bfmWgLqY6PM-D1GBX9UXF";
        const nombre_cliente = `${cliente.nombre} ${cliente.primerApellido} ${cliente.segundoApellido}`

        const enviar_codigos = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
            'service_id': serviceId,
            'template_id': templateId,
            'user_id': userId,
            'accessToken': tokenService,
            'template_params': {
                'cliente': nombre_cliente,
                'folio_compra': compraId,
                'user_email': cliente.correo,
                "mensaje": mensaje
            }
        })

        if (enviar_codigos.status == 200){
            Swal.fire({
                title: "Enviar codigos de autorización",
                text: "El o los codigos de autorización se han enviado correctamente",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                icon: "success"
            })
        }
        else{
            Swal.fire({
                title: "Enviar codigos de autorización",
                text: "El o los codigos de autorización no se han enviado correctamente",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                icon: "error"
            })
        }

        

    }

    return (
        <button className="btn btn-outline-primary btn-sm" onClick={enviarCodigos} >Enviar codigos de autorización</button>
    )
}

export default BotonEnviarCodigosAutorizacion