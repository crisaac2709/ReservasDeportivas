import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FaClipboardList, FaCalendarAlt, FaPlusCircle, FaUserCheck } from "react-icons/fa";
import "./Home.css";

export const Home = () => {
  const { usuario, isCliente, isEntrenador, isAutenticado } = useAuth();

  return (
    <div className="home-container">
      <div className="home-card">
        {!isAutenticado ? (
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
        ) : isCliente ? (
          <>
            <h1>👋 Hola, {usuario.nombres}</h1>
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
        ) : isEntrenador ? (
          <>
            <h1>💪 Bienvenido, Entrenador {usuario.nombres}</h1>
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
        ) : null}
      </div>
    </div>
  );
};
