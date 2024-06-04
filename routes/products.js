// Importar el módulo 'express' para la creación de rutas
const express = require('express');
// Crear un enrutador de Express
const router = express.Router();
// Importar el modelo de Producto
const Product = require('../models/Product'); // Asegúrate de que la ruta a tu modelo sea correcta

// @route   GET /api/products
// @desc    Obtener todos los productos
// @access  Público
router.get('/', async (req, res) => {
    try {
        // Buscar todos los productos en la base de datos
        const products = await Product.find();
        // Enviar los productos encontrados como respuesta en formato JSON
        res.json(products);
    } catch (err) {
        // Manejar errores de servidor
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/products
// @desc    Agregar un nuevo producto
// @access  Privado
router.post('/', async (req, res) => {
    // Obtener los datos del producto del cuerpo de la solicitud
    const { name, price, imageUrl } = req.body;

    try {
        // Crear una nueva instancia de Producto con los datos proporcionados
        const newProduct = new Product({
            name,
            price,
            imageUrl
        });

        // Guardar el nuevo producto en la base de datos
        const product = await newProduct.save();
        // Enviar el producto creado como respuesta en formato JSON
        res.json(product);
    } catch (err) {
        // Manejar errores de servidor
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Exportar el enrutador
module.exports = router;
