import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import "./ReservasAsignadas.css";
import { ReservaCard } from "../../components/ReservaCard/ReservaCard";

export const ReservasAsignadas = () => {
  const { usuario, isEntrenador } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (!isEntrenador || !usuario) return;

    const cargarDatos = async () => {
      try {
        const resReservas = await axios.get("http://localhost:4000/api/reservas");
        const resUsuarios = await axios.get("http://localhost:4000/api/auth/usuarios");

        const mias = resReservas.data.filter(r => r.entrenador === usuario.id);
        setReservas(mias);
        setUsuarios(resUsuarios.data);
      } catch (err) {
        console.error("Error al cargar reservas o usuarios:", err);
      }
    };

    cargarDatos();
  }, [usuario, isEntrenador]);

  const obtenerNombreCliente = (id) => {
    const cliente = usuarios.find(u => u.id === id);
    return cliente ? `${cliente.nombres} ${cliente.apellidos}` : "Desconocido";
  };

  const actualizarEstado = async (idReserva, nuevoEstado) => {
    try {
      await axios.patch(`http://localhost:4000/api/reservas/${idReserva}`, {
        estado: nuevoEstado
      });

      setReservas(prev =>
        prev.map(r =>
          r.id === idReserva ? { ...r, estado: nuevoEstado } : r
        )
      );
    } catch (err) {
      alert("Error al actualizar el estado");
    }
  };

  return (
    <div className="asignadas-container">
      <h2>Reservas Asignadas</h2>
      {reservas.length === 0 ? (
        <p>No tienes reservas asignadas aún.</p>
      ) : (
        reservas.map(reserva => (
          <ReservaCard
            key={reserva.id}
            reserva={reserva}
            cliente={obtenerNombreCliente(reserva.idCliente)}
            onAceptar={() => actualizarEstado(reserva.id, "aceptado")}
            onRechazar={() => actualizarEstado(reserva.id, "rechazado")}
            />
        ))
      )}
    </div>
  );
};
