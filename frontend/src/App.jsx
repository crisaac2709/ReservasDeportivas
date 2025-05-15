// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { RegistrarReserva } from "./pages/Cliente/RegistrarReserva"; 
import { RegistrarUsuario } from "./pages/Auth/RegistrarUsuario";
import { LoginUsuario } from "./pages/Auth/Login";
import { MisReservas } from "./pages/Cliente/MisReservas";
import { Navbar } from "./components/Nabvar/Nabvar";
import { useAuth } from "./hooks/useAuth";
import { ReservasAsignadas } from "./pages/Entrenador/ReservasAsignadas";

function App() {
  const { isAutenticado, isCliente, isEntrenador } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Ruta principal redirige al login si no está autenticado */}
        <Route path="/" element={<Home />} />


        {/* Solo CLIENTE puede reservar o ver sus reservas */}
        <Route path="/registrar-reserva" element={isCliente ? <RegistrarReserva /> : <p>Acceso denegado</p>} />
        <Route path="/mis-reservas" element={isCliente ? <MisReservas /> : <p>Acceso denegado</p>} />

        {/* Solo ENTRENADOR puede ver sus reservas asignadas */}
        <Route path="/reservas-asignadas" element={isEntrenador ? <ReservasAsignadas /> : <p>Acceso denegado</p>} />
        


        {/* Autenticación: redirigir si ya está logueado */}
        <Route path="/registrar-usuario" element={
          isAutenticado
            ? <Navigate to="/" />
            : <RegistrarUsuario />
        } />

        <Route path="/login" element={
          isAutenticado
            ? <Navigate to="/" />
            : <LoginUsuario />
        } />

        
      </Routes>
    </Router>
  );
}

export default App;
