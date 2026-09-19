import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Sparkles,
  Bot,
  Search,
  BookOpen,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { OFFLINE_FAQS, FaqItem, searchOfflineFaq } from '../../data/offlineFaq';
import { TabType } from '../layout/BottomNavigation';

interface OfflineBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: TabType) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  tips?: string;
  actionLabel?: string;
  actionTab?: TabType;
  time: string;
}

export const OfflineBotModal: React.FC<OfflineBotModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [activeView, setActiveView] = useState<'chat' | 'dictionary'>('chat');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Halo Ibu yang baik hati! 🌸 Saya **Bubu**, asisten pintar offline ArisanBae.\n\nIbu bisa tanya apa saja seputar cara pakai aplikasi ini tanpa butuh kuota internet. Coba klik pertanyaan populer di bawah atau ketik langsung ya, Bu!',
      time: 'Baru saja',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (activeView === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeView]);

  if (!isOpen) return null;

  // Quick prompt chips
  const quickPrompts = [
    { label: '🎲 Cara Undi', query: 'bagaimana cara undi arisan?' },
    { label: '⚠️ Kenapa Tombol Undi Mati?', query: 'kenapa tombol undi arisan mati tidak bisa diklik?' },
    { label: '📋 Catat Lunas', query: 'cara mencatat iuran lunas' },
    { label: '👥 Tambah Anggota', query: 'cara tambah anggota baru' },
    { label: '📲 Kirim Pesan WA', query: 'cara kirim tagihan ke whatsapp' },
    { label: '💰 Penjelasan Uang Kas', query: 'apa itu uang kas upah pengelola' },
    { label: '💾 Cadangkan Data', query: 'cara backup simpan data arisan' },
  ];

  const handleSendQuestion = (question: string) => {
    const q = question.trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate smart local instant response
    setTimeout(() => {
      const results = searchOfflineFaq(q);
      setIsTyping(false);

      if (results.length > 0) {
        const topMatch = results[0];
        const botMsg: ChatMessage = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: `**${topMatch.question}**\n\n${topMatch.answer}`,
          tips: topMatch.tips,
          actionLabel: topMatch.actionLabel,
          actionTab: topMatch.actionTab,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const botFallback: ChatMessage = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text:
            'Wah, Bubu belum menemukan jawaban yang persis dengan kata itu, Bu. 🌸\n\nCoba pilih salah satu topik panduan di bawah ini, atau buka tab **Kamus Lengkap** ya, Bu!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botFallback]);
      }
    }, 350);
  };

  const filteredFaqs = OFFLINE_FAQS.filter((faq) => {
    const matchCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchQuery =
      !searchQuery.trim() ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col h-[85vh] max-h-[680px]"
      >
        {/* Modal Header with Bubu Avatar */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-5 py-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-xl shadow-inner">
                🤖
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-700 rounded-full" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm text-white leading-tight truncate">
                  Tanya Bubu 🌸
                </h3>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-400/30 text-[9px] font-extrabold uppercase tracking-wider text-emerald-100">
                  Offline
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/90 truncate">
                Kamus & Bantuan Pintar ArisanBae
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition"
            aria-label="Tutup BubuBot"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setActiveView('chat')}
            className={`flex-1 py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition ${
              activeView === 'chat'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Tanya Bubu (Chat)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('dictionary')}
            className={`flex-1 py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition ${
              activeView === 'dictionary'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kamus Lengkap ({OFFLINE_FAQS.length})</span>
          </button>
        </div>

        {/* VIEW 1: INTERACTIVE CHAT */}
        {activeView === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50 dark:bg-slate-900/50">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  } animate-fadeIn`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200/80 dark:border-slate-700/80'
                    }`}
                  >
                    {/* Render message with bold and newlines */}
                    <div className="whitespace-pre-line space-y-1">
                      {msg.text.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx}>
                          {para.split('**').map((chunk, cIdx) =>
                            cIdx % 2 === 1 ? (
                              <strong
                                key={cIdx}
                                className={
                                  msg.sender === 'user'
                                    ? 'font-bold underline'
                                    : 'font-extrabold text-emerald-700 dark:text-emerald-400'
                                }
                              >
                                {chunk}
                              </strong>
                            ) : (
                              chunk
                            )
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Tips badge if any */}
                    {msg.tips && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-start gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl">
                        <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-500" />
                        <span>Tips: {msg.tips}</span>
                      </div>
                    )}

                    {/* Action button shortcut if any */}
                    {msg.actionLabel && msg.actionTab && (
                      <button
                        type="button"
                        onClick={() => {
                          onNavigateTab(msg.actionTab!);
                          onClose();
                        }}
                        className="mt-2.5 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
                      >
                        <span>{msg.actionLabel}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.sender === 'user' ? 'Ibu' : 'Bubu'} • {msg.time}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs animate-fadeIn">
                  <div className="w-7 h-7 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm shadow-sm">
                    🤖
                  </div>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips Carousel */}
            <div className="px-3 pt-2 pb-1 border-t border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {quickPrompts.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendQuestion(chip.query)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/50 text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300 text-[11px] font-bold border border-slate-200/80 dark:border-slate-700 flex-shrink-0 transition active:scale-95"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuestion(inputText);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Tanya Bubu apa saja..."
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`p-2.5 rounded-2xl transition active:scale-95 flex items-center justify-center ${
                    inputText.trim()
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                  aria-label="Kirim pertanyaan"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* VIEW 2: FULL DICTIONARY (KAMUS LENGKAP) */}
        {activeView === 'dictionary' && (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50 dark:bg-slate-900/50 p-4 space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik kamus... (cth: undi, kas, lunas)"
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'undian', label: '🎁 Undian' },
                { id: 'iuran', label: '📋 Iuran' },
                { id: 'anggota', label: '👥 Anggota' },
                { id: 'whatsapp', label: '📲 WhatsApp' },
                { id: 'keamanan', label: '🔒 Keamanan' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-xl font-bold flex-shrink-0 transition ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Accordion FAQ List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-750 transition"
                    >
                      <span className="font-extrabold text-xs text-slate-800 dark:text-slate-100">
                        {faq.question}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90 text-emerald-600' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60"
                        >
                          <div className="whitespace-pre-line space-y-2 mt-2">
                            {faq.answer}
                          </div>

                          {faq.tips && (
                            <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 flex items-start gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                              <span>💡 Tips: {faq.tips}</span>
                            </div>
                          )}

                          {faq.actionLabel && faq.actionTab && (
                            <button
                              type="button"
                              onClick={() => {
                                onNavigateTab(faq.actionTab!);
                                onClose();
                              }}
                              className="mt-3 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-sm transition"
                            >
                              <span>{faq.actionLabel}</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Tidak ada topik yang cocok dengan pencarian "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
