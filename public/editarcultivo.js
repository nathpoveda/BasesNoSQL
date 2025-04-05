const API_URL = "http://localhost:3000/api/cultivos";

// Obtener el ID del cultivo de la URL
const urlParams = new URLSearchParams(window.location.search);
const cultivoId = urlParams.get('id');

// Cargar los datos del cultivo al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    if (cultivoId) {
        try {
            console.log('Cargando cultivo para edición:', cultivoId);
            const response = await fetch(`${API_URL}/${cultivoId}`);
            if (!response.ok) {
                throw new Error('Error al cargar el cultivo');
            }
            const cultivo = await response.json();
            console.log('Cultivo cargado:', cultivo);
            
            // Llenar el formulario con los datos del cultivo
            document.getElementById('cultivoId').value = cultivo._id;
            document.getElementById('nombreAgricultor').value = cultivo.nombreAgricultor;
            document.getElementById('nombre').value = cultivo.nombre;
            document.getElementById('tipoCultivo').value = cultivo.tipoCultivo;
            document.getElementById('ubicacion').value = cultivo.ubicacion;
            document.getElementById('estado').value = cultivo.estado;
            document.getElementById('productoAplicado').value = cultivo.productoAplicado;
            
            // Formatear fechas para el input type="date"
            if (cultivo.fechaDeCultivo) {
                document.getElementById('fechaDeCultivo').value = new Date(cultivo.fechaDeCultivo).toISOString().split('T')[0];
            }
            if (cultivo.fechaDeCosecha) {
                document.getElementById('fechaDeCosecha').value = new Date(cultivo.fechaDeCosecha).toISOString().split('T')[0];
            }
        } catch (error) {
            console.error('Error al cargar el cultivo:', error);
            alert(`Error al cargar el cultivo para edición: ${error.message}`);
        }
    }
});

// Manejar el envío del formulario
document.getElementById('editarCultivoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const cultivoData = {
        nombreAgricultor: document.getElementById('nombreAgricultor').value,
        nombre: document.getElementById('nombre').value,
        tipoCultivo: document.getElementById('tipoCultivo').value,
        ubicacion: document.getElementById('ubicacion').value,
        estado: document.getElementById('estado').value,
        productoAplicado: document.getElementById('productoAplicado').value,
        fechaDeCultivo: document.getElementById('fechaDeCultivo').value,
        fechaDeCosecha: document.getElementById('fechaDeCosecha').value
    };

    console.log('Datos a enviar:', cultivoData);

    try {
        const response = await fetch(`${API_URL}/${cultivoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cultivoData)
        });

        console.log('Respuesta del servidor:', response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);
            throw new Error(errorData.error || 'Error al actualizar el cultivo');
        }

        const data = await response.json();
        console.log('Cultivo actualizado:', data);
        
        alert('Cultivo actualizado exitosamente');
        window.location.href = '/indexcultivos.html';
    } catch (error) {
        console.error('Error al actualizar el cultivo:', error);
        alert(`Error al actualizar el cultivo: ${error.message}`);
    }
}); 