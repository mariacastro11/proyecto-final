document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
      console.error('No token found. Redirecting to login page.');
      window.location.href = 'login.html';
      return;
  }

  const productosContainer = document.getElementById('productos-container');

  if (!productosContainer) {
      console.error('Element with ID "productos-container" not found.');
      return;
  }

  try {
      const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
          },
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const products = await response.json();

      products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('producto');

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

          productElement.querySelector('.favorite-icon').addEventListener('click', async (e) => {
              const productId = e.target.getAttribute('data-id');
              await addToFavorites(productId);
              alert('Product added to favorites!');
          });

          productosContainer.appendChild(productElement);
      });
  } catch (error) {
      console.error('Error fetching products:', error);
  }
});

const addToFavorites = async (productId) => {
  const token = localStorage.getItem('token');
  
  try {
      const response = await fetch('/api/users/favorites', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
          },
          body: JSON.stringify({ productId })
      });

      if (!response.ok) {
          throw new Error(`Failed to add to favorites: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Added to favorites:', result);
  } catch (error) {
      console.error('Error adding to favorites:', error);
  }
};
