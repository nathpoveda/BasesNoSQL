const API_URL = "http://localhost:3000/api/usuarios";

// Función para alternar entre formularios de login y registro
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.classList.toggle('d-none');
    registerForm.classList.toggle('d-none');
}

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    alert(mensaje);
}

// Función para mostrar mensajes de éxito
function mostrarExito(mensaje) {
    alert(mensaje);
}

// Función para validar contraseña
function validarPassword(password) {
    // Mínimo 6 caracteres, al menos una letra y un número
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
}

// Manejar el inicio de sesión
document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        console.log('Intentando iniciar sesión con:', email);
        
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
        }

        console.log('Inicio de sesión exitoso:', data);
        
        // Guardar el token en localStorage
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userName', data.usuario.nombre);
        
        // Redirigir al usuario a la página principal
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Error en inicio de sesión:', error);
        mostrarError(error.message);
    }
});

// Manejar el registro
document.getElementById('formRegister').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('registerName').value.trim();
    const correo = document.getElementById('registerEmail').value.trim();
    const numero = document.getElementById('registerPhone').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validaciones del lado del cliente
    if (!nombre || !correo || !password) {
        mostrarError('Por favor complete todos los campos requeridos');
        return;
    }

    if (!validarPassword(password)) {
        mostrarError('La contraseña debe tener al menos 6 caracteres, una letra y un número');
        return;
    }

    if (password !== confirmPassword) {
        mostrarError('Las contraseñas no coinciden');
        return;
    }

    const userData = {
        nombre,
        correo,
        numero,
        password
    };

    try {
        console.log('Intentando registrar usuario:', userData.correo);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error('Respuesta no JSON:', text);
            throw new Error('La respuesta del servidor no es JSON válido');
        }
        
        if (!response.ok) {
            throw new Error(data.error || 'Error al registrar usuario');
        }

        console.log('Usuario registrado exitosamente:', data);
        mostrarExito('Usuario registrado exitosamente');
        
        // Limpiar el formulario
        document.getElementById('formRegister').reset();
        
        // Cambiar al formulario de login
        toggleForms();
    } catch (error) {
        console.error('Error en registro:', error);
        console.error('Detalles del error:', {
            message: error.message,
            stack: error.stack
        });
        mostrarError(error.message);
    }
}); 