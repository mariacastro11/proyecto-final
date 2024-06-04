// Importación del paquete Mongoose para el modelado de objetos MongoDB
const mongoose = require('mongoose');

// Definición del esquema del producto utilizando la API de esquemas de Mongoose
const ProductSchema = new mongoose.Schema({
    // Nombre del producto
    name: {
        type: String, // Tipo de dato: String
        required: true // Campo obligatorio
    },
    // Precio del producto
    price: {
        type: Number, // Tipo de dato: Number
        required: true // Campo obligatorio
    },
    // URL de la imagen del producto
    imageUrl: {
        type: String, // Tipo de dato: String
        required: true // Campo obligatorio
    }
});

// Exportación del modelo de producto creado a partir del esquema definido
module.exports = mongoose.model('Product', ProductSchema);
