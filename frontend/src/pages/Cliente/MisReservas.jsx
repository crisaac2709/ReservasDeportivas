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

  const [filtroEntrenador, setFiltroEntrenador] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

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

  const reservasFiltradas = reservas.filter(reserva => {
    const coincideEntrenador = filtroEntrenador === "" || reserva.entrenador === filtroEntrenador;
    const coincideCategoria = filtroCategoria === "" || reserva.categoria === filtroCategoria;
    return coincideEntrenador && coincideCategoria;
  });

  return (
    <>
      <h2>Reservas de {usuario.nombres}</h2>

      <div className="filtros-container">
        <label>
          Filtrar por Entrenador:
          <select value={filtroEntrenador} onChange={(e) => setFiltroEntrenador(e.target.value)}>
            <option value="">Todos</option>
            {usuarios
              .filter(u => u.rol.toLowerCase() === "entrenador")
              .map(ent => (
                <option key={ent.id} value={ent.id}>
                  {ent.nombres} {ent.apellidos}
                </option>
              ))}
          </select>
        </label>

        <label>
          Filtrar por Categoría:
          <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
            <option value="">Todas</option>
            {[...new Set(reservas.map(r => r.categoria))].map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mis-reservas-container">
        {mensaje && <p>{mensaje}</p>}

        {reservasFiltradas.length === 0 && !mensaje ? (
          <p>No tienes reservas registradas con esos filtros.</p>
        ) : (
          <div className="grid-reservas">
            {reservasFiltradas.map((reserva) => (
              <ReservaCard
                key={reserva.id}
                reserva={reserva}
                entrenador={obtenerNombreEntrenador(reserva.entrenador)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

