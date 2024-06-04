document.getElementById('login-button').addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
        window.location.href = 'collection.html';
    } else {
        alert('Login failed: ' + data.message);
    }
});
