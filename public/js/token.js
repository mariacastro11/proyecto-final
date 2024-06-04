// Obtener el token de autenticación almacenado en el localStorage del navegador
const token = localStorage.getItem('token');

// Verificar si no se encuentra un token en el localStorage
if (!token) {
    // Si no se encuentra un token, redirigir al usuario a la página de inicio de sesión (login.html)
    window.location.href = 'login.html';
}
