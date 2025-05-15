import { Link } from "react-router-dom";
import { FaUserCheck, FaClipboardList } from "react-icons/fa";

export const BienvenidaPublica = () => (
  <>
    <h1>🏋️‍♂️ Bienvenido a Reservas Deportivas</h1>
    <p>Gestiona tus clases deportivas de manera rápida y eficiente.</p>
    <div className="home-buttons">
      <Link to="/registrar-usuario" className="home-btn">
        <FaUserCheck /> Crear Cuenta
      </Link>
      <Link to="/login" className="home-btn outline">
        <FaClipboardList /> Iniciar Sesión
      </Link>
    </div>
  </>
);
