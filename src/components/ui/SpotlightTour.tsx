import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, X, Sparkles, Navigation } from 'lucide-react';
import { TabType } from '../layout/BottomNavigation';

export interface SpotlightStep {
  targetSelector: string;
  tab: TabType;
  title: string;
  description: string;
  position?: 'top' | 'bottom';
}

interface SpotlightTourProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: TabType) => void;
}

const SPOTLIGHT_STEPS: SpotlightStep[] = [
  {
    targetSelector: '[data-tour="header-group"]',
    tab: 'home',
    title: 'Ganti & Kelola Kelompok Arisan 👥',
    description: 'Sentuh bagian ini untuk berpindah kelompok arisan, menambah arisan baru, atau mengimpor file cadangan.',
    position: 'bottom',
  },
  {
    targetSelector: '[data-tour="financial-cards"]',
    tab: 'home',
    title: 'Ringkasan Kas & Hadiah 💰',
    description: 'Pantau total uang iuran yang sudah masuk dan nominal hadiah yang akan diperoleh pemenang putaran ini.',
    position: 'bottom',
  },
  {
    targetSelector: '[data-tour="table-section"]',
    tab: 'table',
    title: 'Catatan Iuran & Centang Lunas 📋',
    description: 'Cari nama peserta dan cukup 1 klik tombol status untuk mengubah Lunas atau Belum. Ada juga tombol "Tandai Semua Lunas"!',
    position: 'top',
  },
  {
    targetSelector: '[data-tour="lottery-section"]',
    tab: 'lottery',
    title: 'Simulator Undian Arisan 🎁',
    description: 'Tekan tombol ini saat pertemuan arisan! Nama peserta yang belum pernah menang akan diacak secara adil dengan animasi dan suara seru.',
    position: 'top',
  },
  {
    targetSelector: '[data-tour="wa-action"]',
    tab: 'home',
    title: 'Kirim Tagihan & Pengumuman WA 📲',
    description: 'Klik tombol ini untuk mengirim pesan tagihan arisan yang sopan atau ucapan selamat pemenang langsung ke grup WhatsApp.',
    position: 'top',
  },
];

export const SpotlightTour: React.FC<SpotlightTourProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = SPOTLIGHT_STEPS[currentStepIndex];

  // Update target rect when step changes or window resizes
  useEffect(() => {
    if (!isOpen) return;

    // Switch tab if needed
    if (step.tab) {
      onNavigateTab(step.tab);
    }

    const updateRect = () => {
      const el = document.querySelector(step.targetSelector);
      if (el) {
        // Scroll element into view smoothly if needed
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    // Small delay to allow tab render and smooth scroll
    const timer = setTimeout(updateRect, 250);
    window.addEventListener('resize', updateRect);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
    };
  }, [isOpen, currentStepIndex, step, onNavigateTab]);

  if (!isOpen) return null;

  const isLast = currentStepIndex === SPOTLIGHT_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
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
    <div className="fixed inset-0 z-50 pointer-events-auto animate-fadeIn overflow-hidden">
      {/* Dark Dim Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] transition-opacity"
      />

      {/* Spotlight Cutout Border around Target Element */}
      {targetRect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="fixed z-50 pointer-events-none rounded-3xl border-3 border-emerald-400 dark:border-emerald-300 shadow-[0_0_35px_rgba(16,185,129,0.7)] ring-4 ring-emerald-400/30"
        />
      )}

      {/* Floating Card Popover */}
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end p-4 pb-20 sm:items-center">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 25, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          className="w-full max-w-sm pointer-events-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-emerald-500/80 p-5 space-y-3.5 text-left"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                {currentStepIndex + 1}
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                  Panduan Fitur ({currentStepIndex + 1}/{SPOTLIGHT_STEPS.length})
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 leading-tight">
                  {step.title}
                </h4>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Tutup Tur"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {step.description}
          </p>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {currentStepIndex > 0 ? (
              <button
                onClick={handlePrev}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 hover:bg-slate-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Sebelumnya
              </button>
            ) : (
              <button
                onClick={onClose}
                className="text-xs font-medium text-slate-400 hover:text-slate-600 px-2"
              >
                Lewati
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition active:scale-95 ml-auto"
            >
              {isLast ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Selesai
                </>
              ) : (
                <>
                  Lanjut Fitur Berikutnya
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
