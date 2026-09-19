import React, { useState } from 'react';
import { useArisan } from '../context/ArisanContext';
import { formatRupiah } from '../utils/currency';
import { shareToWhatsApp } from '../utils/whatsapp';
import {
  History,
  Download,
  Upload,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  FileSpreadsheet,
  Trash2,
  Calendar,
  DollarSign,
  Users,
} from 'lucide-react';

interface HistoryTabProps {
  onOpenImport: () => void;
  onOpenCreateGroup: () => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ onOpenImport, onOpenCreateGroup }) => {
  const { state, activeGroup, exportBackup, resetAllData } = useArisan();
  const [copiedReport, setCopiedReport] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!activeGroup) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center text-slate-500">
        Silakan buat arisan terlebih dahulu.
      </div>
    );
  }

  // Filter activity logs for active group
  const groupLogs = state.activityLogs
    .filter((log) => log.groupId === activeGroup.id)
    .slice(0, 30);

  // Generate WhatsApp summary report
  const generateWhatsAppReport = () => {
    let text = `📊 *LAPORAN REKAP ARISAN* 📊\n`;
    text += `*${activeGroup.name}*\n`;
    text += `Pengelola: Ibu ${activeGroup.administrator.manager}\n`;
    text += `Iuran: ${formatRupiah(activeGroup.dues)} / orang\n`;
    text += `Total Peserta: ${activeGroup.members.length} orang\n\n`;

    text += `👑 *Daftar Pemenang Tiap Putaran:*\n`;
    Object.values(activeGroup.rounds).forEach((r) => {
      if (r.isDrawn) {
        const winners = activeGroup.members.filter((m) => r.winnerIds?.includes(m.id));
        const names = winners.map((w) => w.name).join(', ');
        text += `• Putaran ${r.roundNumber}: Ibu ${names}\n`;
      }
    });

    text += `\n_Dibuat otomatis dengan ArisanBae_ 🌸`;
    return text;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateWhatsAppReport());
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handleShareReportWA = () => {
    shareToWhatsApp(generateWhatsAppReport());
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-4 animate-fadeIn">
      {/* Financial Summary Card */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Ringkasan Kas Arisan
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {activeGroup.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Total Peserta
            </span>
            <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">
              {activeGroup.members.length} Orang
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Sudah Menang
            </span>
            <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
              {activeGroup.members.filter((m) => m.hasWon).length} Orang
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Iuran per Orang
            </span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              {formatRupiah(activeGroup.dues)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Kas Pengelola
            </span>
            <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">
              {formatRupiah(activeGroup.administrator.wages)}
            </span>
          </div>
        </div>
      </div>

      {/* Backup & WhatsApp Share Options */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
          Cadangan & Laporan 📂
        </h4>

        <div className="space-y-2">
          {/* Export JSON */}
          <button
            onClick={exportBackup}
            className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700/70 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between transition text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-800 dark:text-slate-100">
                  Unduh File Cadangan (.json)
                </div>
                <div className="text-[10px] text-slate-500">
                  Simpan data agar aman jika ganti HP / browser
                </div>
              </div>
            </div>
          </button>

          {/* Import JSON */}
          <button
            onClick={onOpenImport}
            className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700/70 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between transition text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-800 dark:text-slate-100">
                  Impor File Cadangan
                </div>
                <div className="text-[10px] text-slate-500">
                  Pulihkan data arisan dari file .json
                </div>
              </div>
            </div>
          </button>

          {/* Share WhatsApp Report */}
          <button
            onClick={handleShareReportWA}
            className="w-full p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100/70 border border-emerald-200/70 dark:border-emerald-800/70 flex items-center justify-between transition text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Copy className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-emerald-900 dark:text-emerald-200">
                  Kirim Rekap Arisan ke WhatsApp
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-300">
                  Format pesan rekap daftar pemenang rapi
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-500" />
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Riwayat Aktivitas
            </h4>
          </div>
          <span className="text-[10px] text-slate-400">Terbaru</span>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {groupLogs.length === 0 ? (
            <div className="text-center py-4 text-xs text-slate-400">
              Belum ada catatan aktivitas.
            </div>
          ) : (
            groupLogs.map((log) => {
              const timeStr = new Date(log.timestamp).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              });
              const dateStr = new Date(log.timestamp).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
              });

              return (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50 flex items-start gap-2.5 text-xs"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-slate-800 dark:text-slate-200 leading-snug">{log.text}</p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      {dateStr}, {timeStr} WIB
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Reset Data Option */}
      <div className="p-4 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-center space-y-2">
        <div className="text-xs font-bold text-rose-800 dark:text-rose-300">
          Reset Data Aplikasi
        </div>
        <p className="text-[11px] text-rose-600/80 dark:text-rose-400 max-w-xs mx-auto">
          Ingin mengulang dari awal? Pastikan sudah mengunduh file cadangan jika masih dibutuhkan.
        </p>

        {showResetConfirm ? (
          <div className="flex gap-2 justify-center pt-2">
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 rounded-xl text-xs bg-slate-200 dark:bg-slate-700 font-bold"
            >
              Batal
            </button>
            <button
              onClick={() => {
                resetAllData();
                setShowResetConfirm(false);
              }}
              className="px-4 py-2 rounded-xl text-xs bg-rose-600 text-white font-bold shadow-sm"
            >
              Ya, Reset Semua
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 text-xs font-bold text-rose-600 hover:underline"
          >
            Hapus Semua Data & Mulai Ulang
          </button>
        )}
      </div>
    </div>
  );
};
