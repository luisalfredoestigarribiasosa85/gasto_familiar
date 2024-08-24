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
    const url = "https://script.google.com/macros/s/AKfycbzW4jNJ6y_7dW52BB7AeiH0WovgqDSoqKXjQZDBij6h-fg1IjZiRkOSv00vTi6eP1gpig/exec"; // Reemplaza con tu URL de Google Apps Script

    fetch(url, {
        method: 'POST',
        mode: 'cors', // Cambiado a 'cors' para permitir acceso a la respuesta
        body: JSON.stringify({ descripcion: descripcion, monto: monto }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Datos enviados a Google Sheets', data);
        })
        .catch(error => {
            console.error('Error al enviar los datos', error);
        });
}
