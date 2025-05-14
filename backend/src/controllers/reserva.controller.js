const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const archivoReservas = path.join(__dirname, '../database/reservas.json');

// Leer reservas desde JSON
const leerReservas = () => {
  if (!fs.existsSync(archivoReservas)) return [];
  const data = fs.readFileSync(archivoReservas, 'utf-8');
  return data ? JSON.parse(data) : [];
};

// Guardar reservas en JSON
const guardarReservas = (reservas) => {
  fs.writeFileSync(archivoReservas, JSON.stringify(reservas, null, 2));
};

// Crear una reserva (POST /api/reservas)
const CrearReserva = (req, res) => {
  const { idCliente, fecha, hora, categoria, entrenador } = req.body;

  if (!idCliente || !fecha || !hora || !categoria || !entrenador) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
  }

  const nuevaReserva = {
    id: uuidv4(),
    idCliente,
    fecha,
    hora,
    categoria,
    entrenador,
    estado: "pendiente"
  };

  const reservas = leerReservas();

  const existeConflicto = reservas.some(r =>
    r.fecha === nuevaReserva.fecha &&
    r.hora === nuevaReserva.hora &&
    r.entrenador === nuevaReserva.entrenador &&
    r.estado === "aceptado"
  );

  if (existeConflicto) {
    return res.status(409).json({
      mensaje: "Este entrenador ya tiene una clase aprobada en ese horario."
    });
  }

  reservas.push(nuevaReserva);
  guardarReservas(reservas);

  res.status(201).json({
    mensaje: "Reserva creada",
    reserva: nuevaReserva
  });
};

// Obtener todas las reservas (GET /api/reservas)
const ObtenerReservas = (req, res) => {
  const reservas = leerReservas();
  res.json(reservas);
};

// Actualizar estado de una reserva (PATCH /api/reservas/:id)
const actualizarEstadoReserva = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const reservas = leerReservas();
  const index = reservas.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Reserva no encontrada" });
  }

  reservas[index].estado = estado;
  guardarReservas(reservas);

  res.json({ mensaje: "Estado actualizado", reserva: reservas[index] });
};

module.exports = {
  CrearReserva,
  ObtenerReservas,
  actualizarEstadoReserva
};
    