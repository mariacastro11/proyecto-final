// Importar el módulo 'express' para la creación de rutas
const express = require('express');
// Crear un enrutador de Express
const router = express.Router();
// Importar el modelo de Usuario
const User = require('../models/User');
// Importar el modelo de Producto
const Product = require('../models/Product');
// Importar el middleware de autenticación
const auth = require('../middleware/auth');

// @route   POST /api/users/favorites
// @desc    Agregar un producto a los favoritos del usuario
// @access  Privado
router.post('/favorites', auth, async (req, res) => {
    // Obtener el ID del producto del cuerpo de la solicitud
    const { productId } = req.body;

    try {
        // Buscar al usuario por su ID
        const user = await User.findById(req.user.id);
        // Verificar si el usuario existe
        if (!user) {
            // Si el usuario no existe, devolver un mensaje de error
            return res.status(404).json({ msg: 'User not found' });
        }

        // Agregar el producto a los favoritos del usuario si aún no ha sido agregado
        if (!user.favorites.includes(productId)) {
            user.favorites.push(productId);
            await user.save();
        }

        // Enviar la lista actualizada de productos favoritos del usuario como respuesta en formato JSON
        res.json(user.favorites);
    } catch (err) {
        // Manejar errores de servidor
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/users/favorites/:id
// @desc    Eliminar un producto de los favoritos del usuario
// @access  Privado
router.delete('/favorites/:id', auth, async (req, res) => {
    try {
        // Buscar al usuario por su ID
        const user = await User.findById(req.user.id);
        // Verificar si el usuario existe
        if (!user) {
            // Si el usuario no existe, devolver un mensaje de error
            return res.status(404).json({ msg: 'User not found' });
        }

        // Filtrar el producto que se va a eliminar de la lista de favoritos del usuario
        user.favorites = user.favorites.filter(favorite => favorite.toString() !== req.params.id);
        // Guardar los cambios en la base de datos
        await user.save();

        // Enviar la lista actualizada de productos favoritos del usuario como respuesta en formato JSON
        res.json(user.favorites);
    } catch (err) {
        // Manejar errores de servidor
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Ruta para obtener los productos favoritos del usuario
router.get('/favorites', auth, async (req, res) => {
    try {
        // Buscar al usuario por su ID y obtener la lista de productos favoritos, incluyendo detalles de los productos
        const user = await User.findById(req.user.id).populate('favorites');
        // Verificar si el usuario existe
        if (!user) {
            // Si el usuario no existe, devolver un mensaje de error
            return res.status(404).json({ msg: 'User not found' });
        }

        // Enviar la lista de productos favoritos del usuario como respuesta en formato JSON
        res.json(user.favorites);
    } catch (err) {
        // Manejar errores de servidor
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Exportar el enrutador
module.exports = router;
