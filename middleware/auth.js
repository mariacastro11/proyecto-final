// Importación del paquete jsonwebtoken para la verificación de tokens JWT
const jwt = require('jsonwebtoken');

// Middleware para autenticar el token
module.exports = function (req, res, next) {
    // Obtener el token del encabezado de la solicitud
    const token = req.header('x-auth-token');

    // Verificar si no hay token
    if (!token) {
        // Si no hay token, devolver un error de autorización
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verificar el token
    try {
        // Decodificar el token para obtener la información del usuario
        const decoded = jwt.verify(token, 'secret'); // Usar una clave segura en producción
        // Asignar la información del usuario al objeto 'user' en la solicitud
        req.user = decoded.user;
        // Continuar con la ejecución del middleware siguiente
        next();
    } catch (err) {
        // En caso de que el token no sea válido, devolver un error
        res.status(401).json({ message: 'Token is not valid' });
    }
};
