// URL base de la API
const API_URL = 'http://localhost:3000/api/cultivos';

// Elementos del DOM
const editCultivoForm = document.getElementById('editCultivoForm');
let cultivoId = null;

// Función para formatear la fecha para el input type="date"
function formatearFechaParaInput(fechaISO) {
    if (!fechaISO) return '';
    try {
        // Crear un objeto Date a partir de la cadena ISO
        const fecha = new Date(fechaISO);
        // Extraer año, mes y día. Asegurarse de que mes y día tengan dos dígitos.
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');
        // Devolver en formato YYYY-MM-DD
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error al formatear fecha para input:', error);
        return '';
    }
}


// Cargar datos del cultivo al iniciar la página
document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID del cultivo de la URL
    const params = new URLSearchParams(window.location.search);
    cultivoId = params.get('id');

    if (!cultivoId) {
        alert('No se proporcionó un ID de cultivo.');
        window.location.href = '/indexcultivos.html'; // Redirigir si no hay ID
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${cultivoId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al cargar el cultivo');
        }
        const cultivo = await response.json();

        // Llenar el formulario con los datos del cultivo
        document.getElementById('nombreAgricultor').value = cultivo.nombreAgricultor || '';
        document.getElementById('nombre').value = cultivo.nombre || '';
        document.getElementById('tipoCultivo').value = cultivo.tipo || '';
        document.getElementById('ubicacion').value = cultivo.ubicacion || '';
        document.getElementById('fechaDeCultivo').value = formatearFechaParaInput(cultivo.fechaDeCultivo);
        document.getElementById('fechaDeCosecha').value = formatearFechaParaInput(cultivo.fechaDeCosecha);
        document.getElementById('estado').value = cultivo.estado || '';
        document.getElementById('cantidad').value = cultivo.cantidad || 1;
        document.getElementById('productoAplicado').value = cultivo.productoAplicado || '';
        document.getElementById('descripcion').value = cultivo.descripcion || '';

    } catch (error) {
        console.error('Error al cargar los datos del cultivo:', error);
        alert(`Error al cargar los datos: ${error.message}`);
        window.location.href = '/indexcultivos.html'; // Redirigir en caso de error
    }
});

// Manejar el envío del formulario de edición
editCultivoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!cultivoId) {
        alert('Error: No se encontró el ID del cultivo.');
        return;
    }

    const cultivoActualizado = {
        nombreAgricultor: document.getElementById('nombreAgricultor').value,
        nombre: document.getElementById('nombre').value,
        tipo: document.getElementById('tipoCultivo').value,
        ubicacion: document.getElementById('ubicacion').value,
        fechaDeCultivo: document.getElementById('fechaDeCultivo').value || null,
        fechaDeCosecha: document.getElementById('fechaDeCosecha').value || null,
        estado: document.getElementById('estado').value,
        cantidad: parseInt(document.getElementById('cantidad').value),
        productoAplicado: document.getElementById('productoAplicado').value,
        descripcion: document.getElementById('descripcion').value
    };

    console.log('Datos a actualizar:', cultivoActualizado);

    try {
        const response = await fetch(`${API_URL}/${cultivoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cultivoActualizado)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del servidor al actualizar:', errorData);
            throw new Error(errorData.error || 'Error al actualizar el cultivo');
        }

        alert('Cultivo actualizado exitosamente!');
        window.location.href = '/indexcultivos.html'; // Redirigir a la lista después de actualizar

    } catch (error) {
        console.error('Error completo al actualizar:', error);
        alert(`Error al actualizar el cultivo: ${error.message}`);
    }
}); 