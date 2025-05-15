import { FaDumbbell, FaCalendarAlt, FaStar } from "react-icons/fa";

export const FeaturesSection = () => (
  <div className="features-section">
    <h2>¿Por qué usar nuestra plataforma?</h2>
    <div className="features">
      <div className="feature">
        <FaDumbbell size={40} />
        <h4>Clases variadas</h4>
        <p>Yoga, CrossFit, Tenis, Boxeo y más.</p>
      </div>
      <div className="feature">
        <FaCalendarAlt size={40} />
        <h4>Reservas fáciles</h4>
        <p>Agenda tu clase en segundos.</p>
      </div>
      <div className="feature">
        <FaStar size={40} />
        <h4>Entrenadores calificados</h4>
        <p>Recibe clases con expertos certificados.</p>
      </div>
    </div>
  </div>
);
