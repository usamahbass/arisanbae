import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users,
  ClipboardCheck,
  Dices,
  Send,
  Bot,
} from 'lucide-react';

interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TourStep {
  title: string;
  subtitle: string;
  description: string;
  icon?: React.ElementType;
  emoji?: string;
  badge: string;
  color: string;
  tip?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Hai Ibu! Kenalan dengan Bubu 🌸🤖',
    subtitle: 'Asisten pintar & buku arisan digital praktis Ibu',
    description:
      'Halo Ibu! Saya Bubu, asisten cerdas Ibu di ArisanBae. Saat ini data arisan Ibu masih kosong, tapi tenang ya! Bubu siap memandu Ibu mulai dari membuat arisan pertama, mencatat iuran, sampai mengundi pemenang secara adil.',
    emoji: '🌸🤖',
    badge: 'Kenalan dengan Bubu',
    color: 'from-emerald-500 to-teal-600',
    tip: 'Bubu bisa dipanggil kapan saja lewat tombol "🤖 Bubu" di pojok kanan atas — 100% offline tanpa kuota internet!',
  },
  {
    title: 'Buat & Kelola Banyak Grup 👥',
    subtitle: 'Arisan RT, Keluarga, & Pengajian bisa dipisah',
    description:
      'Ibu punya lebih dari satu arisan? Mulai dengan klik tombol "+ Buat Kelompok Arisan Baru". Ibu bisa berpindah grup arisan kapan saja hanya dengan mengetuk nama arisan di bilah atas.',
    icon: Users,
    badge: 'Kelola Grup',
    color: 'from-blue-500 to-indigo-600',
    tip: 'Ibu juga bisa impor file cadangan (.json) jika sebelumnya sudah pernah menyimpan data arisan.',
  },
  {
    title: 'Catat Iuran Sekali Sentuh 📋',
    subtitle: 'Tabel interaktif dengan pencarian nama instan',
    description:
      'Di tab "Iuran", Ibu cukup sentuh tombol status untuk menandai lunas atau belum. Ada tombol "Tandai Semua Lunas" untuk mempermudah bendahara saat semua setoran sudah terkumpul!',
    icon: ClipboardCheck,
    badge: 'Pencatatan Iuran',
    color: 'from-emerald-600 to-teal-500',
    tip: 'Angka uang kas dan hadiah otomatis terhitung rapi tanpa perlu kalkulator manual.',
  },
  {
    title: 'Undi Arisan Seru & Adil 🎁',
    subtitle: 'Simulator tabung undian dengan semburan konfeti',
    description:
      'Tekan tombol "UNDI ARISAN SEKARANG" di tab Undi. Tabung undian berputar otomatis mengocok nama anggota yang belum menang. Sistem menjamin 100% acak, adil, dan transparan.',
    icon: Dices,
    badge: 'Undian Adil',
    color: 'from-amber-500 to-orange-500',
    tip: 'Tombol undi aman terkunci jika masih ada anggota yang belum melunasi iuran putaran berjalan.',
  },
  {
    title: 'Kirim Pesan WhatsApp 1-Klik 📲',
    subtitle: 'Pengingat tagihan santun & ucapan selamat pemenang',
    description:
      'Hanya dengan 1 sentuhan, Ibu bisa membagikan rekap siapa saja yang belum bayar atau mengumumkan pemenang arisan langsung ke grup WhatsApp dengan susunan kata yang sopan.',
    icon: Send,
    badge: 'Kirim WhatsApp',
    color: 'from-teal-600 to-emerald-600',
    tip: 'Pesan sudah otomatis diformat rapi lengkap dengan nomor rekening bendahara.',
  },
  {
    title: 'Tanya Bubu Kapan Saja 🤖💡',
    subtitle: 'Kamus pintar & jawaban cepat tanpa internet',
    description:
      'Jika sewaktu-waktu Ibu lupa cara undi ulang, cara tambah anggota, atau hitungan uang kas, cukup ketuk tombol "🤖 Bubu" di bilah atas. Bubu punya jawaban lengkap untuk semua fitur!',
    icon: Bot,
    badge: 'Bubu Selalu Siaga',
    color: 'from-purple-500 to-pink-500',
    tip: 'Semua data arisan Ibu tersimpan aman langsung di HP Ibu dan tetap berfungsi lancar tanpa sinyal.',
  },
];

export const TourGuide: React.FC<TourGuideProps> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
      setCurrentStepIndex(0);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col"
      >
        {/* Step Header with Gradient */}
        <div
          className={`bg-gradient-to-r ${currentStep.color} p-6 text-white text-center relative`}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-white transition"
            title="Tutup panduan"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-extrabold uppercase tracking-wider mb-2">
            {currentStep.badge} • {currentStepIndex + 1} dari {TOUR_STEPS.length}
          </span>

          <motion.div
            key={currentStepIndex}
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-16 h-16 mx-auto rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner text-3xl"
          >
            {currentStep.emoji ? (
              <span className="select-none filter drop-shadow-sm leading-none">
                {currentStep.emoji}
              </span>
            ) : (
              Icon && <Icon className="w-8 h-8 text-white" />
            )}
          </motion.div>

          <h3 className="font-extrabold text-xl leading-tight drop-shadow-sm">
            {currentStep.title}
          </h3>
          <p className="text-xs text-white/90 mt-1 font-medium">
            {currentStep.subtitle}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3.5">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-center">
            {currentStep.description}
          </p>

          {/* Friendly Tip Box */}
          {currentStep.tip && (
            <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-[11px] text-emerald-800 dark:text-emerald-200 font-medium text-left flex items-start gap-2">
              <span className="text-sm flex-shrink-0">💡</span>
              <span className="leading-snug">{currentStep.tip}</span>
            </div>
          )}

          {/* Dots Progress Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStepIndex
                    ? 'w-6 bg-emerald-600 dark:bg-emerald-400'
                    : 'w-2 bg-slate-200 dark:bg-slate-700'
                }`}
                title={`Ke langkah ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-1">
            {currentStepIndex > 0 ? (
              <button
                onClick={handlePrev}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 hover:bg-slate-200 transition active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Sebelumnya
              </button>
            ) : (
              <button
                onClick={onClose}
                className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2"
              >
                Lewati Panduan
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition active:scale-95 ml-auto"
            >
              {isLastStep ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Mengerti & Mulai!
                </>
              ) : (
                <>
                  Lanjut
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
