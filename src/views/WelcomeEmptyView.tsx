import React from 'react';
import {
  Plus,
  FolderSync,
  HelpCircle,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useArisan } from '../context/ArisanContext';
import { AppLogo } from '../components/ui/AppLogo';

interface WelcomeEmptyViewProps {
  onOpenCreate: () => void;
  onOpenImport: () => void;
  onOpenTour: () => void;
  onOpenBot?: () => void;
}

export const WelcomeEmptyView: React.FC<WelcomeEmptyViewProps> = ({
  onOpenCreate,
  onOpenImport,
  onOpenTour,
  onOpenBot,
}) => {
  const { loadSampleData } = useArisan();

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 pb-32 space-y-4 text-center animate-fadeIn">
      {/* Top Graphic & Welcome Title */}
      <div className="space-y-3 pt-1">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="relative inline-block mx-auto"
        >
          <div className="absolute inset-0 rounded-3xl bg-emerald-400 blur-2xl opacity-30 animate-pulse pointer-events-none" />
          <AppLogo size={76} animate className="relative" />
        </motion.div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1.5">
            Selamat Datang di ArisanBae! 🌸
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Kelola Arisan Jadi Lebih Mudah & Praktis
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
            Catat iuran, undi pemenang secara adil dengan animasi undian seru,
            dan kirim pengingat tagihan ke grup WhatsApp dalam 1 klik.
          </p>
        </div>

        {/* Bubu Assistant Greeting Card */}
        {onOpenBot && (
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-slate-800/80 dark:to-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-between text-left gap-2.5 shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-lg shadow-md shadow-emerald-500/20 flex-shrink-0">
                🤖
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <span className="truncate">Baru di sini? Tanya Bubu</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-extrabold uppercase flex-shrink-0">
                    Offline
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate leading-snug">
                  Asisten pintar siap jawab cara pakai aplikasi 🌸
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBot}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition active:scale-95 flex-shrink-0 flex items-center gap-1"
            >
              <span>Tanya</span>
              <span className="text-xs">💬</span>
            </button>
          </div>
        )}

        {/* Feature Highlights Pill */}
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto text-[10px] font-bold text-slate-600 dark:text-slate-300">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Anti Ribet</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col items-center gap-1">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Banyak Grup</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Offline</span>
          </div>
        </div>
      </div>

      {/* Action Buttons with Clear Bottom Padding */}
      <div className="space-y-2 pt-2">
        {/* Primary: Create Arisan */}
        <button
          onClick={onOpenCreate}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition active:scale-98"
        >
          <Plus className="w-5 h-5" />+ Buat Kelompok Arisan Baru
        </button>

        {/* Secondary: Import Backup */}
        <button
          onClick={onOpenImport}
          className="w-full py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
        >
          <FolderSync className="w-4 h-4 text-emerald-600" />
          Punya Cadangan? Impor File (.json)
        </button>

        {/* Tertiary: Load Demo Data */}
        <button
          onClick={loadSampleData}
          className="w-full py-2.5 rounded-2xl text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition flex items-center justify-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Coba Data Contoh (Arisan Rahat RT 05)
        </button>

        {/* Tour Guide Button */}
        <button
          onClick={onOpenTour}
          className="w-full py-2 text-[11px] font-semibold text-slate-400 hover:text-emerald-600 dark:hover:text-slate-300 transition flex items-center justify-center gap-1"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Lihat Panduan Singkat Aplikasi
        </button>
      </div>
    </div>
  );
};
