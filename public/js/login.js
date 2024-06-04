// Agregar un evento 'click' al botón de inicio de sesión
document.getElementById('login-button').addEventListener('click', async (e) => {
    // Prevenir el comportamiento predeterminado del formulario
    e.preventDefault();

    // Obtener los valores del correo electrónico y la contraseña de los campos de entrada
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Realizar una solicitud POST al servidor para iniciar sesión
    const response = await fetch('/api/auth/login', {
        method: 'POST', // Método de la solicitud: POST
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido: JSON
        },
        body: JSON.stringify({ email, password }), // Convertir los datos a formato JSON y enviarlos en el cuerpo de la solicitud
    });

    // Convertir la respuesta a formato JSON
    const data = await response.json();

    // Verificar si se recibió un token en la respuesta
    if (data.token) {
        // Si se recibió un token, almacenarlo en el localStorage del navegador
        localStorage.setItem('token', data.token);
        // Mostrar un mensaje de alerta indicando que el inicio de sesión fue exitoso
        alert('Login successful');
        // Redirigir al usuario a la página de colección de productos
        window.location.href = 'collection.html';
    } else {
        // Si no se recibió un token, mostrar un mensaje de alerta indicando que el inicio de sesión ha fallado junto con el mensaje de error recibido del servidor
        alert('Login failed: ' + data.message);
    }
});
