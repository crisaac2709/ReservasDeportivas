import { Link } from "react-router-dom";
import { FaClipboardList, FaCalendarAlt, FaPlusCircle } from "react-icons/fa";

export const BienvenidaCliente = ({ nombre }) => (
  <>
    <h1>👋 Hola, {nombre}</h1>
    <p>Bienvenido de vuelta. ¿Listo para tu próxima clase?</p>
    <div className="home-summary">
      <div className="summary-card">
        <FaCalendarAlt className="summary-icon" />
        <p><strong>Tu rol:</strong> Cliente</p>
      </div>
      <div className="summary-card">
        <FaClipboardList className="summary-icon" />
        <p><strong>Gestiona tus reservas</strong></p>
      </div>
    </div>
    <div className="home-buttons">
      <Link to="/registrar-reserva" className="home-btn">
        <FaPlusCircle /> Reservar Clase
      </Link>
      <Link to="/mis-reservas" className="home-btn outline">
        <FaClipboardList /> Ver Mis Reservas
      </Link>
    </div>
  </>
);
