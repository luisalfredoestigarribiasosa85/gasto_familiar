const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Asegúrate de haber instalado node-fetch correctamente

const app = express();
const port = process.env.PORT || 3000; // Puedes cambiar el puerto si es necesario

// Configuración de CORS
app.use(cors());
app.use(express.json());

// Ruta para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor intermedio en funcionamiento');
});

// Ruta para manejar las solicitudes POST
app.post('/enviar', async (req, res) => {
    try {
        const { descripcion, monto } = req.body;

        // URL de Google Apps Script
        const url = 'https://script.google.com/macros/s/AKfycbw81y6kDbZ83ds54u2oVo0-VTDfZIZSmDmfmhWqONTfEkDQQ7IxwuUEZCfDMp1UrqVZwA/exec';

        // Realizar la solicitud a Google Apps Script
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descripcion, monto })
        });

        const text = await response.text(); // Cambiado a .text() temporalmente
        console.log('Respuesta del Google Apps Script:', text);

        // Puedes intentar analizar manualmente la respuesta
        let data;
        try {
            data = JSON.parse(text); // Intenta analizarlo como JSON
        } catch (error) {
            console.error('Error al analizar la respuesta JSON:', error);
            return res.status(500).json({ status: 'error', message: 'Error al analizar la respuesta JSON' });
        }

        res.json(data);


    } catch (error) {
        console.error('Error en la solicitud:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
