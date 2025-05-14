import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Nabvar.css";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [usuario, setUsuario] = useState(null);
  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(data);
  }, [location]); 

  const isCliente = usuario?.rol.toLowerCase() === "cliente";
  const isEntrenador = usuario?.rol.toLowerCase() === "entrenador";

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Clases Deportivas</h2>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>

        {/* Cliente */}
        {isCliente && (
          <>
            <li><Link to="/registrar-reserva">Reservar Clase</Link></li>
            <li><Link to="/mis-reservas">Mis Reservas</Link></li>
          </>
        )}

        {/* Entrenador */}
        {isEntrenador && (
          <li><Link to="/reservas-asignadas">Reservas Asignadas</Link></li>
        )}

        {/* Sesión */}
        {!usuario ? (
          <>
            <li><Link to="/registrar-usuario">Crear Cuenta</Link></li>
            <li><Link to="/login">Iniciar Sesión</Link></li>
          </>
        ) : (
          <>
            <li className="navbar-user">👤 {usuario.nombres}</li>
            <li><button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};
