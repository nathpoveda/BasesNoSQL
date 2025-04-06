const API_URL = "http://localhost:3000/api/recomendaciones";

// Cargar recomendaciones al iniciar la página
document.addEventListener('DOMContentLoaded', cargarRecomendaciones);

// Función para cargar las recomendaciones
async function cargarRecomendaciones() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al cargar las recomendaciones');
        }
        const recomendaciones = await response.json();
        mostrarRecomendaciones(recomendaciones);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar las recomendaciones: ' + error.message);
    }
}

// Función para mostrar las recomendaciones en la tabla
function mostrarRecomendaciones(recomendaciones) {
    const tbody = document.getElementById('recomendacionesTableBody');
    tbody.innerHTML = '';
    
    recomendaciones.forEach(recomendacion => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${recomendacion.fuente || ''}</td>
            <td>${recomendacion.cultivo || ''}</td>
            <td>${recomendacion.tipoCultivo || ''}</td>
            <td>${recomendacion.descripcion || ''}</td>
            <td>
                <span class="badge ${getBadgeClass(recomendacion.nivelDePrioridad)}">
                    ${recomendacion.nivelDePrioridad || ''}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarRecomendacion('${recomendacion._id}')" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarRecomendacion('${recomendacion._id}')" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para determinar la clase del badge según el nivel de prioridad
function getBadgeClass(nivelDePrioridad) {
    switch(nivelDePrioridad) {
        case 'Alta':
            return 'bg-danger';
        case 'Media':
            return 'bg-warning';
        case 'Baja':
            return 'bg-success';
        default:
            return 'bg-secondary';
    }
}

// Manejar el envío del formulario
document.getElementById('recomendacionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const recomendacionId = document.getElementById('recomendacionId').value;
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
        let response;
        if (recomendacionId) {
            response = await fetch(`${API_URL}/${recomendacionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recomendacionData)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recomendacionData)
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al guardar la recomendación');
        }

        const data = await response.json();
        console.log('Recomendación guardada:', data);
        
        resetForm();
        cargarRecomendaciones();
    } catch (error) {
        console.error('Error completo:', error);
        alert(`Error: ${error.message}`);
    }
});

// Función para editar una recomendación
function editarRecomendacion(id) {
    window.location.href = `/editarrecomendacion.html?id=${id}`;
}

// Función para eliminar una recomendación
async function eliminarRecomendacion(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta recomendación?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar la recomendación');
            }
            
            cargarRecomendaciones();
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert(`Error al eliminar la recomendación: ${error.message}`);
        }
    }
}

// Función para resetear el formulario
function resetForm() {
    document.getElementById('recomendacionId').value = '';
    document.getElementById('fuente').value = '';
    document.getElementById('cultivo').value = '';
    document.getElementById('tipoCultivo').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('nivelDePrioridad').value = 'Baja';
} 