import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// =============================================
// Middleware
// =============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for development (Vite dev server on port 3000)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request logging
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString('id-ID');
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// =============================================
// API Routes
// =============================================
app.use('/api', apiRoutes);

// Serve Static Assets (Gallery images, etc)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// =============================================
// Serve React Static Files (Production)
// =============================================
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Fallback: serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// =============================================
// Start Server
// =============================================
app.listen(PORT, () => {
  console.log('');
  console.log('🌾 ===================================');
  console.log('🌾  Kampung Sorgum Back-End Server');
  console.log(`🌾  Running on http://localhost:${PORT}`);
  console.log('🌾 ===================================');
  console.log('');
  console.log('📡 API Endpoints:');
  console.log(`   GET  http://localhost:${PORT}/api/news`);
  console.log(`   GET  http://localhost:${PORT}/api/gallery`);
  console.log(`   GET  http://localhost:${PORT}/api/stats`);
  console.log(`   POST http://localhost:${PORT}/api/contact`);
  console.log(`   GET  http://localhost:${PORT}/api/contacts`);
  console.log('');
});
