// Importar el módulo 'express' para la creación del servidor
const express = require('express');
// Importar la función de conexión a la base de datos MongoDB
const connectDB = require('./config/db');
// Importar el módulo 'cors' para permitir solicitudes desde otros dominios
const cors = require('cors');
// Importar el módulo 'path' para manejar rutas de archivos y directorios
const path = require('path');

// Crear una instancia de la aplicación Express
const app = express();

// Conectar a la base de datos MongoDB
connectDB();

// Configurar middleware
app.use(cors()); // Permitir solicitudes desde cualquier origen
app.use(express.json({ extended: false })); // Permitir el análisis de JSON en las solicitudes

// Definir las rutas de la API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === 'production') {
    // Si el entorno es producción, servir archivos estáticos desde la carpeta 'public'
    app.use(express.static('public'));

    // Ruta para la ruta raíz, sirve el archivo 'home.html' desde la carpeta 'public'
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'home.html'));
    });

    // Ruta para cualquier otra solicitud, sirve el archivo 'index.html' desde la carpeta 'public'
} else {
    // Si el entorno no es producción, servir archivos estáticos desde la carpeta 'public'

    // Rutas definidas para cada página en desarrollo
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'home.html'));
    });
    
    app.get('/aboutUs', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'aboutUs.html'));
    });
    app.get('/collection', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'collection.html'));
    });
    app.get('/help-section', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'help-section.html'));
    });
    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    });
    app.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'signup.html'));
    });
    app.get('/userpanel', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'userpanel.html'));
    });
    app.get('/upload-products', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'upload-products.html'));
    });
}

// Definir el puerto del servidor, utilizando el puerto proporcionado por el entorno o el puerto 5000 por defecto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor y escuchar en el puerto definido
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
