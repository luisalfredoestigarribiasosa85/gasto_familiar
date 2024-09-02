const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor intermedio en funcionamiento');
});

// Ruta POST /enviar
app.post('/enviar', async (req, res) => {
    try {
        const { descripcion, monto } = req.body;

        // URL de Google Apps Script
        const url = 'https://script.google.com/macros/s/AKfycbw81y6kDbZ83ds54u2oVo0-VTDfZIZSmDmfmhWqONTfEkDQQ7IxwuUEZCfDMp1UrqVZwA/exec';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descripcion, monto })
        });

        const text = await response.text();
        console.log('Respuesta del Google Apps Script:', text);

        res.json({ message: 'Datos enviados correctamente', response: text });
    } catch (error) {
        console.error('Error en la solicitud:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
