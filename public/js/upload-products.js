const token = localStorage.getItem('token');

if (!token) {
    console.error('No token found. Redirecting to login page.');
    window.location.href = 'login.html';
} else {
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

    const uploadProduct = async (product) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error(`Failed to upload product: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Product uploaded:', result);
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    };

    products.forEach(uploadProduct);
}
