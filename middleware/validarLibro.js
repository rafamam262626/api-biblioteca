// Importar herramientas de validación
const { body, validationResult } = require('express-validator');

// Reglas de validación
const validarLibro = [
  body('titulo')
    .notEmpty().withMessage('El título es obligatorio')
    .trim(),
  body('autor_id')
    .isInt({ min: 1 }).withMessage('El autor debe ser un número válido'),
  body('anio_publicacion')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('El año no es válido')
];

// Función para revisar si hay errores
const manejarErrores = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next(); // Si no hay errores → continúa con la ruta
};

module.exports = { validarLibro, manejarErrores };
