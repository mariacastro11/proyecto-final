document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const response = await fetch('/api/auth/user', {
        headers: {
            'x-auth-token': token
        }
    });

    const data = await response.json();

    if (data.status === 'error') {
        alert(data.message);
        window.location.href = 'login.html';
    } else {
        document.getElementById('saludo').innerHTML = `Welcome ${data.name}`;
        document.getElementById('email').innerHTML = `Email: ${data.email}`;
        document.getElementById('user-info').innerHTML = `
            <p>Name: ${data.name}</p>
            <p>Date of Birth: ${data.dob}</p>
        `;

        try {
            const favoritesResponse = await fetch('/api/users/favorites', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
            });

            if (!favoritesResponse.ok) {
                throw new Error(`Failed to fetch favorites: ${favoritesResponse.statusText}`);
            }

            const favorites = await favoritesResponse.json();

            const favoritesContainer = document.getElementById('favorites-container');
            favoritesContainer.innerHTML = ''; // Clear any existing content

            favorites.forEach(favorite => {
                const favoriteElement = document.createElement('div');
                favoriteElement.classList.add('favorite-item');

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

                favoriteElement.querySelector('.delete-icon').addEventListener('click', async (e) => {
                    const productId = e.target.getAttribute('data-id');
                    await removeFromFavorites(productId);
                    alert('Product deleted from favorites!');
                    e.target.closest('.favorite-item').remove(); // Remove the favorite item from the DOM
                });

                favoritesContainer.appendChild(favoriteElement);
            });
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    }
});

const removeFromFavorites = async (productId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/api/users/favorites/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to remove from favorites: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Removed from favorites:', result);
    } catch (error) {
        console.error('Error removing from favorites:', error);
    }
};

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'home.html';
});
