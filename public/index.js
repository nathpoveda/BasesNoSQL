// Verificar si el usuario está autenticado
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    // Mostrar el nombre del usuario en la barra de navegación
    const userName = localStorage.getItem('userName');
    if (userName) {
        const navbarNav = document.querySelector('#navbarNav ul');
        const userItem = document.createElement('li');
        userItem.className = 'nav-item';
        userItem.innerHTML = `
            <span class="nav-link">
                <i class="fas fa-user me-2"></i>${userName}
            </span>
        `;
        navbarNav.appendChild(userItem);

        // Agregar botón de cierre de sesión
        const logoutItem = document.createElement('li');
        logoutItem.className = 'nav-item';
        logoutItem.innerHTML = `
            <a class="nav-link" href="#" onclick="logout()">
                <i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
            </a>
        `;
        navbarNav.appendChild(logoutItem);
    }
});

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    window.location.href = '/login.html';
} 