const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Express funciona 🎉'));
app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
