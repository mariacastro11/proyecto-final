// Obtener el token de autenticación almacenado en el localStorage del navegador
const token = localStorage.getItem('token');

// Verificar si no se encuentra un token en el localStorage
if (!token) {
    // Si no se encuentra un token, mostrar un mensaje de error en la consola y redirigir al usuario a la página de inicio de sesión (login.html)
    console.error('No token found. Redirecting to login page.');
    window.location.href = 'login.html';
} else {
    // Si se encuentra un token en el localStorage, definir una lista de productos para subir
    const products = [
        {
            name: 'Exclusive Nike',
            price: 10999,
            imageUrl: './assets/image.png'
        },
        {
            name: 'Exclusive Pink Nike',
            price: 15998,
            imageUrl: './assets/image (1).png'
        },
        {
            name: 'Exclusive Blue Sport Nike',
            price: 20999,
            imageUrl: './assets/image (2).png'
        }
    ];

    // Definir una función asincrónica para subir un producto al servidor
    const uploadProduct = async (product) => {
        try {
            // Realizar una solicitud POST al servidor para subir el producto
            const response = await fetch('/api/products', {
                method: 'POST', // Método de la solicitud: POST
                headers: {
                    'Content-Type': 'application/json', // Tipo de contenido: JSON
                    'x-auth-token': token // Pasar el token de autenticación en el encabezado de la solicitud
                },
                // Convertir el producto a formato JSON y enviarlo en el cuerpo de la solicitud
                body: JSON.stringify(product)
            });

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                // Si la respuesta no es exitosa, lanzar un error con el mensaje de error recibido del servidor
                throw new Error(`Failed to upload product: ${response.statusText}`);
            }

            // Convertir la respuesta a formato JSON
            const result = await response.json();
            // Imprimir el resultado en la consola
            console.log('Product uploaded:', result);
        } catch (error) {
            // Manejar errores al subir el producto
            console.error('Error uploading product:', error);
        }
    };

    // Iterar sobre cada producto en la lista de productos y llamar a la función uploadProduct para subirlos al servidor
    products.forEach(uploadProduct);
}
