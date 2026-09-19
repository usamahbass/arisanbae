import { ArisanGroup, ArisanMember } from '../types/arisan';
import { formatRupiah } from './currency';

/**
 * Generate WhatsApp friendly reminder for members who haven't paid
 */
export const createPaymentReminderMessage = (
  group: ArisanGroup,
  roundNumber: number,
  unpaidMembers: ArisanMember[]
): string => {
  const round = group.rounds[roundNumber];
  const dueDateInfo = group.periodType === 'bulanan' ? 'bulan ini' : 'minggu ini';

  let message = `🌸 *PENGINGAT IURAN ARISAN* 🌸\n`;
  message += `*${group.name}* (Putaran ke-${roundNumber})\n\n`;
  message += `Assalamu'alaikum wr. wb. Ibu-ibu yang baik hati,\n`;
  message += `Mengingatkan untuk setoran iuran arisan putaran ke-${roundNumber} sebesar *${formatRupiah(group.dues)}*.\n\n`;

  if (unpaidMembers.length > 0) {
    message += `📋 *Daftar yang belum konfirmasi bayar:* \n`;
    unpaidMembers.forEach((member, idx) => {
      message += `${idx + 1}. ${member.name}\n`;
    });
    message += `\n`;
  }

  message += `Mohon bagi yang sudah transfer bisa segera konfirmasi ke Ibu Bendahara (*${group.administrator.manager}*).\n\n`;
  message += `Terima kasih banyak atas kerjasamanya ya Ibu-ibu! Semoga rezeki kita semua berkah dan berlimpah. Aamiin 🤲✨\n`;
  message += `_— Dibuat otomatis lewat ArisanBae_`;

  return message;
};

/**
 * Generate WhatsApp announcement for round winners
 */
export const createWinnerAnnouncementMessage = (
  group: ArisanGroup,
  roundNumber: number,
  winners: ArisanMember[]
): string => {
  const totalPrize =
    group.dues * group.members.length - group.administrator.wages;
  const prizePerWinner = Math.floor(totalPrize / group.winnersCount);

  let message = `🎉 *SELAMAT KEPADA PEMENANG ARISAN!* 🥳\n`;
  message += `*${group.name}* — Putaran ke-${roundNumber}\n\n`;
  message += `Alhamdulillah, proses undian arisan putaran ke-${roundNumber} telah selesai dilaksanakan dengan lancar.\n\n`;
  message += `👑 *Selamat Kepada:* \n`;
  winners.forEach((winner, idx) => {
    message += `✨ *${idx + 1}. Ibu ${winner.name}*\n`;
  });
  message += `\n💰 *Total Hadiah yang Didapat:* *${formatRupiah(prizePerWinner)}* / orang\n`;
  if (group.administrator.wages > 0) {
    message += `_(Kas/Biaya Pengelola: ${formatRupiah(group.administrator.wages)})_\n`;
  }
  message += `\nUntuk penyerahan dana arisan akan segera dikoordinasikan oleh Ibu *${group.administrator.manager}*.\n`;
  message += `Bagi yang belum dapat giliran, insyaAllah putaran berikutnya yaa! Tetap semangat Ibu-ibu! 🥰💐\n\n`;
  message += `_— Dibuat otomatis lewat ArisanBae_`;

  return message;
};

/**
 * Open WhatsApp with pre-filled message (either broad share or direct phone)
 */
export const shareToWhatsApp = (text: string, phone?: string) => {
  let cleanedPhone = phone ? phone.replace(/\D/g, '') : '';
  if (cleanedPhone.startsWith('0')) {
    cleanedPhone = '62' + cleanedPhone.slice(1);
  }
  
  const encodedText = encodeURIComponent(text);
  const url = cleanedPhone
    ? `https://wa.me/${cleanedPhone}?text=${encodedText}`
    : `https://api.whatsapp.com/send?text=${encodedText}`;

  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
