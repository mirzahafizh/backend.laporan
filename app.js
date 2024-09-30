const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import routes yang berisi controller user
const laporanRoutes = require('./routes/laporanRoutes'); // Import routes yang berisi controller user
const sequelize = require('./config/config'); // Import konfigurasi database Sequelize
const laporan = require('./models/laporan');

const app = express();

// Konfigurasi CORS (default, mengizinkan semua domain)
app.use(cors())// Jika ingin menggunakan opsi CORS terbatas, aktifkan yang ini:
const corsOptions = { // Ubah dengan domain yang diizinkan
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
};
app.use(cors(corsOptions)); // Gunakan ini jika ingin membatasi domain

// Middleware
app.use(bodyParser.json()); // Parsing JSON request
app.use(bodyParser.urlencoded({ extended: true })); // Parsing URL-encoded request

// Routes
app.use('/api', userRoutes); // Semua route user akan diawali dengan '/api'
app.use('/api', laporanRoutes); // Semua route laporan juga diawali dengan '/api'

// Route untuk halaman utama
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

// Handle error jika route tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Endpoint not found!'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred!',
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}