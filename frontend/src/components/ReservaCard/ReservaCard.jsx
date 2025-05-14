import "./ReservaCard.css";
import { FaCalendarAlt, FaUser, FaClock, FaClipboardList, FaAffiliatetheme } from "react-icons/fa";

export const ReservaCard = ({ reserva, entrenador, cliente, onAceptar, onRechazar }) => {
  return (
    <div className={`reserva-card ${reserva.estado}`}>
      <div className="reserva-body">
        {cliente && <p><FaUser /> <strong>Cliente:</strong> {cliente}</p>}
        {entrenador && <p><FaUser /> <strong>Entrenador:</strong> {entrenador}</p>}
        <p><FaCalendarAlt /> <strong>Fecha:</strong> {reserva.fecha}</p>
        <p><FaClipboardList /> <strong>Categoría:</strong> {reserva.categoria}</p>
        <p><FaClock /> <strong>Hora:</strong> {reserva.hora}</p>
        <p><FaAffiliatetheme /> <strong>Estado:</strong> <span className="estado">{reserva.estado}</span></p>

        {reserva.estado === "pendiente" && (onAceptar || onRechazar) && (
          <div className="acciones">
            {onAceptar && <button className="btn-aceptar" onClick={onAceptar}>Aceptar</button>}
            {onRechazar && <button className="btn-rechazar" onClick={onRechazar}>Rechazar</button>}
          </div>
        )}
      </div>
    </div>
  );
};
