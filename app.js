require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Rutas
const librosRoutes = require('./routes/libros');
const autoresRoutes = require('./routes/autores');
const prestamosRoutes = require('./routes/prestamos');

app.use('/api/libros', librosRoutes);
app.use('/api/autores', autoresRoutes);
app.use('/api/prestamos', prestamosRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('Servidor activo. Rutas: /api/libros y /api/autores/prestamos');
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
});
