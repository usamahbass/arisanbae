# ArisanBae 🌸🪙

[![Twitter: usamahbass](https://img.shields.io/twitter/follow/usamahbass.svg?style=social)](https://twitter.com/usamahbass)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)

> **Aplikasi Buku Arisan Digital Modern, Adil, & Praktis untuk Ibu-Ibu.**  
> Catat iuran, undi pemenang transparan dengan animasi seru, kirim pengingat WhatsApp santun dalam 1 sentuhan, dan didukung asisten cerdas **Bubu 🌸🤖** yang bekerja 100% offline tanpa kuota internet!

---

## 💡 Latar Belakang & Munculnya Ide

Ide ini lahir ketika saya memperhatikan ibu saya yang sibuk mengurusi arisan warga. Beliau membuat tabel manual di buku catatan tebal, mengisi nama anggota satu demi satu, mencoret atau mencentang setiap ada yang bayar, dan menenteng buku tersebut ke mana pun arisan diadakan. Saat giliran mengocok pemenang, nama-nama digulung di sobekan kertas lalu dimasukkan ke dalam gelas atau botol.

Setelah berdiskusi dengan ibu saya, terdapat 3 masalah utama:
1. **Pencatatan Manual Melelahkan**: Pembuatan tabel berulang, rekap iuran rawan keliru, dan sulit melacak siapa yang belum bayar.
2. **Tidak Praktis**: Buku catatan fisik harus selalu dibawa dan rentan rusak, basah, atau hilang.
3. **Pengundian Konvensional**: Menggunakan gulungan kertas dalam gelas/botol yang memakan waktu dan berisiko tercecer.

**ArisanBae** hadir untuk menjawab semua masalah tersebut: cukup dari HP, seluruh catatan, undian, dan komunikasi grup arisan menjadi sangat praktis, adil, dan menyenangkan!

---

## 🚀 Apa Saja yang Berubah di Versi Revamp (v2.0)?

Aplikasi ini telah dirombak secara menyeluruh (*full revamp*) dari segi teknologi, estetika visual, maupun fungsionalitas:

### 1. Modernisasi Total Tech Stack
- **React 18 + TypeScript**: Arsitektur komponen terstruktur, modular, dan *type-safe*.
- **Vite 6**: Performa bundling ultra-cepat menggantikan toolchain lama.
- **Tailwind CSS 3**: Desain *mobile-first*, palet warna hijau zamrud (*emerald-teal*) yang elegan, dan dukungan **Mode Gelap (Dark Mode)** otomatis/manual.
- **Framer Motion**: Animasi putaran tabung undian yang hidup, transisi halaman mulus, dan efek selebrasi semburan konfeti (*canvas-confetti*).
- **TanStack Table v8**: Tabel pencatatan iuran interaktif berperforma tinggi dengan pencarian nama instan dan filter status lunas/belum.
- **React Hook Form + Zod**: Validasi form profesional dengan pesan kesalahan berwarna merah yang jelas di bawah tiap input (menghapus popup bawaan `alert()` yang mengganggu).

### 2. Identitas Brand & Desain Icon Baru (Semua Lini)
- **Desain Vector Icon Eksklusif**: Memadukan koin emas undian, kelopak bunga mekar (simbol kehangatan komunitas ibu-ibu), dan bintang keberuntungan di atas squircle zamrud.
- **Implementasi Terpadu**:
  - `public/favicon.svg` beresolusi tinggi untuk browser modern dan layar Retina.
  - Komponen React `<AppLogo />` berbasis SVG yang tajam dan skalabel di semua ukuran layar.
  - Tampil konsisten di bilah navigasi atas (*TopNavbar*), layar pembuka (*Welcome View*), header modal, hingga `manifest.json`.

### 3. BubuBot 🌸🤖: Asisten Pintar & Kamus Offline 100%
- Menghadirkan karakter asisten cerdas **Bubu** yang siap menjawab seluruh pertanyaan seputar fitur aplikasi tanpa memerlukan koneksi/kuota internet.
- **Fitur Chat Interaktif**: Pertanyaan populer sekali klik atau ketik bebas dengan pencocokan kata kunci cerdas berbahasa Indonesia.
- **Kamus Lengkap**: Panduan terstruktur tentang cara undi arisan, aturan uang kas, penambahan anggota, cara undi ulang, hingga pencadangan data.
- **Pemandu Awal**: Bubu menyapa pengguna langsung di **Langkah 1 Tour Guide** dan melalui kartu bantuan di layar awal saat data masih kosong.

### 4. Standarisasi Terminologi: Dari "Kocok" ke "Undi"
- Seluruh teks dan istilah di aplikasi telah diubah secara baku dan sopan dari kata *"Kocok"* menjadi **"Undi" / "Undian"** (tab navigasi, tombol utama, status putaran, dan pesan WhatsApp).

### 5. Validasi Undian Adil (Proteksi Belum Lunas)
- Tombol **"UNDI ARISAN SEKARANG"** otomatis terkunci (*disabled*) apabila masih ada peserta yang belum melunasi iuran pada putaran berjalan.
- Dilengkapi kartu peringatan ramah ibu-ibu dengan tombol aksi instan:
  - 📲 *Ingatkan via WA*
  - ✅ *Tandai Semua Lunas* (untuk setoran tunai sekaligus)
  - 📋 *Buka Tabel Iuran*

### 6. Fitur "Tempel dari WA (Cepat)" & Input Rupiah Otomatis
- **Import Peserta dari WhatsApp**: Cukup salin teks daftar nama dari chat WhatsApp (contoh: `1. Ibu Siti`, `2. Ibu Ani`), sistem langsung mengekstrak seluruh nama anggota secara otomatis ke daftar arisan!
- **Komponen Input Rupiah Cerdas**: Format nominal uang otomatis (`Rp 100.000`) dengan penanganan cursor dan tombol hapus (*backspace*) yang alami tanpa merusak angka.
- **Dropdown Kustom (CustomSelect)**: Komponen pilihan modern pengganti elemen `<select>` bawaan browser.

### 7. Multi-Grup Arisan Fleksibel
- Pengguna bisa mengelola banyak kelompok arisan sekaligus (misal: *Arisan RT 05*, *Arisan Keluarga Besar*, *Arisan Pengajian*) dan berpindah kelompok dengan satu sentuhan.
- Perhitungan otomatis uang kas/upah pengelola bendahara dan nominal hadiah bersih pemenang per putaran.

### 8. Integrasi WhatsApp 1-Klik
- Format pesan pengingat tagihan santun dengan rincian rekening bank/e-wallet bendahara.
- Format pengumuman pemenang putaran dengan ucapan selamat ceria.
- Laporan rekapitulasi riwayat putaran yang siap dibagikan ke grup WhatsApp.

### 9. Tour Guide & Onboarding Interaktif
- **Panduan Pengenalan (Tour Guide)**: Pemandu langkah demi langkah untuk pengguna baru.
- **Spotlight Tour**: Menyorot langsung komponen di antarmuka (header, kartu saldo, tabel, tombol undi, dan tombol WA).

### 10. Cadangkan & Pulihkan (Backup & Restore)
- Ekspor seluruh data kelompok dan riwayat putaran ke berkas `.json` untuk disimpan aman di HP.
- Fitur impor file cadangan untuk memulihkan data kapan pun.

---

## 🛠️ Ringkasan Fitur

| Kategori | Fitur | Keterangan |
| :--- | :--- | :--- |
| **Grup & Anggota** | Multi-Kelompok Arisan | Kelola banyak grup arisan tanpa batas |
| | Tempel Nama dari WA | Ekstraksi otomatis daftar peserta dari chat WhatsApp |
| | Pengaturan Uang Kas | Pisahkan iuran kotor, upah pengelola, dan hadiah bersih |
| **Pencatatan** | TanStack Table | Tabel responsif dengan pencarian nama & filter status |
| | Sekali Sentuh Lunas | Centang status setoran per individu atau tandai semua lunas |
| **Pengundian** | Simulator Mesin Undi | Animasi putaran acak adil dengan suara & konfeti |
| | Proteksi Belum Lunas | Tombol undi terkunci otomatis jika ada setoran yang tertunggak |
| | Pemenang Jamak | Mendukung lebih dari 1 pemenang per putaran |
| **Komunikasi** | WhatsApp 1-Klik | Format pesan tagihan, pengumuman juara, dan rekap riwayat |
| **Bantuan** | BubuBot Offline 🌸🤖 | Asisten AI lokal & kamus pintar 100% tanpa internet |
| | Tour Guide Interaktif | Panduan pemula & spotlight fitur |
| **Data & Tampilan** | Backup / Restore (.json) | Simpan dan pulihkan cadangan data secara aman |
| | Mode Gelap & Terang | Tampilan nyaman di mata kapan saja |
| | Identitas Vector SVG | Logo baru & favicon jernih di semua layar |

---

## 💻 Menjalankan Proyek Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan)
- NPM atau PNPM / Yarn

### Langkah Instalasi
1. Clone repositori ini:
   ```bash
   git clone https://github.com/usamahbass/arisanbae.git
   cd arisanbae
   ```

2. Pasang dependensi:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000/`.

4. Build untuk produksi:
   ```bash
   npm run build
   ```

---

## 👤 Author

**usamahbass**

- Website: [usamahbass](https://usamahbass.vercel.app)
- Twitter: [@usamahbass](https://twitter.com/usamahbass)
- GitHub: [@usamahbass](https://github.com/usamahbass)

---

## ⭐ Dukungan

Beri bintang ⭐️ pada repositori ini jika ArisanBae bermanfaat bagi ibu-ibu dan komunitas Anda!
