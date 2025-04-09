// URL base de la API
const API_URL = 'http://localhost:3000/api/cultivos';

// Elementos del DOM
const cultivoForm = document.getElementById('cultivoForm');
const cultivosTableBody = document.getElementById('cultivosTableBody');

// Cargar cultivos al iniciar la página
document.addEventListener('DOMContentLoaded', cargarCultivos);

// Manejar el envío del formulario
cultivoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const cultivoId = document.getElementById('cultivoId').value;
    const cultivo = {
        nombreAgricultor: document.getElementById('nombreAgricultor').value,
        nombre: document.getElementById('nombre').value,
        tipo: document.getElementById('tipoCultivo').value,
        ubicacion: document.getElementById('ubicacion').value,
        estado: document.getElementById('estado').value,
        productoAplicado: document.getElementById('productoAplicado').value,
        fechaDeCultivo: document.getElementById('fechaDeCultivo').value || null,
        fechaDeCosecha: document.getElementById('fechaDeCosecha').value || null,
        cantidad: parseInt(document.getElementById('cantidad').value),
        descripcion: document.getElementById('descripcion').value
    };

    console.log('Datos a enviar:', cultivo);

    try {
        let response;
        if (cultivoId) {
            response = await fetch(`${API_URL}/${cultivoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cultivo)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cultivo)
            });
        }

        console.log('Respuesta del servidor:', response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);
            throw new Error(errorData.error || 'Error al guardar el cultivo');
        }

        const data = await response.json();
        console.log('Cultivo guardado:', data);
        
        resetForm();
        cargarCultivos();
    } catch (error) {
        console.error('Error completo:', error);
        alert(`Error: ${error.message}`);
    }
});

// Función para cargar todos los cultivos
async function cargarCultivos() {
    try {
        console.log('Cargando cultivos...');
        const response = await fetch(API_URL);
        console.log('Respuesta de cultivos:', response);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al cargar los cultivos');
        }
        
        const cultivos = await response.json();
        console.log('Cultivos recibidos:', cultivos);
        mostrarCultivos(cultivos);
    } catch (error) {
        console.error('Error al cargar cultivos:', error);
        alert(`Error al cargar los cultivos: ${error.message}`);
    }
}

// Función para mostrar los cultivos en la tabla
function mostrarCultivos(cultivos) {
    cultivosTableBody.innerHTML = '';
    cultivos.forEach(cultivo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cultivo.nombreAgricultor || ''}</td>
            <td>${cultivo.nombre || ''}</td>
            <td>${cultivo.tipo || ''}</td>
            <td>${cultivo.ubicacion || ''}</td>
            <td><span class="estado-${cultivo.estado ? cultivo.estado.toLowerCase().replace(' ', '-') : ''}">${cultivo.estado || ''}</span></td>
            <td>${cultivo.productoAplicado || ''}</td>
            <td>${cultivo.fechaDeCultivo ? formatearFecha(cultivo.fechaDeCultivo) : ''}</td>
            <td>${cultivo.fechaDeCosecha ? formatearFecha(cultivo.fechaDeCosecha) : ''}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarCultivo('${cultivo._id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarCultivo('${cultivo._id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        cultivosTableBody.appendChild(tr);
    });
}

// Función para formatear fechas
function formatearFecha(fecha) {
    try {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return fecha;
    }
}

// Función para eliminar un cultivo
async function eliminarCultivo(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este cultivo?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar el cultivo');
            }
            
            cargarCultivos();
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert(`Error al eliminar el cultivo: ${error.message}`);
        }
    }
}

// Función para editar un cultivo
function editarCultivo(id) {
    window.location.href = `/editarcultivo.html?id=${id}`;
}

// Función para resetear el formulario
function resetForm() {
    document.getElementById('cultivoId').value = '';
    document.getElementById('nombreAgricultor').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('tipoCultivo').value = '';
    document.getElementById('ubicacion').value = '';
    document.getElementById('estado').value = 'Activo';
    document.getElementById('productoAplicado').value = '';
    document.getElementById('fechaDeCultivo').value = '';
    document.getElementById('fechaDeCosecha').value = '';
    document.getElementById('cantidad').value = '1';
    document.getElementById('descripcion').value = '';
} 