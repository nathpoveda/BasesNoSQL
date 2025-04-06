const API_URL = "http://localhost:3000/api/proveedores";

// Cargar los datos del proveedor cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID del proveedor de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const proveedorId = urlParams.get('id');

    if (!proveedorId) {
        alert('No se proporcionó un ID de proveedor');
        window.location.href = '/indexproveedores.html';
        return;
    }

    try {
        // Cargar los datos del proveedor
        const response = await fetch(`${API_URL}/${proveedorId}`);
        if (!response.ok) {
            throw new Error('Error al cargar el proveedor');
        }
        const proveedor = await response.json();
        
        // Llenar el formulario con los datos del proveedor
        document.getElementById('proveedorId').value = proveedor._id;
        document.getElementById('nombre').value = proveedor.nombre;
        document.getElementById('numero').value = proveedor.numero;
        document.getElementById('correo').value = proveedor.correo;
        document.getElementById('fabricante').value = proveedor.fabricante;
        document.getElementById('tipoProducto').value = proveedor.tipoProducto;
        document.getElementById('direccion').value = proveedor.direccion;
        document.getElementById('fechaSuministro').value = new Date(proveedor.fechaSuministro).toISOString().split('T')[0];
        document.getElementById('calificacion').value = proveedor.calificacion;
        document.getElementById('cantidadSuministrada').value = proveedor.cantidadSuministrada;
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar el proveedor: ' + error.message);
        window.location.href = '/indexproveedores.html';
    }
});

// Manejar el envío del formulario
document.getElementById('editarProveedorForm').addEventListener('submit', async (e) => {
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
        console.log('Enviando datos actualizados:', proveedorData);
        const response = await fetch(`${API_URL}/${proveedorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proveedorData)
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Error al actualizar el proveedor');
        }

        alert('Proveedor actualizado exitosamente');
        window.location.href = '/indexproveedores.html';
    } catch (error) {
        console.error('Error completo:', error);
        alert(`Error al actualizar el proveedor: ${error.message}`);
    }
}); 