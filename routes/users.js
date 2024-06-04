const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// @route   POST /api/users/favorites
// @desc    Add a product to user's favorites
// @access  Private
router.post('/favorites', auth, async (req, res) => {
    const { productId } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Add product to favorites if not already added
        if (!user.favorites.includes(productId)) {
            user.favorites.push(productId);
            await user.save();
        }

        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/users/favorites/:id
// @desc    Remove a product from user's favorites
// @access  Private
router.delete('/favorites/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Remove product from favorites
        user.favorites = user.favorites.filter(favorite => favorite.toString() !== req.params.id);
        await user.save();

        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/favorites', auth, async (req, res) => {
    try {
        
        const user = await User.findById(req.user.id).populate('favorites');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user.favorites);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
