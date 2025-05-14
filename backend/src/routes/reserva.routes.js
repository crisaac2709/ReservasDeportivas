const express = require("express");
const router = express.Router();
const {
  CrearReserva,
  ObtenerReservas,
  actualizarEstadoReserva
} = require("../controllers/reserva.controller");

router.get("/reservas", ObtenerReservas);
router.post("/reservas", CrearReserva);
router.patch("/reservas/:id", actualizarEstadoReserva);

module.exports = router;
