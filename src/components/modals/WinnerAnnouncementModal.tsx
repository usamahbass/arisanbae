import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Crown, Sparkles, Send, Gift, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ArisanMember, ArisanGroup } from '../../types/arisan';
import { formatRupiah } from '../../utils/currency';
import { createWinnerAnnouncementMessage, shareToWhatsApp } from '../../utils/whatsapp';

interface WinnerAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  winners: ArisanMember[];
  group: ArisanGroup;
  roundNumber: number;
}

export const WinnerAnnouncementModal: React.FC<WinnerAnnouncementModalProps> = ({
  isOpen,
  onClose,
  winners,
  group,
  roundNumber,
}) => {
  useEffect(() => {
    if (isOpen && winners.length > 0) {
      // Fire celebratory confetti blast
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b', '#f43f5e', '#6366f1', '#ec4899'],
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen, winners]);

  if (!isOpen || winners.length === 0) return null;

  const totalPrize = group.dues * group.members.length - group.administrator.wages;
  const prizePerWinner = Math.floor(totalPrize / Math.max(1, winners.length));

  const handleShareWhatsApp = () => {
    const message = createWinnerAnnouncementMessage(group, roundNumber, winners);
    shareToWhatsApp(message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-amber-400 dark:border-amber-500 overflow-hidden flex flex-col text-center relative"
      >
        {/* Glow Header */}
        <div className="bg-gradient-to-b from-amber-400 to-amber-500 pt-8 pb-6 px-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-white transition"
          >
            <X className="w-4 h-4" />
          </button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="w-20 h-20 mx-auto rounded-3xl bg-white text-amber-500 shadow-xl shadow-amber-600/30 flex items-center justify-center mb-3"
          >
            <Crown className="w-11 h-11 fill-amber-400 text-amber-500" />
          </motion.div>

          <span className="inline-block px-3 py-1 rounded-full bg-black/20 text-white font-bold text-xs uppercase tracking-wider mb-1">
            Putaran ke-{roundNumber}
          </span>
          <h3 className="font-extrabold text-2xl drop-shadow-sm">Selamat Kepada!</h3>
          <p className="text-xs text-amber-100 mt-0.5">{group.name}</p>
        </div>

        {/* Winner Cards List */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            {winners.map((winner, idx) => (
              <motion.div
                key={winner.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.15 }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200 dark:border-amber-800/60 shadow-sm"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {winners.length > 1 ? `Pemenang ke-${idx + 1}` : 'Pemenang Beruntung'}
                </span>
                <h4 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
                  {winner.name}
                </h4>
              </motion.div>
            ))}
          </div>

          {/* Prize Amount Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <Gift className="w-4 h-4 text-emerald-600" />
              Hadiah yang Diperoleh:
            </span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {formatRupiah(prizePerWinner)}
            </div>
            {group.administrator.wages > 0 && (
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                (Sudah dipotong kas/jasa: {formatRupiah(group.administrator.wages)})
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleShareWhatsApp}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition active:scale-98"
            >
              <Send className="w-4 h-4" />
              Umumkan ke Grup WhatsApp
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 transition"
            >
              Tutup Pengumuman
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
