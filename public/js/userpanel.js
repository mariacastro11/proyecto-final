// Evento que se dispara cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el token de autenticación almacenado en el localStorage del navegador
    const token = localStorage.getItem('token');
    
    // Verificar si no se encuentra un token en el localStorage
    if (!token) {
        // Si no se encuentra un token, redirigir al usuario a la página de inicio de sesión (login.html) y salir de la función
        window.location.href = 'login.html';
        return;
    }

    try {
        // Realizar una solicitud GET al servidor para obtener la información del usuario autenticado
        const response = await fetch('/api/auth/user', {
            headers: {
                'x-auth-token': token // Pasar el token de autenticación en el encabezado de la solicitud
            }
        });

        // Convertir la respuesta a formato JSON
        const data = await response.json();

        // Verificar si la respuesta contiene un error
        if (data.status === 'error') {
            // Si la respuesta contiene un error, mostrar un mensaje de alerta con el mensaje de error recibido y redirigir al usuario a la página de inicio de sesión (login.html)
            alert(data.message);
            window.location.href = 'login.html';
        } else {
            // Si la respuesta no contiene errores, mostrar la información del usuario en el panel de usuario
            document.getElementById('saludo').innerHTML = `Welcome ${data.name}`;
            document.getElementById('email').innerHTML = `Email: ${data.email}`;
            document.getElementById('user-info').innerHTML = `
                <p>Name: ${data.name}</p>
                <p>Date of Birth: ${data.dob}</p>
            `;

            // Realizar una solicitud GET al servidor para obtener la lista de productos favoritos del usuario
            const favoritesResponse = await fetch('/api/users/favorites', {
                method: 'GET', // Método de la solicitud: GET
                headers: {
                    'Content-Type': 'application/json', // Tipo de contenido: JSON
                    'x-auth-token': token // Pasar el token de autenticación en el encabezado de la solicitud
                },
            });

            // Verificar si la respuesta es exitosa
            if (!favoritesResponse.ok) {
                // Si la respuesta no es exitosa, lanzar un error con el mensaje de error recibido del servidor
                throw new Error(`Failed to fetch favorites: ${favoritesResponse.statusText}`);
            }

            // Convertir la respuesta a formato JSON
            const favorites = await favoritesResponse.json();

            // Obtener el contenedor de productos favoritos del DOM
            const favoritesContainer = document.getElementById('favorites-container');
            // Limpiar cualquier contenido existente en el contenedor
            favoritesContainer.innerHTML = '';

            // Iterar sobre cada producto favorito y renderizarlo en el DOM
            favorites.forEach(favorite => {
                const favoriteElement = document.createElement('div');
                favoriteElement.classList.add('favorite-item');

                // Agregar el contenido HTML del producto favorito al elemento del producto favorito
                favoriteElement.innerHTML = `
                    <img src="${favorite.imageUrl}" alt="" class="img-producto">
                    <div class="elementos-produc">
                        <div class="texto-producto">
                            <h2>$${favorite.price.toFixed(2)}</h2>
                            <a href="product.html" class="nombre-produc">${favorite.name}</a>
                        </div>
                        <span class="material-symbols-outlined delete-icon" data-id="${favorite._id}">delete</span>
                    </div>
                `;

                // Agregar un evento click al ícono de eliminar para eliminar el producto de favoritos
                favoriteElement.querySelector('.delete-icon').addEventListener('click', async (e) => {
                    const productId = e.target.getAttribute('data-id');
                    await removeFromFavorites(productId); // Llamar a la función removeFromFavorites para eliminar el producto de favoritos
                    alert('Product deleted from favorites!'); // Mostrar un mensaje de alerta después de eliminar el producto de favoritos
                    e.target.closest('.favorite-item').remove(); // Eliminar el elemento del producto favorito del DOM
                });

                // Agregar el elemento del producto favorito al contenedor de productos favoritos
                favoritesContainer.appendChild(favoriteElement);
            });
        }
    } catch (error) {
        // Manejar errores al obtener la información del usuario y los productos favoritos
        console.error('Error fetching user data:', error);
    }
});

// Función para eliminar un producto de la lista de favoritos del usuario
const removeFromFavorites = async (productId) => {
    // Obtener el token de autenticación almacenado en el localStorage del navegador
    const token = localStorage.getItem('token');

    try {
        // Realizar una solicitud DELETE al servidor para eliminar el producto de favoritos del usuario
        const response = await fetch(`/api/users/favorites/${productId}`, {
            method: 'DELETE', // Método de la solicitud: DELETE
            headers: {
                'Content-Type': 'application/json', // Tipo de contenido: JSON
                'x-auth-token': token // Pasar el token de autenticación en el encabezado de la solicitud
            }
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            // Si la respuesta no es exitosa, lanzar un error con el mensaje de error recibido del servidor
            throw new Error(`Failed to remove from favorites: ${response.statusText}`);
        }

        // Convertir la respuesta a formato JSON
        const result = await response.json();
        // Imprimir el resultado en la consola
        console.log('Removed from favorites:', result);
    } catch (error) {
        // Manejar errores al eliminar el producto de favoritos
        console.error('Error removing from favorites:', error);
    }
};

// Agregar un evento click al botón de cerrar sesión
document.getElementById('logout').addEventListener('click', () => {
    // Eliminar el token de autenticación del localStorage del navegador
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio (home.html)
    window.location.href = 'home.html';
});
