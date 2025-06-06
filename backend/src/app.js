const express = require('express')
const app = express()
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const deportesRoutes = require('./routes/deporte.routes')
const reservasRoutes = require('./routes/reserva.routes')

app.use(cors())
app.use(express.json())

// Rutas
app.use('/api', authRoutes)
app.use('/api', reservasRoutes)
app.use('/api', deportesRoutes)

app.get('/', (req, res) => {
    res.send('API DE RESERVAS DEPORTIVAS FUNCIONANDO')
})

module.exports = app