import { useState, useEffect } from "react";
import axios from "axios";
import {InputField} from "../Input/InputField"

import "./FormReserva.css";

export const FormReserva = () => {
  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    categoria: "",
    entrenador: ""
  });

  const [errores, setErrores] = useState({});
  const [entrenadores, setEntrenadores] = useState([]);

  useEffect(() => {
    // Cargar entrenadores disponibles desde JSON
    axios.get("http://localhost:4000/api/auth/usuarios")
      .then((res) => {
        const entrenadores = res.data.filter(u => u.rol.toLowerCase() === "entrenador");
        setEntrenadores(entrenadores);
      })
      .catch((err) => console.error("Error al cargar entrenadores", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const errores = {};
    const hoy = new Date().toISOString().split("T")[0];

    if (!form.fecha || form.fecha < hoy) {
      errores.fecha = "La fecha debe ser actual o futura";
    }

    if (!form.hora) {
      errores.hora = "Selecciona una hora válida";
    }

    if (!form.categoria) {
      errores.categoria = "Selecciona una categoría";
    }

    if (!form.entrenador) {
      errores.entrenador = "Selecciona un entrenador";
    }

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.rol.toLowerCase() !== "cliente") {
      alert("Solo los clientes pueden hacer reservas.");
      return;
    }

    if (validar()) {
      const nuevaReserva = {
        idCliente: usuario.id,
        fecha: form.fecha,
        hora: form.hora,
        categoria: form.categoria,
        entrenador: form.entrenador,
        estado: "pendiente"
      };

      try {
        const res = await axios.post("http://localhost:4000/api/reservas", nuevaReserva);
        alert("Reserva registrada exitosamente ✅");
        setForm({ fecha: "", hora: "", categoria: "", entrenador: "" });
        window.location.href = "/mis-reservas"
      } catch (error) {
        if (error.response?.status === 409) {
          alert("El entrenador ya tiene una clase aprobada a esa hora ❌");
        } else {
          console.log(error)
          alert("Error al registrar la reserva.");
        }
      }
    }
  };

   return (
    <form onSubmit={handleSubmit} className="formulario-reserva">
      <h2>Reserva tu Clase</h2>
      
      <div className="input-group">
        <InputField
          type="date"
          label="Fecha"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          error={errores.fecha}
          className={`input-campo ${errores.fecha ? 'input-campo-error' : ''}`}
        />
        {errores.fecha && <span className="error-mensaje">{errores.fecha}</span>}
      </div>

      <div className="input-group">
        <InputField
          type="time"
          label="Hora"
          name="hora"
          value={form.hora}
          onChange={handleChange}
          error={errores.hora}
          className={`input-campo ${errores.hora ? 'input-campo-error' : ''}`}
        />
        {errores.hora && <span className="error-mensaje">{errores.hora}</span>}
      </div>

      <div className="input-group">
        <label>Categoría</label>
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className={`input-campo select-custom ${errores.categoria ? 'input-campo-error' : ''}`}
        >
          <option value="">Selecciona una categoría</option>
          <option value="Yoga">Yoga</option>
          <option value="Boxeo">Boxeo</option>
          <option value="CrossFit">CrossFit</option>
          <option value="Tenis">Tenis</option>
        </select>
        {errores.categoria && <span className="error-mensaje">{errores.categoria}</span>}
      </div>

      <div className="input-group">
        <label>Entrenador</label>
        <select
          name="entrenador"
          value={form.entrenador}
          onChange={handleChange}
          className={`input-campo select-custom ${errores.entrenador ? 'input-campo-error' : ''}`}
        >
          <option value="">Selecciona un entrenador</option>
          {entrenadores.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombres} {e.apellidos}
            </option>
          ))}
        </select>
        {errores.entrenador && <span className="error-mensaje">{errores.entrenador}</span>}
      </div>

      <button type="submit" className="btn-reservar">
        Reservar Clase
      </button>
    </form>
  );
};
