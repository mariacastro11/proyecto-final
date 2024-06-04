// Importar el módulo 'express' para la creación de rutas
const express = require('express');
// Crear un enrutador de Express
const router = express.Router();
// Importar el controlador de autenticación
const authController = require('../controllers/authController');
// Importar el middleware de autenticación
const auth = require('../middleware/auth');

// Ruta para el registro de usuarios
router.post('/signup', authController.signup);

// Ruta para el inicio de sesión de usuarios
router.post('/login', authController.login);

// Ruta para obtener los datos del usuario (ruta protegida)
router.get('/user', auth, authController.getUser);

// Exportar el enrutador
module.exports = router;
