// Importación del paquete Mongoose
const mongoose = require('mongoose');

// Definición de la función para conectar a la base de datos
const connectDB = async () => {
    try {
        // Conexión a MongoDB Atlas utilizando la URI proporcionada
        await mongoose.connect('mongodb+srv://mariana:bFVBLSxiLoKDgdJ3@cluster0.cssdjjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        // Mensaje de éxito si la conexión se establece correctamente
        console.log('MongoDB connected...');
    } catch (err) {
        // Manejo de errores: impresión del mensaje de error en caso de fallo
        console.error(err.message);
        // Terminar el proceso Node.js con un código de salida de 1 en caso de fallo en la conexión
        process.exit(1);
    }
};

// Exportación de la función connectDB para que pueda ser utilizada en otros archivos
module.exports = connectDB;
