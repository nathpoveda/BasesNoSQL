const API_URL = "http://localhost:3000/api/proveedores";

// Cargar proveedores al iniciar la página
document.addEventListener('DOMContentLoaded', cargarProveedores);

// Función para cargar los proveedores
async function cargarProveedores() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al cargar los proveedores');
        }
        const proveedores = await response.json();
        mostrarProveedores(proveedores);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los proveedores: ' + error.message);
    }
}

// Función para mostrar los proveedores en la tabla
function mostrarProveedores(proveedores) {
    const tbody = document.getElementById('proveedoresTableBody');
    tbody.innerHTML = '';

    proveedores.forEach(proveedor => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${proveedor.nombre}</td>
            <td>${proveedor.numero}</td>
            <td>${proveedor.correo}</td>
            <td>${proveedor.fabricante}</td>
            <td>${proveedor.tipoProducto}</td>
            <td>${proveedor.direccion}</td>
            <td>${new Date(proveedor.fechaSuministro).toLocaleDateString()}</td>
            <td class="text-warning">${'★'.repeat(proveedor.calificacion)}${'☆'.repeat(5-proveedor.calificacion)}</td>
            <td>${proveedor.cantidadSuministrada}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="editarProveedor('${proveedor._id}')" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarProveedor('${proveedor._id}')" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para manejar el envío del formulario
document.getElementById('proveedorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const proveedorId = document.getElementById('proveedorId').value;
    const proveedorData = {
        nombre: document.getElementById('nombre').value,
        numero: document.getElementById('numero').value,
        correo: document.getElementById('correo').value,
        fabricante: document.getElementById('fabricante').value,
        tipoProducto: document.getElementById('tipoProducto').value,
        direccion: document.getElementById('direccion').value,
        fechaSuministro: document.getElementById('fechaSuministro').value,
        calificacion: parseInt(document.getElementById('calificacion').value),
        cantidadSuministrada: parseInt(document.getElementById('cantidadSuministrada').value)
    };

    try {
        console.log('Enviando datos:', proveedorData);
        const url = proveedorId ? `${API_URL}/${proveedorId}` : API_URL;
        const method = proveedorId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proveedorData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error al guardar el proveedor');
        }

        alert(proveedorId ? 'Proveedor actualizado exitosamente' : 'Proveedor creado exitosamente');
        resetForm();
        cargarProveedores();
    } catch (error) {
        console.error('Error completo:', error);
        alert(`Error al guardar el proveedor: ${error.message}`);
    }
});

// Función para editar un proveedor
function editarProveedor(id) {
    window.location.href = `/editarproveedores.html?id=${id}`;
}

// Función para eliminar un proveedor
async function eliminarProveedor(id) {
    if (confirm('¿Está seguro de que desea eliminar este proveedor?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el proveedor');
            }

            alert('Proveedor eliminado exitosamente');
            cargarProveedores();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar el proveedor: ' + error.message);
        }
    }
}

// Función para resetear el formulario
function resetForm() {
    document.getElementById('proveedorForm').reset();
    document.getElementById('proveedorId').value = '';
} 