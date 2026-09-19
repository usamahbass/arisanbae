import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Copy, Check, MessageSquare, PhoneCall, AlertCircle } from 'lucide-react';
import { useArisan } from '../../context/ArisanContext';
import { createPaymentReminderMessage, shareToWhatsApp } from '../../utils/whatsapp';
import { ArisanMember } from '../../types/arisan';

interface WhatsAppReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRound?: number;
}

export const WhatsAppReminderModal: React.FC<WhatsAppReminderModalProps> = ({
  isOpen,
  onClose,
  targetRound,
}) => {
  const { activeGroup } = useArisan();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !activeGroup) return null;

  const roundNum = targetRound || activeGroup.currentRound;
  const round = activeGroup.rounds[roundNum] || {
    roundNumber: roundNum,
    isDrawn: false,
    winnerIds: [],
    payments: {},
  };

  const unpaidMembers = activeGroup.members.filter((m) => !round.payments[m.id]);
  const messageText = createPaymentReminderMessage(activeGroup, roundNum, unpaidMembers);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToGroup = () => {
    shareToWhatsApp(messageText);
  };

  const handleSendIndividual = (member: ArisanMember) => {
    const individualMsg = `Assalamu'alaikum Ibu ${member.name},\nMengingatkan untuk iuran arisan *${activeGroup.name}* putaran ke-${roundNum} sebesar *${activeGroup.dues.toLocaleString('id-ID')}*. Terima kasih banyak ya Bu! 🌸`;
    shareToWhatsApp(individualMsg, member.phone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Kirim Pengingat WhatsApp</h3>
              <p className="text-xs text-emerald-100">Putaran ke-{roundNum}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Belum Bayar: <span className="text-rose-600 font-bold">{unpaidMembers.length} Orang</span>
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Salin Teks
                </>
              )}
            </button>
          </div>

          {/* Message Preview Box */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-sans text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
            {messageText}
          </div>

          {/* List of unpaid members with individual WhatsApp button */}
          {unpaidMembers.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Kirim pesan langsung per orang (Japri):
              </p>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {unpaidMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[190px]">
                      {member.name}
                    </span>
                    <button
                      onClick={() => handleSendIndividual(member)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1 text-[11px] shadow-sm transition active:scale-95"
                    >
                      <Send className="w-3 h-3" />
                      Japri WA
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 transition"
          >
            Tutup
          </button>
          <button
            onClick={handleSendToGroup}
            className="flex-[2] py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition active:scale-98"
          >
            <Send className="w-4 h-4" />
            Bagikan ke Grup WhatsApp
          </button>
        </div>
      </motion.div>
    </div>
  );
};
