const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });
} else {
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.get('/aboutUs', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'aboutUs.html'));
    });

    app.get('/collection', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'collection.html'));
    });

    app.get('/help-section', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'help-section.html'));
    });

    app.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'home.html'));
    });

    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    });

    app.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'signup.html'));
    });

    app.get('/userpanel', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'userpanel.html'));
    });

    app.get('/upload-products', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'upload-products.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
