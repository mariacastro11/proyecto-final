document.querySelector('button[type="submit"]').addEventListener('click', async (e) => {
    e.preventDefault();

    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const dob = document.querySelector('input[type="date"]').value;

    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, dob }),
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Signup successful');
        window.location.href = 'collection.html';
    } else {
        alert('Signup failed: ' + data.message);
    }
});
