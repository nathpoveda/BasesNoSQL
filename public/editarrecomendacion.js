const API_URL = "http://localhost:3000/api/recomendaciones";

// Obtener el ID de la recomendación de la URL
const urlParams = new URLSearchParams(window.location.search);
const recomendacionId = urlParams.get('id');

// Cargar los datos de la recomendación al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    if (recomendacionId) {
        try {
            console.log('Cargando recomendación para edición:', recomendacionId);
            const response = await fetch(`${API_URL}/${recomendacionId}`);
            if (!response.ok) {
                throw new Error('Error al cargar la recomendación');
            }
            const recomendacion = await response.json();
            console.log('Recomendación cargada:', recomendacion);
            
            // Llenar el formulario con los datos de la recomendación
            document.getElementById('recomendacionId').value = recomendacion._id;
            document.getElementById('fuente').value = recomendacion.fuente;
            document.getElementById('cultivo').value = recomendacion.cultivo;
            document.getElementById('tipoCultivo').value = recomendacion.tipoCultivo;
            document.getElementById('descripcion').value = recomendacion.descripcion;
            document.getElementById('nivelDePrioridad').value = recomendacion.nivelDePrioridad;
        } catch (error) {
            console.error('Error al cargar la recomendación:', error);
            alert(`Error al cargar la recomendación para edición: ${error.message}`);
        }
    }
});

// Manejar el envío del formulario
document.getElementById('editarRecomendacionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const recomendacionData = {
        fuente: document.getElementById('fuente').value,
        cultivo: document.getElementById('cultivo').value,
        tipoCultivo: document.getElementById('tipoCultivo').value,
        descripcion: document.getElementById('descripcion').value,
        nivelDePrioridad: document.getElementById('nivelDePrioridad').value,
        fechaDeRegistro: new Date()
    };

    console.log('Datos a enviar:', recomendacionData);

    try {
        const response = await fetch(`${API_URL}/${recomendacionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recomendacionData)
        });

        console.log('Respuesta del servidor:', response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);
            throw new Error(errorData.error || 'Error al actualizar la recomendación');
        }

        const data = await response.json();
        console.log('Recomendación actualizada:', data);
        
        alert('Recomendación actualizada exitosamente');
        window.location.href = '/indexrecomendacion.html';
    } catch (error) {
        console.error('Error al actualizar la recomendación:', error);
        alert(`Error al actualizar la recomendación: ${error.message}`);
    }
}); 