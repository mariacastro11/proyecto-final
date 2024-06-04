// Evento que se dispara cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el token de autenticación almacenado en el localStorage
    const token = localStorage.getItem('token');
    
    // Verificar si no hay token
    if (!token) {
        // Si no hay token, mostrar un mensaje de error y redirigir a la página de inicio de sesión
        console.error('No token found. Redirecting to login page.');
        window.location.href = 'login.html';
        return;
    }

    // Obtener el contenedor de productos del DOM
    const productosContainer = document.getElementById('productos-container');

    // Verificar si no se encuentra el contenedor de productos
    if (!productosContainer) {
        // Si no se encuentra el contenedor, mostrar un mensaje de error y salir de la función
        console.error('Element with ID "productos-container" not found.');
        return;
    }

    try {
        // Realizar una solicitud GET al servidor para obtener la lista de productos
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token // Pasar el token de autenticación en el encabezado de la solicitud
            },
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            // Si la respuesta no es exitosa, lanzar un error con el mensaje de error recibido del servidor
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        // Convertir la respuesta a formato JSON
        const products = await response.json();

        // Iterar sobre cada producto obtenido y renderizarlo en el DOM
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('producto');

            // Agregar el contenido HTML del producto al elemento del producto
            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="" class="img-producto">
                <div class="elementos-produc">
                    <div class="texto-producto">
                        <h2>$${product.price.toFixed(2)}</h2>
                        <a href="product.html" class="nombre-produc">${product.name}</a>
                    </div>
                    <span class="material-symbols-outlined favorite-icon" data-id="${product._id}">favorite</span>
                </div>
            `;

            // Agregar un evento click al ícono de favorito para agregar el producto a favoritos
            productElement.querySelector('.favorite-icon').addEventListener('click', async (e) => {
                const productId = e.target.getAttribute('data-id');
                await addToFavorites(productId); // Llamar a la función addToFavorites para agregar el producto a favoritos
                alert('Product added to favorites!'); // Mostrar un mensaje de alerta después de agregar el producto a favoritos
            });

            // Agregar el elemento del producto al contenedor de productos
            productosContainer.appendChild(productElement);
        });
    } catch (error) {
        // Manejar errores al obtener la lista de productos
        console.error('Error fetching products:', error);
    }
});

// Función para agregar un producto a la lista de favoritos del usuario
const addToFavorites = async (productId) => {
    // Obtener el token de autenticación almacenado en el localStorage
    const token = localStorage.getItem('token');
    
    try {
        // Realizar una solicitud POST al servidor para agregar el producto a favoritos del usuario
        const response = await fetch('/api/users/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token // Pasar el token de autenticación en el encabezado de la solicitud
            },
            body: JSON.stringify({ productId }) // Enviar el ID del producto en el cuerpo de la solicitud
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            // Si la respuesta no es exitosa, lanzar un error con el mensaje de error recibido del servidor
            throw new Error(`Failed to add to favorites: ${response.statusText}`);
        }

        // Convertir la respuesta a formato JSON
        const result = await response.json();
        // Imprimir el resultado en la consola
        console.log('Added to favorites:', result);
    } catch (error) {
        // Manejar errores al agregar el producto a favoritos
        console.error('Error adding to favorites:', error);
    }
};
