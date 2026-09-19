import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArisan } from '../context/ArisanContext';
import { ArisanMember } from '../types/arisan';
import { formatRupiah } from '../utils/currency';
import { sound } from '../utils/sound';
import {
  Dices,
  Crown,
  Sparkles,
  RotateCcw,
  Send,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Trophy,
  Users,
  Gift,
} from 'lucide-react';
import { WinnerAnnouncementModal } from '../components/modals/WinnerAnnouncementModal';

interface LotteryTabProps {
  onOpenReminderModal: () => void;
}

export const LotteryTab: React.FC<LotteryTabProps> = ({ onOpenReminderModal }) => {
  const { activeGroup, drawLottery, resetCurrentRoundLottery, setRound, markAllPaid } = useArisan();

  const [isRolling, setIsRolling] = useState(false);
  const [displayCandidateName, setDisplayCandidateName] = useState<string>('???');
  const [recentWinners, setRecentWinners] = useState<ArisanMember[]>([]);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const rollIntervalRef = useRef<any>(null);

  if (!activeGroup) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center text-slate-500">
        Silakan pilih arisan terlebih dahulu.
      </div>
    );
  }

  const currentRoundNum = activeGroup.currentRound;
  const currentRound = activeGroup.rounds[currentRoundNum] || {
    roundNumber: currentRoundNum,
    isDrawn: false,
    winnerIds: [],
    payments: {},
  };

  // Eligible members who haven't won yet
  const eligibleMembers = activeGroup.members.filter((m) => !m.hasWon);
  const roundWinners = currentRound.isDrawn
    ? activeGroup.members.filter((m) => currentRound.winnerIds?.includes(m.id))
    : [];

  const unpaidCount = activeGroup.members.filter((m) => !currentRound.payments[m.id]).length;

  const totalPrize = activeGroup.dues * activeGroup.members.length - activeGroup.administrator.wages;
  const prizePerWinner = Math.floor(totalPrize / Math.max(1, activeGroup.winnersCount));

  // Handler to start lottery animation
  const handleStartDraw = () => {
    if (eligibleMembers.length === 0) return;
    if (isRolling) return;

    setIsRolling(true);

    let counter = 0;
    const maxTicks = 25; // number of cycles
    let delay = 60; // initial speed

    const cycle = () => {
      const randomMember = eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];
      setDisplayCandidateName(randomMember.name);
      sound.playTick();
      counter++;

      if (counter < maxTicks) {
        delay += 8; // gradually slow down
        rollIntervalRef.current = setTimeout(cycle, delay);
      } else {
        // Finished rolling! Pick actual winner
        const winners = drawLottery(currentRoundNum);
        setIsRolling(false);
        if (winners.length > 0) {
          setDisplayCandidateName(winners.map((w) => w.name).join(', '));
          setRecentWinners(winners);
          setShowWinnerModal(true);
        }
      }
    };

    cycle();
  };

  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) clearTimeout(rollIntervalRef.current);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-4 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
            Putaran ke-{currentRoundNum}
          </span>
          <h3 className="font-extrabold text-lg mt-1 leading-tight">
            Undian Arisan 🎁
          </h3>
          <p className="text-xs text-amber-100">
            {eligibleMembers.length} peserta berkesempatan menang
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-amber-100 uppercase font-semibold block">Hadiah</span>
          <span className="text-base font-black text-white">{formatRupiah(prizePerWinner)}</span>
        </div>
      </div>

      {/* Interactive Lottery Machine Simulator */}
      <div
        data-tour="lottery-section"
        className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-md text-center space-y-5 relative overflow-hidden"
      >
        {/* Background glow when rolling */}
        {isRolling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-rose-400/10 to-emerald-400/10 pointer-events-none"
          />
        )}

        {/* Cylinder / Shaker Graphic */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <motion.div
            animate={
              isRolling
                ? {
                    rotate: [0, -15, 15, -15, 15, 0],
                    scale: [1, 1.08, 0.95, 1.08, 1],
                    y: [0, -8, 8, -6, 0],
                  }
                : { y: [0, -4, 0] }
            }
            transition={
              isRolling
                ? { repeat: Infinity, duration: 0.35 }
                : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            }
            className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 p-1 shadow-xl shadow-orange-500/25 flex items-center justify-center text-white"
          >
            <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
              {currentRound.isDrawn ? (
                <Crown className="w-12 h-12 text-amber-500 fill-amber-400 animate-bounce" />
              ) : (
                <Dices
                  className={`w-12 h-12 text-orange-500 ${isRolling ? 'animate-spin' : ''}`}
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* Dynamic Name Display Box */}
        <div className="space-y-1">
          <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
            {currentRound.isDrawn
              ? 'Pemenang Putaran Ini'
              : isRolling
              ? 'Mengundi Nama...'
              : 'Calon Pemenang'}
          </span>

          <div className="min-h-[48px] flex items-center justify-center">
            {currentRound.isDrawn ? (
              <div className="space-y-1">
                {roundWinners.map((w) => (
                  <motion.div
                    key={w.id}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5"
                  >
                    <span>👑 {w.name}</span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div
                className={`text-2xl font-black transition ${
                  isRolling
                    ? 'text-orange-500 scale-105'
                    : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                {isRolling ? displayCandidateName : 'Siap Diundi ✨'}
              </div>
            )}
          </div>
        </div>

        {/* Warning Alert if Members haven't paid */}
        {!currentRound.isDrawn && unpaidCount > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-left space-y-2.5 animate-fadeIn">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-extrabold text-xs text-amber-900 dark:text-amber-200">
                  Undian Belum Bisa Dilakukan ⚠️
                </h5>
                <p className="text-[11px] text-amber-800 dark:text-amber-300/90 mt-0.5 leading-relaxed">
                  Masih ada <strong>{unpaidCount} orang peserta</strong> yang belum lunas membayar iuran putaran ini. Semua anggota wajib lunas terlebih dahulu agar pengundian adil.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-amber-200/80 dark:border-amber-800/50">
              <button
                type="button"
                onClick={onOpenReminderModal}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition active:scale-95"
              >
                <Send className="w-3 h-3" />
                Ingatkan via WA
              </button>
              <button
                type="button"
                onClick={() => markAllPaid(true, currentRoundNum)}
                className="px-3 py-1.5 rounded-xl bg-amber-200/80 hover:bg-amber-300/80 dark:bg-amber-900/60 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-100 text-[11px] font-bold transition flex items-center gap-1 active:scale-95"
                title="Tandai semua anggota sudah lunas jika sudah setor uang tunai"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                Tandai Semua Lunas
              </button>
            </div>
          </div>
        )}

        {/* Action Button: Undi vs Selesai vs Disabled */}
        <div className="pt-2">
          {currentRound.isDrawn ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  setRecentWinners(roundWinners);
                  setShowWinnerModal(true);
                }}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition active:scale-98"
              >
                <Send className="w-4 h-4" />
                Umumkan ke WhatsApp
              </button>

              <button
                onClick={() => resetCurrentRoundLottery(currentRoundNum)}
                className="w-full py-2.5 rounded-2xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition flex items-center justify-center gap-1"
                title="Batalkan hasil undian jika salah"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Undi Ulang / Reset Putaran Ini
              </button>
            </div>
          ) : eligibleMembers.length === 0 ? (
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold">
              🎉 Semua peserta sudah pernah memenangkan arisan ini!
            </div>
          ) : unpaidCount > 0 ? (
            <button
              disabled
              className="w-full py-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200/80 dark:border-slate-700 cursor-not-allowed transition"
            >
              <AlertCircle className="w-4 h-4 text-amber-500" />
              BELUM BISA DIUNDI ({unpaidCount} ORANG BELUM LUNAS)
            </button>
          ) : (
            <button
              onClick={handleStartDraw}
              disabled={isRolling}
              className={`w-full py-4 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 shadow-xl transition active:scale-95 ${
                isRolling
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-orange-500/30 hover:brightness-105'
              }`}
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              {isRolling ? 'Sedang Mengundi...' : 'UNDI ARISAN SEKARANG'}
            </button>
          )}
        </div>
      </div>

      {/* Daftar Peserta yang Belum Menang */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Belum Pernah Menang ({eligibleMembers.length})
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">Peluang sama</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {eligibleMembers.map((m) => (
            <span
              key={m.id}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 text-xs font-medium"
            >
              {m.name}
            </span>
          ))}
          {eligibleMembers.length === 0 && (
            <span className="text-xs text-slate-400 italic">Sudah menang semua</span>
          )}
        </div>
      </div>

      {/* Winner Modal */}
      <WinnerAnnouncementModal
        isOpen={showWinnerModal}
        onClose={() => setShowWinnerModal(false)}
        winners={recentWinners}
        group={activeGroup}
        roundNumber={currentRoundNum}
      />
    </div>
  );
};
