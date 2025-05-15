import { Link } from "react-router-dom";
import { FaUserCheck, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

export const BienvenidaEntrenador = ({ nombre }) => (
  <>
    <h1>💪 Bienvenido, Entrenador {nombre}</h1>
    <p>Administra tus clases asignadas y organiza tu agenda deportiva.</p>
    <div className="home-summary">
      <div className="summary-card">
        <FaUserCheck className="summary-icon" />
        <p><strong>Tu rol:</strong> Entrenador</p>
      </div>
      <div className="summary-card">
        <FaCalendarAlt className="summary-icon" />
        <p><strong>Gestiona reservas asignadas</strong></p>
      </div>
    </div>
    <div className="home-buttons">
      <Link to="/reservas-asignadas" className="home-btn">
        <FaClipboardList /> Ver Clases Asignadas
      </Link>
    </div>
  </>
);
