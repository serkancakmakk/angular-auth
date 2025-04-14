const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(express.json()); // JSON verilerini almak için
app.use(cors()); // CORS ayarları

// Doğru rota tanımlamaları
app.use('/api', authRoutes); // authRoutes dosyasındaki rotaları kullan

module.exports = app;
