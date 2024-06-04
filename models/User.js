// Importación del paquete Mongoose para el modelado de objetos MongoDB
const mongoose = require('mongoose');

// Definición del esquema del usuario utilizando la API de esquemas de Mongoose
const UserSchema = new mongoose.Schema({
    // Nombre del usuario
    name: {
        type: String, // Tipo de dato: String
        required: true, // Campo obligatorio
    },
    // Correo electrónico del usuario
    email: {
        type: String, // Tipo de dato: String
        required: true, // Campo obligatorio
        unique: true, // Debe ser único en la base de datos
    },
    // Contraseña del usuario
    password: {
        type: String, // Tipo de dato: String
        required: true, // Campo obligatorio
    },
    // Fecha de nacimiento del usuario
    dob: {
        type: Date, // Tipo de dato: Date
        required: true, // Campo obligatorio
    },
    // Lista de productos favoritos del usuario (referencia a documentos de la colección 'Product')
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId, // Tipo de dato: ObjectId
            ref: 'Product', // Referencia a la colección 'Product'
        }
    ],
});

// Exportación del modelo de usuario creado a partir del esquema definido
module.exports = mongoose.model('User', UserSchema);
