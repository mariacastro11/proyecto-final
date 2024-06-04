const mongoose = require('mongoose');

// Configuracion de la Base de datos

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB Atlas using the provided URI
        await mongoose.connect('mongodb+srv://mariana:bFVBLSxiLoKDgdJ3@cluster0.cssdjjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
