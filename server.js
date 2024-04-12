const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

const PORT = 3000;

// Use task routes
app.use('/api', taskRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

function startServer() {
    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
}

module.exports = startServer;

