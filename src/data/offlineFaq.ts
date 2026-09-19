import { TabType } from '../components/layout/BottomNavigation';

export interface FaqItem {
  id: string;
  question: string;
  category: 'undian' | 'iuran' | 'anggota' | 'whatsapp' | 'grup' | 'keamanan';
  keywords: string[];
  answer: string;
  tips?: string;
  actionLabel?: string;
  actionTab?: TabType;
}

export const OFFLINE_FAQS: FaqItem[] = [
  {
    id: 'cara-undi',
    question: 'Bagaimana cara mengundi pemenang arisan?',
    category: 'undian',
    keywords: ['undi', 'mengundi', 'kocok', 'pemenang', 'dapat', 'giliran', 'mesin', 'putar'],
    answer:
      'Untuk mengundi pemenang:\n1. Buka tab "Undi" (ikon dadu di menu bawah).\n2. Pastikan semua peserta di putaran ini sudah berstatus LUNAS.\n3. Tekan tombol besar "UNDI ARISAN SEKARANG".\n4. Tabung undian akan berputar mengacak nama dan memunculkan pemenang beserta semburan konfeti!\n5. Ibu bisa langsung menekan tombol "Umumkan ke WhatsApp" untuk membagikan ucapan selamat ke grup.',
    tips: 'Anggota yang sudah pernah menang tidak akan diundi lagi secara otomatis.',
    actionLabel: 'Buka Tab Undian 🎁',
    actionTab: 'lottery',
  },
  {
    id: 'syarat-undi',
    question: 'Kenapa tombol "UNDI ARISAN" tidak bisa diklik / berwarna abu-abu?',
    category: 'undian',
    keywords: ['syarat', 'mati', 'disabled', 'abu', 'tidak bisa', 'kenapa', 'gagal', 'belum bayar', 'terkunci'],
    answer:
      'Tombol undian sengaja dikunci agar proses arisan tetap adil dan tertib! Ada 2 kemungkinan:\n\n1. Masih ada anggota yang BELUM LUNAS iuran di putaran ini. Semua peserta wajib lunas sebelum undian dimulai.\n2. Jika anggota sudah bayar tunai, Ibu Bendahara cukup klik tombol "Tandai Semua Lunas" di kotak peringatan atau di tab Iuran.\n3. Semua anggota sudah pernah memenangkan arisan (putaran telah selesai seluruhnya).',
    tips: 'Tekan tombol "Tandai Semua Lunas" jika semua ibu-ibu sudah setor uang arisan.',
    actionLabel: 'Periksa Catatan Iuran 📋',
    actionTab: 'table',
  },
  {
    id: 'catat-iuran',
    question: 'Bagaimana cara mencatat siapa yang sudah atau belum bayar?',
    category: 'iuran',
    keywords: ['catat', 'iuran', 'bayar', 'lunas', 'belum', 'centang', 'tabel', 'status', 'tagihan', 'setor'],
    answer:
      'Pencatatan iuran sangat mudah:\n1. Buka tab "Iuran" di menu bawah.\n2. Di samping nama tiap anggota, ada tombol status: hijau ("Lunas") atau merah ("Belum Bayar").\n3. Cukup sentuh tombol tersebut 1 kali untuk mengganti status bayar.\n4. Ibu juga bisa menggunakan filter di atas tabel untuk melihat hanya yang "Belum Bayar" atau yang "Sudah Lunas".\n5. Jika semua sudah membayar, gunakan tombol sakti "Tandai Semua Lunas"!',
    tips: 'Ada fitur pencarian nama di atas tabel untuk mencari anggota dengan cepat.',
    actionLabel: 'Buka Tabel Iuran 📋',
    actionTab: 'table',
  },
  {
    id: 'tambah-anggota',
    question: 'Bagaimana cara menambah anggota baru ke arisan yang sudah berjalan?',
    category: 'anggota',
    keywords: ['tambah', 'anggota', 'peserta', 'baru', 'masuk', 'nama', 'ikut'],
    answer:
      'Ibu bisa menambah anggota kapan saja:\n1. Masuk ke tab "Iuran".\n2. Tekan tombol hijau "+ Tambah Peserta" di samping kotak pencarian.\n3. Masukkan nama peserta (contoh: Ibu Linda) dan nomor WhatsApp (opsional).\n4. Tekan tombol "Simpan Peserta".\n5. Sistem otomatis menambahkan putaran baru dan memperbarui jadwal arisan!',
    tips: 'Nomor WhatsApp opsional, namun berguna jika ingin kirim chat personal.',
    actionLabel: 'Buka Tabel Iuran 📋',
    actionTab: 'table',
  },
  {
    id: 'tempel-wa',
    question: 'Bagaimana cara cepat tempel daftar nama dari chat WhatsApp?',
    category: 'anggota',
    keywords: ['tempel', 'wa', 'whatsapp', 'salin', 'copy', 'paste', 'cepat', 'daftar nama', 'sekaligus'],
    answer:
      'Saat membuat arisan baru di Langkah 3 (Peserta):\n1. Pilih mode "Tempel dari WA (Cepat)".\n2. Buka grup WA arisan, salin (copy) daftar nama anggota.\n3. Tempelkan (paste) ke dalam kotak teks yang tersedia.\n4. Sistem ArisanBae otomatis membersihkan nomor awalan seperti 1., 2), *, -, atau •.\n5. Di bawah kotak teks akan tertera jumlah orang yang berhasil terdeteksi!',
    tips: 'Pastikan tiap nama berada di baris baru (tekan Enter).',
    actionLabel: 'Lihat Beranda 🏠',
    actionTab: 'home',
  },
  {
    id: 'kirim-wa',
    question: 'Bagaimana cara mengirim pesan pengingat tagihan ke grup WhatsApp?',
    category: 'whatsapp',
    keywords: ['kirim', 'wa', 'whatsapp', 'ingatkan', 'tagihan', 'pesan', 'format', 'pengingat', 'grup'],
    answer:
      'Ibu tidak perlu mengetik pesan pengingat yang panjang secara manual:\n1. Di tab Beranda atau Iuran, tekan tombol "Ingatkan WA" (ikon pesawat kertas).\n2. Sistem otomatis membuatkan format pesan sopan yang berisi daftar nama anggota yang belum bayar dan nominal iurannya.\n3. Tekan "Kirim ke Grup WhatsApp" atau salin teks untuk dibagikan langsung.',
    tips: 'Pesan sudah menyertakan doa keberkahan yang ramah khas ibu-ibu!',
    actionLabel: 'Buka Beranda 🏠',
    actionTab: 'home',
  },
  {
    id: 'uang-kas',
    question: 'Apa itu Uang Kas / Upah Pengelola?',
    category: 'iuran',
    keywords: ['uang kas', 'kas', 'upah', 'pengelola', 'bendahara', 'potongan', 'jasa', 'admin'],
    answer:
      'Uang Kas / Upah Pengelola adalah nominal opsional yang dipotong dari total iuran sebelum diserahkan ke pemenang undian.\n\nContoh:\n- 10 orang iuran Rp 100.000 = Total Rp 1.000.000.\n- Jika uang kas diatur Rp 50.000, maka hadiah pemenang adalah Rp 950.000, dan Rp 50.000 masuk ke kas kelompok arisan atau konsumsi pertemuan.\n- Jika tidak ada uang kas, cukup isi angka 0.',
    tips: 'Pengaturan kas bisa diatur saat pertama kali membuat kelompok arisan.',
  },
  {
    id: 'ganti-grup',
    question: 'Bisakah saya mengelola lebih dari satu kelompok arisan?',
    category: 'grup',
    keywords: ['grup', 'kelompok', 'banyak', 'ganti', 'pindah', 'rt', 'keluarga', 'pkk', 'multi'],
    answer:
      'Bisa banget, Bu! ArisanBae mendukung multi-kelompok tanpa batas:\n1. Sentuh nama kelompok arisan di bagian paling atas layar (Top Navbar).\n2. Akan muncul daftar kelompok arisan yang Ibu miliki (misal: Arisan RT 05, Arisan Keluarga, Arisan Pengajian).\n3. Sentuh nama kelompok untuk langsung berpindah data.\n4. Ibu juga bisa menekan tombol "+ Buat Kelompok Arisan Baru" untuk membuat grup baru.',
    tips: 'Data tiap kelompok arisan terpisah rapi dan aman.',
  },
  {
    id: 'backup-restore',
    question: 'Bagaimana cara mencadangkan (backup) data agar tidak hilang jika ganti HP?',
    category: 'keamanan',
    keywords: ['cadangkan', 'backup', 'simpan', 'pindah', 'file', 'json', 'impor', 'ekspor', 'hilang', 'aman'],
    answer:
      'Agar data arisan aman saat ganti HP:\n1. Buka tab "Riwayat" di menu bawah.\n2. Gulir ke bagian Pengaturan & Cadangan Data.\n3. Tekan "Unduh Cadangan (.json)". File data arisan akan otomatis tersimpan di HP Ibu.\n4. Di HP baru, buka ArisanBae dan pilih "Punya Cadangan? Impor File (.json)" lalu pilih file yang tadi diunduh.',
    tips: 'Disarankan mengunduh cadangan sebulan sekali setelah pertemuan arisan.',
    actionLabel: 'Buka Tab Riwayat 📜',
    actionTab: 'history',
  },
  {
    id: 'reset-undian',
    question: 'Bagaimana jika salah undi atau ingin undi ulang?',
    category: 'undian',
    keywords: ['batal', 'ulang', 'reset', 'salah', 'keliru', 'kocok ulang', 'undi ulang'],
    answer:
      'Jika terjadi kekeliruan saat mengundi:\n1. Buka tab "Undi".\n2. Di bawah tombol pengumuman, tekan tombol merah bertuliskan "Undi Ulang / Reset Putaran Ini".\n3. Status pemenang pada putaran tersebut akan dibatalkan, dan nama pemenang kembali masuk ke daftar peserta yang belum menang.',
    tips: 'Fitur ini aman dan tidak akan merusak catatan pembayaran iuran.',
    actionLabel: 'Buka Tab Undian 🎁',
    actionTab: 'lottery',
  },
  {
    id: 'tema-aplikasi',
    question: 'Bagaimana cara mengaktifkan Mode Gelap (Dark Mode)?',
    category: 'keamanan',
    keywords: ['tema', 'gelap', 'terang', 'dark', 'light', 'mata', 'silau', 'malam'],
    answer:
      'Untuk kenyamanan mata Ibu saat malam hari:\n- Tekan ikon Bulan 🌙 di pojok kanan atas layar (Top Navbar) untuk beralih ke Mode Gelap.\n- Tekan kembali ikon Matahari ☀️ untuk kembali ke Mode Terang yang cerah dan segar.',
    tips: 'Pilihan tema akan otomatis diingat oleh aplikasi.',
  },
  {
    id: 'offline-aman',
    question: 'Apakah aplikasi ArisanBae membutuhkan kuota internet?',
    category: 'keamanan',
    keywords: ['internet', 'kuota', 'offline', 'sinyal', 'data', 'jaringan'],
    answer:
      'Aplikasi ArisanBae bekerja 100% OFFLINE! Seluruh data anggota, catatan iuran, dan mesin undian tersimpan langsung di dalam memori browser HP Ibu. Ibu tetap bisa mengundi dan mencatat arisan di tempat yang tidak ada sinyal sekalipun. Kuota internet hanya terpakai jika Ibu ingin membuka aplikasi WhatsApp untuk mengirim chat.',
    tips: 'Anti boros kuota dan selalu siap digunakan kapan saja.',
  },
];

/**
 * Smart offline keyword search engine
 */
export const searchOfflineFaq = (query: string): FaqItem[] => {
  const q = query.toLowerCase().trim();
  if (!q) return OFFLINE_FAQS;

  const words = q.split(/\s+/).filter((w) => w.length > 1);

  // Score each FAQ based on matches
  const scored = OFFLINE_FAQS.map((faq) => {
    let score = 0;
    const lowerQuestion = faq.question.toLowerCase();
    const lowerAnswer = faq.answer.toLowerCase();

    // Exact question match
    if (lowerQuestion.includes(q)) score += 10;
    if (lowerAnswer.includes(q)) score += 5;

    // Word by word matches
    words.forEach((word) => {
      if (lowerQuestion.includes(word)) score += 4;
      if (faq.keywords.some((k) => k.toLowerCase().includes(word))) score += 5;
      if (lowerAnswer.includes(word)) score += 2;
    });

    return { faq, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.faq);
};
