# Laporan Strategi Integrasi Headless CMS Kampung Sorgum

**Tanggal:** 16 Mei 2026
**Proyek:** Kampung Sorgum Frontend
**Tujuan:** Mengubah arsitektur *frontend* statis menjadi dinamis penuh yang dikendalikan melalui Headless CMS.

---

## 1. Arsitektur Pengambilan Data (Data Fetching Architecture)

Pendekatan strategis yang digunakan adalah **Centralized State Fetching**. Daripada setiap komponen memanggil API secara terpisah, data dari CMS diambil sekali di level teratas komponen aplikasi (`App.tsx`).

### Alur Kerja:
1.  **Inisialisasi Lingkungan:** Aplikasi membaca endpoint API dan API Key secara aman dari file konfigurasi `.env` (`VITE_CMS_API_LINK` & `VITE_CMS_API_KEY`).
2.  **Fetch & State:** Komponen `App.tsx` menjalankan `useEffect` saat *mounting* awal untuk mengambil keseluruhan *JSON payload*. Data yang berisi array dari semua halaman ini disimpan di *state* `cmsPages`.
3.  **Prop Drilling Terstruktur:** `App.tsx` bertugas memfilter halaman berdasarkan properti `slug` dan mengoperkan spesifik `pageData` ke setiap komponen seksi (`SectionHome`, `SectionProfile`, dll.).

---

## 2. Strategi Pemetaan Konten (Content Mapping Strategy)

Payload JSON dari Postman berisi struktur halaman berbasis *blocks* (seperti `hero`, `features`, `gallery`, `rich-text`). Berikut adalah strategi pemetaan untuk masing-masing seksi aplikasi:

### A. Halaman Beranda (`slug: beranda`)
-   **Kebutuhan UI:** Judul Utama (Headline), Deskripsi singkat (Sub-headline), Gambar bingkai ganda, dan Bagian Manfaat/Keuntungan Sorgum interaktif.
-   **Pemetaan CMS:**
    -   **Hero Block (`type: hero`)**: Mengekstrak `data.headline` (dipisahkan menggunakan *newline* `\n`) dan `data.sub_headline`. Ditambah pemetaan dinamis `data.background_image` untuk bingkai foto ganda di sisi kanan.
    -   **Benefits Block (`type: features`)**: Sistem secara dinamis mencari *content block* bertipe `features` yang memiliki kata kunci *"Manfaat"* atau *"Keuntungan"* di dalam field `data.title`. Jika blok ini ditemukan di CMS, frontend akan melakukan iterasi atas `data.items` untuk me-render judul, deskripsi, dan ikon bulir manfaat secara real-time. Jika tidak ditemukan, sistem otomatis mengaktifkan *High-Fidelity Safety Fallback* berisi 4 manfaat sorgum lengkap beserta ikon interaktifnya.

### B. Halaman Profil (`slug: profil`)
-   **Kebutuhan UI:** Teks hero, Sejarah, Visi, Misi, dan Gambar ilustrasi ganda.
-   **Pemetaan CMS:**
    -   `hero`: Digunakan sebagai judul utama seksi profil.
    -   `rich-text`: Konten berformat HTML yang akan di-*clean-up* dari tag pembungkus, di-render sebagai paragraf Sejarah.
    -   `features` (2 block): Difilter berdasarkan `data.title` ("Visi" atau "Misi") untuk mengisi kotak-kotak nilai inti.
    -   `gallery`: Mengekstrak 2 URL gambar dari *array* `images` untuk dirender pada *layout* gambar bersilangan (*offset*).

### C. Halaman Galeri (`slug: galeri`)
-   **Kebutuhan UI:** Judul seksi dan *Grid* masonry untuk foto-foto kegiatan.
-   **Pemetaan CMS:**
    -   `hero`: Menyuplai judul seksi "Galeri Kehidupan Desa".
    -   `gallery`: *Array* `data.images` dipetakan (map) untuk menghasilkan koleksi kartu animasi berbasis `framer-motion`.

### D. Halaman Berita (`slug: berita`)
-   **Kebutuhan UI:** Daftar kartu artikel (Gambar, Kategori, Tanggal, Judul, Deskripsi).
-   **Pemetaan CMS (Unik):** Karena struktur berita disimpan di CMS dalam bentuk kumpulan blok `gallery`, aplikasi melakukan iterasi terhadap *semua* blok bertipe `gallery` di halaman ini.
    -   `data.title` menjadi Judul Berita.
    -   `data.subtitle` menjadi Deskripsi/Cuplikan Berita.
    -   `data.images[0].url` menjadi *Thumbnail* Berita.
    -   *(Tanggal dan kategori sementara menggunakan nilai fallback default karena tidak ada pada struktur CMS)*.

### E. Halaman Hubungi Kami (`slug: hubungi-kami`)
-   **Kebutuhan UI:** Teks ajakan, Lokasi, Nomor HP, Email.
-   **Pemetaan CMS:**
    -   `hero`: Digunakan sebagai teks *call-to-action* untuk berkolaborasi.
    -   `contacts`: Mengekstrak `addresses[0]`, `phone_numbers[0]`, dan `emails[0]`.

### F. Halaman Gabung Mitra (`slug: gabung-mitra`)
-   **Kebutuhan UI:** Judul form dan daftar isian dinamis (Label input).
-   **Pemetaan CMS:**
    -   `hero`: Mengisi teks panduan formulir.
    -   `profile-tabs`: Meskipun tipe aslinya diperuntukkan bagi *tab*, aplikasi mengekstrak label-label pada `tabs.label` (seperti "Nama Lengkap", "Lokasi Operasional") dan menggunakan *string* tersebut secara langsung untuk menamai kolom-kolom `<input>` pada form pendaftaran.

---

## 3. Strategi Ketahanan (Resilience & Fallback)

Untuk mengubah web dari statis menjadi dinamis tanpa risiko UI "pecah" (broken) saat CMS lambat atau sedang mengalami *maintenance*, sebuah mekanisme **Safety Fallback** diterapkan dengan ketat:

-   **Optional Chaining (`?.`)**: Setiap pengambilan variabel dari JSON diakhiri dengan operator pengecekan (`pageData?.content?.find()`).
-   **Logical OR (`||`)**: Jika nilai dari CMS ditemukan *null*, kosong, atau belum terisi, aplikasi secara otomatis menampilkan nilai *string* statis *hardcoded* (contoh: `{heroData?.headline || "Misi Di Balik Setiap Bulir"}`).
-   **Conditional Rendering:** Jika *array* list berita atau galeri sama dengan nol (0), aplikasi akan menampilkan komponen *spinner* *loading* (lucide-react Loader2).

---

## 4. Kesimpulan

Rancangan ini berhasil melepaskan aplikasi dari teks internal (hardcode) dan secara mutlak memberikan kontrol konten (Copywriting, Teks Visi/Misi, URL Gambar) kepada sistem CMS. 

Mekanisme parsing *content blocks* yang modular di sisi *frontend* juga membuka fleksibilitas tinggi jika di masa depan terdapat penambahan tipe block baru di CMS tanpa harus merombak fondasi struktur React secara masif.
