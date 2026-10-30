require('dotenv').config();

const pool = require('../config/db');

const listar = async (req, res) => {
try {
const [filas] = await pool.execute(`
SELECT l.*, a.nombre AS autor
FROM libros l LEFT JOIN autores a ON l.autor_id = a.id
`);
res.json(filas);
} catch (error) {
res.status(500).json({ error: error.message });}
};
const crear = async (req, res) => {
const { titulo, anio, autor_id } = req.body;
if (!titulo || !autor_id) {
return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
}
try {
const [resul] = await pool.execute(
'INSERT INTO libros (titulo, anio, autor_id) VALUES (?, ?, ?)',
[titulo, anio || null, autor_id]
);
res.status(201).json({ id: resul.insertId, titulo, anio, autor_id });
} catch (error) {
res.status(500).json({ error: error.message });
}
};
module.exports = { listar, crear };