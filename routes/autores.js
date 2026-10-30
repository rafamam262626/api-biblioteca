const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Listar todos los autores
router.get('/', async (req, res) => {
  try {
    const [filas] = await pool.execute('SELECT * FROM autores ORDER BY nombre');
    res.json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un autor por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [filas] = await pool.execute('SELECT * FROM autores WHERE id = ?', [id]);
    if (filas.length === 0) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    res.json(filas[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
