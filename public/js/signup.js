// Agregar un evento 'click' al botón de envío del formulario de registro
document.querySelector('button[type="submit"]').addEventListener('click', async (e) => {
    // Prevenir el comportamiento predeterminado del formulario
    e.preventDefault();

    // Obtener los valores del nombre, correo electrónico, contraseña y fecha de nacimiento de los campos de entrada
    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const dob = document.querySelector('input[type="date"]').value;

    // Realizar una solicitud POST al servidor para registrarse
    const response = await fetch('/api/auth/signup', {
        method: 'POST', // Método de la solicitud: POST
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido: JSON
        },
        // Convertir los datos a formato JSON y enviarlos en el cuerpo de la solicitud
        body: JSON.stringify({ name, email, password, dob }),
    });

    // Convertir la respuesta a formato JSON
    const data = await response.json();

    // Verificar si se recibió un token en la respuesta
    if (data.token) {
        // Si se recibió un token, almacenarlo en el localStorage del navegador
        localStorage.setItem('token', data.token);
        // Mostrar un mensaje de alerta indicando que el registro fue exitoso
        alert('Signup successful');
        // Redirigir al usuario a la página de colección de productos
        window.location.href = 'collection.html';
    } else {
        // Si no se recibió un token, mostrar un mensaje de alerta indicando que el registro ha fallado junto con el mensaje de error recibido del servidor
        alert('Signup failed: ' + data.message);
    }
});
