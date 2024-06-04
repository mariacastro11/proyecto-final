const jwt = require('jsonwebtoken');

// autenticacion de las paginas

// Middleware to authenticate token
module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, 'secret'); // Use a secure key in production
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
