import { FormUsuario } from "../../components/Form/FormUsuario";
import "./RegistrarUsuario.css"

export const RegistrarUsuario = () => {
    return (
        <div className="registro-container">
            <h1>Registro de Usuario</h1>
            <FormUsuario/>
        </div>
    )
}