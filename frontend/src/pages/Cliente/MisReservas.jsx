import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import "./MisReservas.css";
import { ReservaCard } from "../../components/ReservaCard/ReservaCard";

export const MisReservas = () => {
  const { usuario, isCliente } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
  const obtenerDatos = async () => {
    try {
      const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
      if (!usuarioActual || usuarioActual.rol.toLowerCase() !== "cliente") return;

      const resReservas = await axios.get("http://localhost:4000/api/reservas");
      const resUsuarios = await axios.get("http://localhost:4000/api/auth/usuarios");

      const misReservas = resReservas.data.filter(r => r.idCliente === usuarioActual.id);
      setReservas(misReservas);
      setUsuarios(resUsuarios.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setMensaje("Error al cargar tus reservas");
    }
  };

  obtenerDatos();
}, []); 


  const obtenerNombreEntrenador = (id) => {
    const entrenador = usuarios.find(u => u.id === id);
    return entrenador ? `${entrenador.nombres} ${entrenador.apellidos}` : "Desconocido";
  };

  return (
    <div className="mis-reservas-container">
      <h2>Reservas de {usuario.nombres}</h2>
      {mensaje && <p>{mensaje}</p>}
      {reservas.length === 0 && !mensaje ? (
        <p>No tienes reservas registradas aún.</p>
      ) : (
        reservas.map((reserva) => (
          <ReservaCard key={reserva.id} reserva={reserva} entrenador={obtenerNombreEntrenador(reserva.entrenador)}/>
        ))
      )}
    </div>
  );
};
