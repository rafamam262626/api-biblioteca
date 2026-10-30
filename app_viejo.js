const express = require('express');
const app = express();
const PUERTO = 3000;
const pool = require('./config/db');

// Endpoint de bienvenida
app.get('/', (req, res) => {
  res.send('Servidor activo.');
});

// Endpoint de saludo
app.get('/saludo', (req, res) => {
  res.send('Bienvenido a la API de la biblioteca.');
});

app.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
});

app.use(express.json());
  // Obtener lista
app.get('/api/libros', (req, res) => {
  res.json([
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel   García Márquez' },
  { id: 2, titulo: 'El Aleph', autor: 'Jorge Luis Borges' },
  { id: 3, titulo: 'El alma Mater', autor: 'Rafael Martinez Mena' },
  { id: 4, titulo: 'Mi diario ', autor: 'Juan valdez' }
  ]);
  });

  // Obtener por ID
/*app.get('/api/libros/:id', (req, res) => {
const id = req.params.id;
res.json({ id, titulo: `Libro ${id}` });
}); */

// Crear
app.post('/api/libros', (req, res) => {
const nuevoLibro = req.body;
res.status(201).json({ mensaje: 'Libro creado', datos:
nuevoLibro });
});



async function probarConexion() {
try {
const conexion = await pool.getConnection();
console.log('Conectado a MySQL.');
conexion.release();
} catch (error) {
console.error('Error de conexión:', error.message);
}
}
probarConexion();
app.get('/api/libros/:id', (req, res) => {
  const id = req.params.id;
  res.json({ id, titulo: `Libro ${id}` });
  }); 
app.get('/api/libros/c', async (req, res) => {
  try {const [filas] = await pool.execute(`
  SELECT l.id, l.titulo, l.anio, a.nombre AS autor
  FROM libros l
  JOIN autores a ON l.autor_id = a.id
  ORDER BY l.titulo
  `);
  res.json(filas);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  });
  app.get('/api/libros/:id', async (req, res) => {
  const { id } = req.params;
  try {
  const [filas] = await pool.execute(
  'SELECT * FROM autores WHERE id = ?',
  [id]
  );
  if (filas.length === 0) {
  return res.status(404).json({ mensaje: 'Libro no   encontrado' });
  }
  res.json(filas[0]);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  });

