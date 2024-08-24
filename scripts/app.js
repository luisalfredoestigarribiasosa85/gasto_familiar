document.getElementById('gastoForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const descripcion = document.getElementById('descripcion').value;
    const monto = document.getElementById('monto').value;

    // Crear un nuevo elemento en la lista
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${descripcion}: ${monto} Gs`;

    // Añadir el nuevo gasto a la lista
    document.getElementById('listaGastos').appendChild(li);

    // Limpiar el formulario
    document.getElementById('gastoForm').reset();

    // Enviar los datos a Google Sheets
    enviarAGoogleSheets(descripcion, monto);
});

function enviarAGoogleSheets(descripcion, monto) {
    const url = "https://script.google.com/macros/s/AKfycbx1_EyBH_g6q8S4Kcp3XAahascFSKODV-coYwtB4U2SdPsmNRs1eaCPsszWOcQjdk7Tow/exec"; // Reemplaza con tu URL de Google Apps Script

    fetch(url, {
        method: 'POST',
        mode: 'cors', // Permitir solicitudes CORS
        body: JSON.stringify({ descripcion: descripcion, monto: monto }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos enviados a Google Sheets', data);
        })
        .catch(error => {
            console.error('Error al enviar los datos', error);
        });
}
