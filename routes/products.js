const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Asegúrate de que la ruta a tu modelo sea correcta

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/products
// @desc    Add a new product
// @access  Private
router.post('/', async (req, res) => {
    const { name, price, imageUrl } = req.body;

    try {
        const newProduct = new Product({
            name,
            price,
            imageUrl
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
