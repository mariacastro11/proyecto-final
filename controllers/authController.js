// Importación del paquete bcrypt para el hashing de contraseñas
const bcrypt = require('bcryptjs');
// Importación del paquete jsonwebtoken para la generación de tokens JWT
const jwt = require('jsonwebtoken');
// Importación del modelo de usuario
const User = require('../models/User');

// Controlador para el registro de usuarios
exports.signup = async (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { name, email, password, dob } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        let user = await User.findOne({ email });
        if (user) {
            // Si el usuario ya existe, devolver un error
            return res.status(400).json({ message: 'User already exists' });
        }

        // Crear un nuevo usuario
        user = new User({
            name,
            email,
            password,
            dob,
        });

        // Generar un salt para el hashing de la contraseña
        const salt = await bcrypt.genSalt(10);
        // Hashear la contraseña utilizando el salt generado
        user.password = await bcrypt.hash(password, salt);

        // Guardar el usuario en la base de datos
        await user.save();

        // Crear el payload para el token JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        // Firmar el token JWT con una clave secreta y establecer su tiempo de expiración
        jwt.sign(
            payload,
            'secret', // Usar una clave segura en producción
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                // Enviar el token como respuesta
                res.json({ token });
            }
        );
    } catch (err) {
        // Manejar errores del servidor
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Controlador para el inicio de sesión de usuarios
exports.login = async (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { email, password } = req.body;

    try {
        // Buscar al usuario por su dirección de correo electrónico
        let user = await User.findOne({ email });
        if (!user) {
            // Si el usuario no existe, devolver un error
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Si las contraseñas no coinciden, devolver un error
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Crear el payload para el token JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        // Firmar el token JWT con una clave secreta y establecer su tiempo de expiración
        jwt.sign(
            payload,
            'secret', // Usar una clave segura en producción
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                // Enviar el token como respuesta
                res.json({ token });
            }
        );
    } catch (err) {
        // Manejar errores del servidor
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Controlador para obtener información del usuario autenticado
exports.getUser = async (req, res) => {
    try {
        // Buscar al usuario por su ID y populando sus favoritos excluyendo la contraseña
        const user = await User.findById(req.user.id).populate('favorites', '-password');
        if (!user) {
            // Si el usuario no se encuentra, devolver un error
            return res.status(404).json({ message: 'User not found' });
        }
        // Enviar los datos del usuario como respuesta
        res.json(user);
    } catch (err) {
        // Manejar errores del servidor
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
