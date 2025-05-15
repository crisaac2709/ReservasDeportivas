const fs = require("fs")
const path = require("path");

const archivoDeportes = path.join(__dirname, '../database/deportes.json');

// Leer deportes desde JSON
const leerDeportes = () => {
  if (!fs.existsSync(archivoDeportes)) return [];
  const data = fs.readFileSync(archivoDeportes, 'utf-8');
  return data ? JSON.parse(data) : [];
};



// Guardar deportes en JSON
const guardarDeportes = (deportes) => {
  fs.writeFileSync(guardarDeportes, JSON.stringify(deportes, null, 2));
};


// Obtener todas los deportes (GET /api/deportes)
const ObtenerDeportes = (req, res) => {
  const deportes = leerDeportes();
  res.json(deportes);
};


module.exports = {
    ObtenerDeportes
}