import React from 'react';
import { useArisan } from '../context/ArisanContext';
import { formatRupiah } from '../utils/currency';
import { TabType } from '../components/layout/BottomNavigation';
import { WelcomeEmptyView } from './WelcomeEmptyView';
import {
  Sparkles,
  Wallet,
  CheckCircle2,
  Clock,
  Dices,
  Send,
  Crown,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeTabProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenReminderModal: () => void;
  onOpenCreateGroup: () => void;
  onOpenImport: () => void;
  onOpenTour: () => void;
  onOpenBot?: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onNavigateTab,
  onOpenReminderModal,
  onOpenCreateGroup,
  onOpenImport,
  onOpenTour,
  onOpenBot,
}) => {
  const { activeGroup } = useArisan();

  if (!activeGroup) {
    return (
      <WelcomeEmptyView
        onOpenCreate={onOpenCreateGroup}
        onOpenImport={onOpenImport}
        onOpenTour={onOpenTour}
        onOpenBot={onOpenBot}
      />
    );
  }

  const currentRoundNum = activeGroup.currentRound;
  const currentRound = activeGroup.rounds[currentRoundNum] || {
    roundNumber: currentRoundNum,
    isDrawn: false,
    winnerIds: [],
    payments: {},
  };

  const totalMembers = activeGroup.members.length;
  const paidCount = Object.values(currentRound.payments).filter(Boolean).length;
  const unpaidCount = totalMembers - paidCount;
  const progressPercent = totalMembers > 0 ? Math.round((paidCount / totalMembers) * 100) : 0;

  const collectedAmount = paidCount * activeGroup.dues;
  const targetAmount = totalMembers * activeGroup.dues;
  const prizePool = targetAmount - activeGroup.administrator.wages;
  const prizePerWinner = Math.floor(prizePool / Math.max(1, activeGroup.winnersCount));

  // Find latest winners if any
  const latestRoundDrawn = Object.values(activeGroup.rounds)
    .filter((r) => r.isDrawn)
    .sort((a, b) => b.roundNumber - a.roundNumber)[0];

  const latestWinners = latestRoundDrawn
    ? activeGroup.members.filter((m) => latestRoundDrawn.winnerIds?.includes(m.id))
    : [];

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-4 animate-fadeIn">
      {/* Greeting Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-5 shadow-xl shadow-emerald-900/15">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 text-[11px] font-semibold backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Halo, {activeGroup.administrator.manager}
            </span>
            <h2 className="text-xl font-extrabold mt-1.5 tracking-tight text-white drop-shadow-sm">
              {activeGroup.name}
            </h2>
            <p className="text-xs text-emerald-100/90 mt-0.5">
              Putaran ke-<strong>{currentRoundNum}</strong> dari {Object.keys(activeGroup.rounds).length} putaran
            </p>
          </div>

          <div className="min-w-[72px] px-3.5 py-2.5 rounded-2xl bg-white/20 dark:bg-white/15 backdrop-blur-md border border-white/30 flex flex-col items-center justify-center text-center shadow-md shadow-emerald-950/20">
            <span className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-100/90 leading-none">
              Putaran
            </span>
            <span className="text-2xl font-black leading-none text-white mt-1">
              {currentRoundNum}
            </span>
          </div>
        </div>

        {/* Money Card Info */}
        <div className="mt-4 pt-4 border-t border-white/15 grid grid-cols-2 gap-3">
          <div>
            <span className="text-[10px] text-emerald-200 uppercase font-semibold flex items-center gap-1">
              <Wallet className="w-3 h-3" />
              Uang Terkumpul
            </span>
            <div className="text-lg font-black mt-0.5 tracking-tight">
              {formatRupiah(collectedAmount)}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 uppercase font-semibold flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-300" />
              Hadiah Pemenang
            </span>
            <div className="text-lg font-black mt-0.5 tracking-tight text-amber-300">
              {formatRupiah(prizePerWinner)}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Payment Card */}
      <div
        data-tour="financial-cards"
        className="p-4 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 leading-tight">
                Status Iuran Putaran Ini
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {paidCount} dari {totalMembers} orang sudah setor
              </p>
            </div>
          </div>
          <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
            {progressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                Sudah Lunas
              </div>
              <div className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                {paidCount} Orang
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-800/40 flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <div>
              <div className="text-[10px] font-semibold text-rose-700 dark:text-rose-300">
                Belum Bayar
              </div>
              <div className="text-sm font-bold text-rose-900 dark:text-rose-100">
                {unpaidCount} Orang
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions for Ibu-Ibu */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigateTab('lottery')}
          className="p-4 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-lg shadow-rose-500/20 text-left relative overflow-hidden group active:scale-98 transition"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
            <Dices className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-extrabold text-sm leading-tight">Undi Arisan</h4>
          <p className="text-[11px] text-white/85 mt-0.5">Undi pemenang sekarang</p>
        </button>

        <button
          data-tour="wa-action"
          onClick={onOpenReminderModal}
          className="p-4 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 text-left relative overflow-hidden group active:scale-98 transition"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
            <Send className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-extrabold text-sm leading-tight">Ingatkan WA</h4>
          <p className="text-[11px] text-emerald-100 mt-0.5">Kirim tagihan ke grup</p>
        </button>
      </div>

      {/* Latest Winner Card (if any) */}
      {latestWinners.length > 0 && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/80 dark:border-amber-800/60 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center">
              <Crown className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Pemenang Putaran ke-{latestRoundDrawn.roundNumber}
            </span>
          </div>
          <div className="space-y-1">
            {latestWinners.map((winner) => (
              <div
                key={winner.id}
                className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center justify-between"
              >
                <span>👑 Ibu {winner.name}</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {formatRupiah(prizePerWinner)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shortcut to TanStack Table */}
      <button
        onClick={() => onNavigateTab('table')}
        className="w-full p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm hover:border-emerald-300 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
            {totalMembers}
          </div>
          <div className="text-left">
            <div className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Lihat Tabel Catatan Iuran
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Centang siapa yang sudah atau belum bayar
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </button>
    </div>
  );
};
