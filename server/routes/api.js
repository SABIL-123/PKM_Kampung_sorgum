import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// --- Helper: Read JSON file ---
const readJSON = (filename) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// --- Helper: Write JSON file ---
const writeJSON = (filename, data) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// =============================================
// GET /api/news - Ambil semua berita
// =============================================
router.get('/news', (req, res) => {
  try {
    const news = readJSON('news.json');
    res.json({ success: true, data: news });
  } catch (error) {
    console.error('Error reading news:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data berita' });
  }
});

// =============================================
// GET /api/gallery - Ambil semua gambar galeri
// =============================================
router.get('/gallery', (req, res) => {
  try {
    const gallery = readJSON('gallery.json');
    res.json({ success: true, data: gallery });
  } catch (error) {
    console.error('Error reading gallery:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data galeri' });
  }
});

// =============================================
// GET /api/stats - Data statistik
// =============================================
router.get('/stats', (req, res) => {
  try {
    const stats = {
      desaMitra: '15+',
      petaniTerdaftar: '500+',
      varianProduk: '20+',
      produksiTahunan: '100t+'
    };
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error reading stats:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data statistik' });
  }
});

// =============================================
// POST /api/contact - Kirim pesan kontak
// =============================================
router.post('/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validasi input
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Nama lengkap wajib diisi' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email wajib diisi' });
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Format email tidak valid' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Pesan wajib diisi' });
    }

    // Baca data kontak yang ada
    const contacts = readJSON('contacts.json');

    // Tambahkan kontak baru
    const newContact = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);

    // Simpan ke file
    writeJSON('contacts.json', contacts);

    console.log(`📩 Pesan baru dari ${newContact.name} (${newContact.email})`);

    res.status(201).json({
      success: true,
      message: 'Pesan berhasil dikirim! Terima kasih telah menghubungi kami.',
      data: { id: newContact.id }
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Gagal mengirim pesan. Silakan coba lagi.' });
  }
});

// =============================================
// GET /api/contacts - Lihat semua pesan (admin)
// =============================================
router.get('/contacts', (req, res) => {
  try {
    const contacts = readJSON('contacts.json');
    res.json({ success: true, data: contacts, total: contacts.length });
  } catch (error) {
    console.error('Error reading contacts:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data kontak' });
  }
});

export default router;
