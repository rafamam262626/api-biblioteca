const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Listar libros con nombre del autor
router.get('/', async (req, res) => {
  try {
    const [filas] = await pool.execute(`
      SELECT l.*, a.nombre AS autor
      FROM libros l 
      LEFT JOIN autores a ON l.autor_id = a.id
      ORDER BY l.titulo
    `);
    res.json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo libro
router.post('/', async (req, res) => {
  const { titulo, anio, autor_id } = req.body;
  if (!titulo || !autor_id) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
  }
  try {
    const [resultado] = await pool.execute(
      'INSERT INTO libros (titulo, anio, autor_id) VALUES (?, ?, ?)',
      [titulo, anio || null, autor_id]
    );
    res.status(201).json({ id: resultado.insertId, titulo, anio, autor_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
